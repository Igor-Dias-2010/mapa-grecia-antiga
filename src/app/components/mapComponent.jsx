"use client";

import { conquistas } from "../data/consquistas";
import { rotas } from "../data/rotas";
import { cidades } from "../data/cidades";
import CityPopup from "./popup";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useMap } from "react-leaflet";
import Image from "next/image";

const Polyline = dynamic(
    () => import("react-leaflet").then((mod) => mod.Polyline),
    {
        ssr: false,
    },
);

const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    {
        ssr: false,
    },
);
const CircleMarker = dynamic(
    () => import("react-leaflet").then((mod) => mod.CircleMarker),
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
function MapController() {
    const map = useMap();

    useEffect(() => {
        const L = require("leaflet");
        const normal = L.tileLayer(
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        );

        const topo = L.tileLayer(
            "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        );

        const satelite = L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        );

        const baseMaps = {
            Normal: normal,
            Topográfico: topo,
            Satélite: satelite,
        };

        normal.addTo(map);

        const control = L.control.layers(baseMaps).addTo(map);
        return () => {
            map.removeControl(control);
        };
    }, [map]);

    return null;
}
export default function MapComponent() {
    const [imagemAberta, setImagemAberta] = useState(null);

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
        <div>
            <MapContainer
                center={[39, 22]}
                zoom={6}
                style={{ height: "100vh", width: "100%" }}
            >
                <MapController />
                <Polyline
                    positions={rotas}
                    pathOptions={{
                        color: "red",
                        weight: 4,
                    }}
                />
                {conquistas.map((local, index) => (
                    <CircleMarker key={index} position={local.posicao} center={local.posicao} radius={8} pathOptions={{color: 'white', fillColor: 'red', fillOpacity: 1,}}>
                        <Tooltip
                            direction="top"
                            offset={[2, -10]}
                            opacity={1}
                        >
                            {local.nome}
                        </Tooltip>

                        <Popup className="popup">
                            <h2>{local.nome}</h2>
                            <p>{local.descricao}</p>
                        </Popup>
                    </CircleMarker>
                ))}
                {cidades.map((cidade, index) => (
                    <Marker key={index} position={cidade.posicao}>
                        <Tooltip
                            direction="top"
                            offset={[-14, -15]}
                            opacity={1}
                        >
                            {cidade.nome}
                        </Tooltip>
                        <Popup className="popup">
                            <CityPopup
                                cidade={cidade}
                                abrirImagem={setImagemAberta}
                            />
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            {imagemAberta && (
                <div
                    onClick={() => setImagemAberta(null)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                    }}
                >
                    <Image
                        className="imagem-modal"
                        width={950}
                        height={690}
                        src={imagemAberta}
                        alt="foto da cidade"
                    />
                </div>
            )}
        </div>
    );
}
