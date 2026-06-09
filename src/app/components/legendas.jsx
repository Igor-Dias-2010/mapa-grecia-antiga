"use client";

export default function Legendas() {
    return (
        <div className="legenda">
            <div className="icone-legenda">🗺️</div>
            <div className="legenda-conteudo">
                <h3>Legenda</h3>

                <div className="legenda-item">
                    <span>⚔️</span>
                    <span>Batalhas</span>
                </div>

                <div className="legenda-item">
                    <span>🚩</span>
                    <span>Conquistas</span>
                </div>

                <div className="legenda-item">
                    <span>🏛️</span>
                    <span>Cidades importantes</span>
                </div>

                <div className="legenda-item">
                    <span>🎓</span>
                    <span>Centros culturais</span>
                </div>

                <div className="legenda-item">
                    <span>🚢</span>
                    <span>Portos</span>
                </div>

                <div className="legenda-item">
                    <span>💰</span>
                    <span>Cidades comerciais</span>
                </div>

                <div className="legenda-item">
                    <span>⚓</span>
                    <span>Início da rota comercial</span>
                </div>

                <div className="legenda-item">
                    <span>📍</span>
                    <span>Parada da rota comercial</span>
                </div>

                <div className="legenda-item">
                    <span>🏁</span>
                    <span>Fim da rota comercial</span>
                </div>

                <div className="legenda-item">
                    <div className="linha-vermelha"></div>
                    <span>Conquistas de Alexandre</span>
                </div>

                <div className="legenda-item">
                    <div className="linha-azul"></div>
                    <span>Rotas comerciais</span>
                </div>

                <div className="legenda-item">
                    <div className="linha-tracejada"></div>
                    <span>Difusão helenística</span>
                </div>
            </div>
        </div>
    );
}
