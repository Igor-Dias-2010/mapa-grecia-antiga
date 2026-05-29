import Image from "next/image";

export default function CityPopup({ cidade }) {
    return (
        <div>
            <figure>
                <Image
                    alt={`Foto da cidade de ${cidade.nome}`}
                    src={cidade.foto}
                    width={290}
                    height={180}
                    className="img"
                />
            </figure>
            <div className="main">
                <h1>{cidade.nome}</h1>
                <p>{cidade.descricao}</p>
                <h2>Importância</h2>
                <ul>
                    <li>
                        <strong>Política:</strong>
                        {""}
                        {cidade.importancia.politica}
                    </li>
                    <li>
                        <strong>Militar:</strong>
                        {""}
                        {cidade.importancia.militar}
                    </li>
                    <li>
                        <strong>Cultural:</strong>
                        {""}
                        {cidade.importancia.cultural}
                    </li>
                </ul>
            </div>
        </div>
    );
}
