import React, { useEffect, useRef, useState } from "react";
import L, { FeatureGroup, Polygon, Polyline, type LatLngTuple } from "leaflet";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import axios from "axios";

export interface Field {
  id?: number;
  businessId: number;
  cropType: string;
  coords: LatLngTuple[][];
  size: number;
  soilType?: string;
  fertiliser?: string;
  herbicide?: string;
}

interface MapFieldsProps {
  businessId: number;
  token: string;
}

const MapFields: React.FC<MapFieldsProps> = ({ businessId, token }) => {
  const mapRef = useRef<L.Map | null>(null);
  const drawnItemsRef = useRef<FeatureGroup>(new L.FeatureGroup());
  const [fields, setFields] = useState<Field[]>([]);

  const [fieldData, setFieldData] = useState({
    cropType: "",
    size: 0,
    soilType: "",
    fertiliser: "",
    herbicide: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFieldData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map("map").setView([47.0, 28.8], 7);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    drawnItemsRef.current.addTo(map);

    const drawControl = new L.Control.Draw({
      edit: { featureGroup: drawnItemsRef.current },
      draw: {
        polygon: { allowIntersection: false, showArea: true },
        rectangle: { showArea: true },
        circle: false,
        polyline: { metric: true },
        marker: false,
      },
    });
    map.addControl(drawControl);

    // Load existing fields
    const fetchFields = async () => {
      try {
        const res = await axios.get<Field[]>(
          `${import.meta.env.VITE_BACKEND_URL}/fields/business/${businessId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFields(res.data);

        res.data.forEach((f) => {
          f.coords.forEach((polyCoords) => {
            const polygon = L.polygon(polyCoords, { color: "green" }).addTo(
              drawnItemsRef.current
            );
            (polygon as any).fieldId = f.id;
            polygon.bindPopup(
              `Crop: ${f.cropType}, Size: ${f.size} ha, Soil: ${
                f.soilType || "-"
              }`
            );
          });
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchFields();

    // Create polygon or polyline
    map.on(L.Draw.Event.CREATED, async (event: any) => {
      const layer = event.layer as Polygon | Polyline | L.Rectangle;

  drawnItemsRef.current.addLayer(layer);

  let coords: LatLngTuple[][] = [];

  // Treat Polygon and Rectangle the same way
  if (layer instanceof L.Polygon) {
    const latlngs = layer.getLatLngs() as L.LatLng[][] | L.LatLng[][][];
    if (Array.isArray(latlngs[0][0])) {
      coords = (latlngs as L.LatLng[][][]).map((poly) =>
        poly[0].map((ll) => [ll.lat, ll.lng] as LatLngTuple)
      );
    } else {
      coords = [
        (latlngs as L.LatLng[][])[0].map((ll) => [ll.lat, ll.lng] as LatLngTuple),
      ];
    }
  } else if (layer instanceof L.Polyline) {
    const latlngs = layer.getLatLngs() as L.LatLng[];
    coords = [latlngs.map((ll) => [ll.lat, ll.lng] as LatLngTuple)];
  }

      const payload: Field = {
        businessId,
        cropType: fieldData.cropType,
        size: Number(fieldData.size),
        soilType: fieldData.soilType,
        fertiliser: fieldData.fertiliser,
        herbicide: fieldData.herbicide,
        coords,
      };

      try {
        const res = await axios.post<Field>(
          `${import.meta.env.VITE_BACKEND_URL}/fields/${businessId}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        (layer as any).fieldId = res.data.id;
        layer.bindPopup(
          `Crop: ${res.data.cropType}, Size: ${res.data.size} ha, Soil: ${
            res.data.soilType || "-"
          }`
        );
        setFields((prev) => [...prev, res.data]);
      } catch (err) {
        console.error(err);
      }

      setFieldData({
        cropType: "",
        size: 0,
        soilType: "",
        fertiliser: "",
        herbicide: "",
      });
    });

    // Edit polygon
    map.on(L.Draw.Event.EDITED, async (event: any) => {
      event.layers.eachLayer(async (layer: any) => {
        const latlngs = layer.getLatLngs() as L.LatLng[][] | L.LatLng[][][];
        let coords: LatLngTuple[][] = [];

        if (Array.isArray(latlngs[0][0])) {
          coords = (latlngs as L.LatLng[][][]).map((poly) =>
            poly[0].map((ll) => [ll.lat, ll.lng] as LatLngTuple)
          );
        } else {
          coords = [
            (latlngs as L.LatLng[][])[0].map(
              (ll) => [ll.lat, ll.lng] as LatLngTuple
            ),
          ];
        }

        try {
          await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/fields/${layer.fieldId}`,
            { coords },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          setFields((prev) =>
            prev.map((f) => (f.id === layer.fieldId ? { ...f, coords } : f))
          );
        } catch (err) {
          console.error(err);
        }
      });
    });

    // Delete polygon
    map.on(L.Draw.Event.DELETED, async (event: any) => {
      event.layers.eachLayer(async (layer: any) => {
        try {
          await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/fields/${layer.fieldId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          setFields((prev) => prev.filter((f) => f.id !== layer.fieldId));
        } catch (err) {
          console.error(err);
        }
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [businessId, token, fieldData]);

  // Zoom to field on click
  const handleFieldClick = (field: Field) => {
    if (!mapRef.current) return;
    const layer = drawnItemsRef.current
      .getLayers()
      .find((l: any) => l.fieldId === field.id) as Polygon;
    if (layer) {
      mapRef.current.fitBounds(layer.getBounds());
      layer.openPopup();
    }
  };

  // Delete field from list and map
  const handleDeleteField = async (field: Field) => {
    if (!field.id) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/fields/${field.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFields((prev) => prev.filter((f) => f.id !== field.id));

      const layer = drawnItemsRef.current
        .getLayers()
        .find((l: any) => l.fieldId === field.id);
      if (layer) drawnItemsRef.current.removeLayer(layer);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="field-form mb-4 flex flex-col gap-2">
        <label>
          Crop Type:
          <input
            name="cropType"
            value={fieldData.cropType}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Size (ha):
          <input
            type="number"
            name="size"
            value={fieldData.size}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Soil Type:
          <input
            name="soilType"
            value={fieldData.soilType}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Fertiliser:
          <input
            name="fertiliser"
            value={fieldData.fertiliser}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Herbicide:
          <input
            name="herbicide"
            value={fieldData.herbicide}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div id="map" style={{ height: "500px" }} />

      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2">Fields List</h2>
        <ul className="space-y-2">
          {fields.map((f) => (
            <li
              key={f.id}
              className="flex justify-between items-center cursor-pointer p-2 border rounded hover:bg-green-100"
              onClick={() => handleFieldClick(f)}
            >
              <div>
                <strong>{f.cropType}</strong> | Size: {f.size} ha | Soil:{" "}
                {f.soilType || "-"} | Fertiliser: {f.fertiliser || "-"} | Herbicide:{" "}
                {f.herbicide || "-"}
              </div>
              <button
                className="ml-2 text-red-600 hover:text-red-800"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteField(f);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapFields;
