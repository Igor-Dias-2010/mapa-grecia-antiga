"use client";
import { useState } from "react";

export default function Filtros({ filtros, setFiltros }) {
    const [menuFiltrosAberto, setMenuFiltrosAberto] = useState(false);

    function alterar(nome) {
        setFiltros({
            ...filtros,
            [nome]: !filtros[nome],
        });
    }

    function marcarTudo() {
        setFiltros({
            batalhas: true,
            conquistas: true,
            cidades: true,
            centros: true,
            portos: true,
            comerciais: true,
            rotas: true,
            difusao: true,
        });
    }

    function desmarcarTudo() {
        setFiltros({
            batalhas: false,
            conquistas: false,
            cidades: false,
            centros: false,
            portos: false,
            comerciais: false,
            rotas: false,
            difusao: false,
        });
    }

    return (
        <div className="filtros">
            <div
                className="icone-filtros"
                onClick={() => setMenuFiltrosAberto(!menuFiltrosAberto)}
            >
                🔍
            </div>

            <div
                className={`filtros-conteudo ${
                    menuFiltrosAberto ? "aberto" : ""
                }`}
            >
                <h3>Filtros</h3>

                <label className={!filtros.batalhas ? 'filtro-desativado' : ''}>
                    <input
                        type="checkbox"
                        checked={filtros.batalhas}
                        onChange={() => alterar("batalhas")}
                    />
                    ⚔️ Batalhas
                </label>

                <label className={!filtros.conquistas ? 'filtro-desativado' : ''}>
                    <input
                        type="checkbox"
                        checked={filtros.conquistas}
                        onChange={() => alterar("conquistas")}
                    />
                    🚩 Conquistas
                </label>

                <label className={!filtros.cidades ? 'filtro-desativado' : ''}>
                    <input
                        type="checkbox"
                        checked={filtros.cidades}
                        onChange={() => alterar("cidades")}
                    />
                    🏛️ Cidades
                </label>

                <label className={!filtros.centros ? 'filtro-desativado' : ''}>
                    <input
                        type="checkbox"
                        checked={filtros.centros}
                        onChange={() => alterar("centros")}
                    />
                    🎓 Centros culturais
                </label>

                <label className={!filtros.portos ? 'filtro-desativado' : ''}>
                    <input
                        type="checkbox"
                        checked={filtros.portos}
                        onChange={() => alterar("portos")}
                    />
                    🚢 Portos
                </label>

                <label className={!filtros.comerciais ? 'filtro-desativado' : ''}>
                    <input
                        type="checkbox"
                        checked={filtros.comerciais}
                        onChange={() => alterar("comerciais")}
                    />
                    💰 Cidades comerciais
                </label>

                <label className={!filtros.rotas ? 'filtro-desativado' : ''}>
                    <input
                        type="checkbox"
                        checked={filtros.rotas}
                        onChange={() => alterar("rotas")}
                    />
                    🔵 Rotas comerciais
                </label>

                <label className={!filtros.difusao ? 'filtro-desativado' : ''}>
                    <input
                        type="checkbox"
                        checked={filtros.difusao}
                        onChange={() => alterar("difusao")}
                    />
                    🟢 Difusão helenística
                </label>

                <button onClick={marcarTudo}>Marcar tudo</button>

                <button onClick={desmarcarTudo}>Desmarcar tudo</button>
            </div>
        </div>
    );
}
