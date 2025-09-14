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
        rectangle: false,
        circle: false,
        polyline: { metric: true },
        marker: false,
      },
    });
    map.addControl(drawControl);

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
              `Crop: ${f.cropType}, Size: ${f.size} ha, Soil: ${f.soilType || "-"}`
            );
          });
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchFields();

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [businessId, token]);

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
    <div className="space-y-6">
      {/* --- Redesigned Inputs --- */}
      <div className="field-form mb-4 grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700 dark:text-white">
            Crop Type
          </label>
          <input
            name="cropType"
            value={fieldData.cropType}
            onChange={handleInputChange}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
            placeholder="e.g. Wheat"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700 dark:text-white">
            Size (ha)
          </label>
          <input
            type="number"
            name="size"
            value={fieldData.size}
            onChange={handleInputChange}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700 dark:text-white">
            Soil Type
          </label>
          <input
            name="soilType"
            value={fieldData.soilType}
            onChange={handleInputChange}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700 dark:text-white">
            Fertiliser
          </label>
          <input
            name="fertiliser"
            value={fieldData.fertiliser}
            onChange={handleInputChange}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="flex flex-col sm:col-span-2">
          <label className="mb-1 text-sm font-medium text-gray-700 dark:text-white">
            Herbicide
          </label>
          <input
            name="herbicide"
            value={fieldData.herbicide}
            onChange={handleInputChange}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      <div id="map" style={{ height: "500px" }} className="rounded-lg overflow-hidden" />

      {/* --- Fields List --- */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 dark:text-white">Fields List</h2>
        <ul className="space-y-2">
          {fields.map((f) => (
            <li
              key={f.id}
              className="flex justify-between items-center cursor-pointer p-3 border rounded-lg hover:bg-green-50 dark:hover:bg-gray-700 transition"
              onClick={() => handleFieldClick(f)}
            >
              <div className="text-sm text-gray-800 dark:text-white">
                <strong>{f.cropType}</strong> | Size: {f.size} ha | Soil: {f.soilType || "-"} | Fertiliser: {f.fertiliser || "-"} | Herbicide: {f.herbicide || "-"}
              </div>
              <button
                className="ml-3 text-red-600 hover:text-red-800 text-sm"
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
