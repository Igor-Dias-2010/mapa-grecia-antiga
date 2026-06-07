import { useMap } from "react-leaflet";

export function BotaoMapaCompleto() {
    const map = useMap();

    return (
        <button
            onClick={() => {
                map.setView([35, 40], 4);
            }}
            className="botao-mapa-inteiro"
        >
            Mostrar mapa inteiro
        </button>
    );
}
