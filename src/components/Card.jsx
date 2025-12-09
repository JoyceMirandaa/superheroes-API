import React from "react";

export default function Card({id, name, images, gender, race, placeOfBirth, firstAppearance, publisher, alignment, fullName}){
    return(
        <div className="card">
            <img src={images} alt={name} />
            <h2>{name}</h2>
            <h3>Informações:</h3>
            <p><strong>ID :</strong> {id}</p>
             <p><strong>Nome Completo/AlterEgo :</strong> {fullName}</p>
            <p><strong>Gênero :</strong> {gender}</p>
            <p><strong>Raça :</strong> {race}</p>
            <p><strong>Local de Nascimento :</strong> {placeOfBirth}</p>
            <p><strong>Primeira Aparição :</strong> {firstAppearance}</p>
            <p><strong>Publicado :</strong> {publisher}</p>
            <p><strong>Alinhamento :</strong> {alignment}</p>
        </div>
    );
}