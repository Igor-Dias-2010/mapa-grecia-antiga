"use client";
import { cidades } from "../data/cidades";
import CityPopup from "./popup";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    {
        ssr: false,
    },
);
const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    {
        ssr: false,
    },
);
const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    {
        ssr: false,
    },
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
    ssr: false,
});
const Tooltip = dynamic(
    () => import("react-leaflet").then((mod) => mod.Tooltip),
    {
        ssr: false,
    },
);
export default function MapComponent() {
    useEffect(() => {
        import("leaflet").then((L) => {
            delete L.Icon.Default.prototype._getIconUrl;

            L.Icon.Default.mergeOptions({
                iconRetinaUrl: "/leaflet/marker-icon-2x.png",
                iconUrl: "/leaflet/marker-icon.png",
                shadowUrl: "/leaflet/marker-shadow.png",
            });
        });
    }, []);
    return (
        <MapContainer
            center={[39, 22]}
            zoom={6}
            style={{ height: "100vh", width: "100%" }}
        >
            <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {cidades.map((cidade, index) => (
                <Marker key={index} position={cidade.posicao}>
                    <Tooltip direction="top" offset={[-14, -15]} opacity={1} permanent>
                        {cidade.nome}
                    </Tooltip>
                    <Popup className="popup">
                        <CityPopup cidade={cidade} />
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
