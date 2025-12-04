import React from "react";

export default function Card({id, name, image, powerstats, biography, work, connections}){
    return(
        <div className="card">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p><strong>Poderes:</strong> {powerstats}</p>
            <p><strong>Biografia:</strong> {biography}</p>
            <p><strong>Biografia:</strong> {work}</p>
            <p><strong>Biografia:</strong> {connections}</p>
        </div>
    );
}