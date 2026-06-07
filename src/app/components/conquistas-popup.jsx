import Image from "next/image";

export default function ConquistasPopup({ cidade, abrirImagem }) {
    return (
        <div>
            <figure>
                <Image
                    alt={`Foto da cidade de ${cidade.nome}`}
                    src={cidade.foto}
                    width={290}
                    height={180}
                    className="img"
                    onClick={() => abrirImagem(cidade.foto)}
                />
            </figure>
        </div>
    );
}
