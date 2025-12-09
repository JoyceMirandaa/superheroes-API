import React, { useEffect, useState} from "react";
import Card from "../components/Card";
import axios from "axios";

export default function Home(){
    const [character, setCharacter] = useState(null); 
    const [id, setId] = useState(1); 
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    async function fetchCharacters(id){
        setLoading(true);
        setErrorMsg("");

        try{
            const response = await axios.get(
                `https://akabab.github.io/superhero-api/api/id/${id}.json`
            );
            //configuração para buscar os personagens na api
            if(!response.data|| response.data === 0){
                setErrorMsg("Personagem Invalido! Tente outra.");
                setCharacter(response.data);
            }else{
                setCharacter(response.data);
            }
        }catch(error){
            setErrorMsg("Erro ao buscar personagens!")
        }
        setLoading(false);
    }

    useEffect(() =>{
        async function loadFirstPage(){
            setLoading(true);
            setErrorMsg("");

            try{
                const response = await axios.get(
                    "https://akabab.github.io/superhero-api/api/id/1.json"
                );
                setCharacter(response.data);
            } catch(error){
                setErrorMsg("Erro ao buscar personagens!");
            }
            setLoading(false);
        }
        loadFirstPage();
    }, []);

    function handleSearch(){
        fetchCharacters(id);
    }

    return(
        <div className="container">
            <h1>Super-Heroes</h1>

            <div className="search-box">
                <input 
                    type="number" 
                    placeholder="Digite um numero" 
                    value={id}
                    onChange={(e) => setId(e.target.value)} 
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>

            {loading && <p className="loading">Carregando...</p>}
            {errorMsg && <p className="loading">{errorMsg}</p>}

            <div className="cards-grid">
               {character && (
                    <Card
                        id={character.id}
                        name={character.name}
                        images={character.images.md}
                        gender={character.appearance.gender}
                        race={character.appearance.race}
                        placeOfBirth={character.biography.placeOfBirth}
                        firstAppearance={character.biography.firstAppearance}
                        publisher={character.biography.publisher}
                        alignment={character.biography.alignment}
                        fullName={character.biography.fullName}
                    />
                )}
            </div>
        </div>
    );
}