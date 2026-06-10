"use client";

import Filtros from "./filtros";
import Legendas from "./legendas";
import { infoRotas } from "../data/infoRotas";
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
import { Fragment } from "react";

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

function SetasRota({ rota, ativa }) {
    const map = useMap();

    useEffect(() => {
        if (!ativa) return;

        async function criarSetas() {
            await import("leaflet-polylinedecorator");

            const polyline = L.polyline(rota);

            const decorator = L.polylineDecorator(polyline, {
                patterns: [
                    {
                        offset: "10%",
                        repeat: "30px",
                        symbol: L.Symbol.arrowHead({
                            pixelSize: 12,
                            polygon: true,
                            pathOptions: {
                                color: "#00ff00",
                                fillOpacity: 1,
                                weight: 2,
                            },
                        }),
                    },
                ],
            });

            decorator.addTo(map);

            return decorator;
        }

        let decorator;

        criarSetas().then((d) => {
            decorator = d;
        });

        return () => {
            if (decorator) {
                map.removeLayer(decorator);
            }
        };
    }, [ativa, rota, map]);

    return null;
}
function MapController() {
    const map = useMap();

    useEffect(() => {
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
    const [inicioIcon, setInicioIcon] = useState(null);
    const [fimIcon, setFimIcon] = useState(null);
    const [paradaIcon, setParadaIcon] = useState(null);
    const [rotaAtiva, setRotaAtiva] = useState(null);
    const [filtros, setFiltros] = useState({
        batalhas: true,
        conquistas: true,
        cidades: true,
        centros: true,
        portos: true,
        comerciais: true,
        rotas: true,
        difusao: true,
    });

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
            setInicioIcon(
                L.divIcon({
                    html: '<div class="markers">⚓</div>',
                    className: "",
                    iconSize: [30, 30],
                }),
            );
            setFimIcon(
                L.divIcon({
                    html: '<div class="markers">🏁</div>',
                    className: "",
                    iconSize: [30, 30],
                }),
            );
            setParadaIcon(
                L.divIcon({
                    html: '<div class="markers">📍</div>',
                    className: "",
                    iconSize: [20, 20],
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
            <Filtros filtros={filtros} setFiltros={setFiltros} />
            <Legendas filtros={filtros} />
            <MapContainer
                center={[35, 40]}
                zoom={4}
                style={{ height: "100vh", width: "100%" }}
            >
                <MapController />
                <BotaoMapaCompleto />
                {filtros.portos &&
                    portoIcon &&
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
                {filtros.comerciais &&
                    comercialIcon &&
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
                {filtros.rotas &&
                    rotasMediterraneo.map((rota, rotaIndex) => {
                        const info = infoRotas[rotaIndex];

                        return (
                            <Fragment key={rotaIndex}>
                                <Polyline
                                    positions={rota}
                                    eventHandlers={{
                                        mouseover: () =>
                                            setRotaAtiva(rotaIndex),
                                        mouseout: () => setRotaAtiva(null),
                                    }}
                                    pathOptions={{
                                        color: "#0066ff",
                                        weight: rotaAtiva === rotaIndex ? 5 : 3,
                                        opacity:
                                            rotaAtiva === rotaIndex ? 1 : 0.5,
                                        dashArray:
                                            rotaAtiva === rotaIndex
                                                ? null
                                                : "8, 8",
                                    }}
                                />

                                <SetasRota
                                    rota={rota}
                                    ativa={rotaAtiva === rotaIndex}
                                />

                                {rota.map((ponto, pontoIndex) => {
                                    const nomePonto = info.pontos[pontoIndex];

                                    return (
                                        <Marker
                                            key={`${rotaIndex}-${pontoIndex}`}
                                            position={ponto}
                                            icon={
                                                pontoIndex === 0
                                                    ? inicioIcon
                                                    : pontoIndex ===
                                                        rota.length - 1
                                                      ? fimIcon
                                                      : paradaIcon
                                            }
                                            eventHandlers={{
                                                mouseover: () =>
                                                    setRotaAtiva(rotaIndex),
                                                mouseout: () =>
                                                    setRotaAtiva(null),
                                            }}
                                        >
                                            <Tooltip
                                                direction="top"
                                                offset={[9, -15]}
                                                opacity={1}
                                            >
                                                {nomePonto}
                                            </Tooltip>

                                            <Popup>
                                                <h2>{nomePonto}</h2>
                                                <h3>{info.nome}</h3>
                                                <p>{info.importancia}</p>
                                            </Popup>
                                        </Marker>
                                    );
                                })}
                            </Fragment>
                        );
                    })}

                {filtros.batalhas &&
                    batalhaIcon &&
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
                {filtros.conquistas && (
                    <Polyline
                        positions={rotas}
                        pathOptions={{
                            color: "red",
                            weight: 4,
                        }}
                    />
                )}
                {filtros.conquistas &&
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
                {filtros.centros &&
                    centro &&
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
                {filtros.difusao &&
                    difusaoHelenistica.map((item, index) => (
                        <Fragment key={index}>
                            <Polyline
                                positions={item.cidades.map(
                                    (cidade) => cidade.posicao,
                                )}
                                pathOptions={{
                                    color: item.cor,
                                    weight: 2,
                                    dashArray: "7, 7",
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
                        </Fragment>
                    ))}
                {filtros.cidades &&
                    cidades.map((cidade, index) => (
                        <Marker
                            key={index}
                            position={cidade.posicao}
                            icon={cidadesIcon}
                        >
                            <Tooltip
                                direction="top"
                                offset={[9, -15]}
                                opacity={1}
                            >
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
