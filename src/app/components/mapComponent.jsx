"use client";

import { BotaoMapaCompleto } from "../functions/botaoMapaCompleto";
import { batalhas } from "../data/batalhas";
import { conquistas } from "../data/consquistas";
import { rotas } from "../data/rotas";
import { cidades } from "../data/cidades";
import { centro } from "../data/centros";
import { difusaoHelenistica } from "../data/difusao";
import { cidadesComerciais } from "../data/cidadesComerciais";
import { portos } from "../data/portos";
import { rotasMediterraneo } from "../data/rotasMaritimas";
import CentrosPopup from "./centros-popup";
import ConquistasPopup from "./conquistas-popup";
import CityPopup from "./city-popup";
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
    const [batalhaIcon, setBatalhaIcon] = useState(null);
    const [conquistaIcon, setConquistaIcon] = useState(null);
    const [cidadesIcon, setCidadesIcon] = useState(null);
    const [centroIcon, setCentroIcon] = useState(null);
    const [iconesDifusao, setIconesDifusao] = useState({});
    const [portoIcon, setPortoIcon] = useState(null);
    const [comercialIcon, setComercialIcon] = useState(null);

    useEffect(() => {
        import("leaflet").then((L) => {
            delete L.Icon.Default.prototype._getIconUrl;

            L.Icon.Default.mergeOptions({
                iconRetinaUrl: "/leaflet/marker-icon-2x.png",
                iconUrl: "/leaflet/marker-icon.png",
                shadowUrl: "/leaflet/marker-shadow.png",
            });
            setBatalhaIcon(
                L.divIcon({
                    html: '<div class="markers">⚔️</div>',
                    className: "",
                    iconSize: [30, 30],
                }),
            );
            setConquistaIcon(
                L.divIcon({
                    html: '<div class="markers">🚩</div>',
                    className: "",
                    iconSize: [30, 30],
                }),
            );
            setCidadesIcon(
                L.divIcon({
                    html: '<div class="markers">🏛️</div>',
                    className: "",
                    iconSize: [30, 30],
                }),
            );
            setPortoIcon(
                L.divIcon({
                    html: '<div class="markers">🚢</div>',
                    className: "",
                    iconSize: [30, 30],
                }),
            );

            setComercialIcon(
                L.divIcon({
                    html: '<div class="markers">💰</div>',
                    className: "",
                    iconSize: [30, 30],
                }),
            );
            setCentroIcon(
                L.divIcon({
                    html: '<div class="markers">🎓</div>',
                    className: "",
                    iconSize: [30, 30],
                }),
            );
            const novosIcones = {};

            difusaoHelenistica.forEach((item) => {
                novosIcones[item.nome] = L.divIcon({
                    html: `<div class="markers">${item.emoji}</div>`,
                    className: "",
                    iconSize: [30, 30],
                });
            });

            setIconesDifusao(novosIcones);
        });
    }, []);
    return (
        <div>
            <MapContainer
                center={[35, 40]}
                zoom={4}
                style={{ height: "100vh", width: "100%" }}
            >
                <MapController />
                <BotaoMapaCompleto />
                <Polyline
                    positions={rotas}
                    pathOptions={{
                        color: "red",
                        weight: 4,
                    }}
                />
                {portoIcon &&
                    portos.map((porto, index) => (
                        <Marker
                            key={index}
                            position={porto.posicao}
                            icon={portoIcon}
                        >
                            <Tooltip
                                direction="top"
                                offset={[9, -15]}
                                opacity={1}
                            >
                                {porto.nome}
                            </Tooltip>

                            <Popup>
                                <h1>{porto.nome}</h1>
                                <p>{porto.importancia}</p>
                            </Popup>
                        </Marker>
                    ))}
                {comercialIcon &&
                    cidadesComerciais.map((cidade, index) => (
                        <Marker
                            key={index}
                            position={cidade.posicao}
                            icon={comercialIcon}
                        >
                            <Tooltip
                                className="tooltip"
                                direction="top"
                                offset={[9, -15]}
                                opacity={1}
                            >
                                {cidade.nome}
                            </Tooltip>

                            <Popup>
                                <h1>{cidade.nome}</h1>
                                <p>{cidade.importancia}</p>
                            </Popup>
                        </Marker>
                    ))}
                {rotasMediterraneo.map((rota, index) => (
                    <Polyline
                        key={index}
                        positions={rota}
                        pathOptions={{
                            color: "#0066ff",
                            weight: 4,
                            dashArray: "10, 10",
                        }}
                    />
                ))}
                {batalhaIcon &&
                    batalhas.map((batalha, index) => (
                        <Marker
                            key={index}
                            position={batalha.posicao}
                            icon={batalhaIcon}
                        >
                            <Tooltip
                                direction="top"
                                offset={[9, -15]}
                                opacity={1}
                            >
                                {batalha.nome}
                            </Tooltip>

                            <Popup
                                className="popup"
                                direction="top"
                                offset={[8, -5]}
                                opacity={1}
                            >
                                <h2>{batalha.nome}</h2>
                                <ul>
                                    <li>
                                        <strong>Importância:</strong>{" "}
                                        {batalha.importancia}
                                    </li>

                                    <li>
                                        <strong>Contribuição:</strong>{" "}
                                        {batalha.contribuicao}
                                    </li>

                                    <li>
                                        <strong>Resultado:</strong>{" "}
                                        {batalha.resultado}
                                    </li>
                                </ul>
                            </Popup>
                        </Marker>
                    ))}
                {conquistas &&
                    conquistas.map((local, index) => (
                        <Marker
                            key={index}
                            position={local.posicao}
                            icon={conquistaIcon}
                        >
                            <Tooltip
                                direction="top"
                                offset={[8, -15]}
                                opacity={1}
                            >
                                {local.nome}
                            </Tooltip>

                            <Popup
                                className="popup"
                                direction="top"
                                offset={[8, -5]}
                                opacity={1}
                            >
                                <ConquistasPopup
                                    cidade={local}
                                    abrirImagem={setImagemAberta}
                                />
                                <h1>{local.nome}</h1>
                                <p>{local.descricao}</p>
                                <h2>Importâncias</h2>
                                <ul>
                                    <li>
                                        <strong>Territorial:</strong>{" "}
                                        {local.importancia.territorial}
                                    </li>
                                    <li>
                                        <strong>Militar:</strong>{" "}
                                        {local.importancia.militar}
                                    </li>
                                    <li>
                                        <strong>Econômica:</strong>{" "}
                                        {local.importancia.economica}
                                    </li>
                                </ul>
                            </Popup>
                        </Marker>
                    ))}
                {centro &&
                    centro.map((centro, index) => (
                        <Marker
                            key={index}
                            position={centro.posicao}
                            icon={centroIcon}
                        >
                            <Tooltip
                                direction="top"
                                offset={[9, -15]}
                                opacity={1}
                            >
                                {centro.nome}
                            </Tooltip>
                            <Popup
                                className="popup"
                                direction="top"
                                offset={[8, -5]}
                                opacity={1}
                            >
                                <CentrosPopup
                                    cidade={centro}
                                    abrirImagem={setImagemAberta}
                                />
                                <h1>{centro.nome}</h1>
                                <p>{centro.descricao}</p>

                                <h2>Importâncias</h2>

                                <ul>
                                    <li>
                                        <strong>Função cultural:</strong>{" "}
                                        {centro.importancia.cultural}
                                    </li>

                                    <li>
                                        <strong>
                                            Circulação de conhecimento:
                                        </strong>{" "}
                                        {centro.importancia.conhecimento}
                                    </li>

                                    <li>
                                        <strong>Importância comercial:</strong>{" "}
                                        {centro.importancia.comercial}
                                    </li>

                                    <li>
                                        <strong>
                                            Difusão da cultura grega:
                                        </strong>{" "}
                                        {centro.importancia.difusao}
                                    </li>
                                </ul>
                            </Popup>
                        </Marker>
                    ))}
                {difusaoHelenistica.map((item, index) => (
                    <div key={index}>
                        <Polyline
                            positions={item.cidades.map(
                                (cidade) => cidade.posicao,
                            )}
                            pathOptions={{
                                color: item.cor,
                                weight: 2,
                                dashArray: "8, 8",
                            }}
                        />

                        {item.cidades.map((cidade, i) => (
                            <Marker
                                key={i}
                                position={cidade.posicao}
                                icon={iconesDifusao[item.nome]}
                            >
                                <Tooltip
                                    direction="top"
                                    offset={[9, -15]}
                                    opacity={1}
                                >
                                    {item.nome}
                                </Tooltip>

                                <Popup>
                                    <h2>{item.nome}</h2>
                                    <p>{cidade.nome}</p>
                                </Popup>
                            </Marker>
                        ))}
                    </div>
                ))}
                {cidades.map((cidade, index) => (
                    <Marker
                        key={index}
                        position={cidade.posicao}
                        icon={cidadesIcon}
                    >
                        <Tooltip direction="top" offset={[9, -15]} opacity={1}>
                            {cidade.nome}
                        </Tooltip>
                        <Popup
                            className="popup"
                            direction="top"
                            offset={[8, -5]}
                            opacity={1}
                        >
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
