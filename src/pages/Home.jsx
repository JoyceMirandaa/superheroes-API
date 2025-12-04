import React, { useEffect, useState} from "react";
import Card from "../components/Card";
import axios from "axios";

export default function Home(){
    const [characters, setCharacters] = useState([]); 
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    async function fetchCharacters(p){
        setLoading(true);
        setErrorMsg("");

        try{
            const response = await  axios.get(
                `https://superheroapi.com/api/0950c8973c9c944301bfa557a3637529/character-id?page=${p}&limit=12`
            );
            //configuração para buscar os personagens na api
            if(!response.data.items || response.data.items.length === 0){
                setErrorMsg("Página inválida! Tente outra.");
                setCharacters([]);
            }else{
                setCharacters(response.data.items);
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
                    "https://superheroapi.com/api/0950c8973c9c944301bfa557a3637529/character-id?page=1&limit=12"
                );
                setCharacters(response.data.items);
            } catch(error){
                setErrorMsg("Erro ao buscar personagens!");
            }
            setLoading(false);
        }
        loadFirstPage();
    }, []);

    function handleSearch(){
        if(!page || page < 1){
            setErrorMsg("Digite um número de página");
            return;
        }
        fetchCharacters(page);
    }

    return(
        <div className="container">
            <h1>Dragon Ball Characters</h1>

            <div className="search-box">
                <input 
                    type="number" 
                    placeholder="Digite uma página de (1/20)" 
                    value={page}
                    onChange={(e) => setPage(e.target.value)} 
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>

            {loading && <p className="loading">Carregando...</p>}
            {errorMsg && <p className="loading">{errorMsg}</p>}

            <div className="cards-grid">
                {characters.map((char) => (
                    <Card
                        id={char.id}
                        name={char.name}
                        image={char.image}
                        powerstats={char.powerstats}
                        biography={char.biography}
                        work={char.work}
                        connections={char.connections}
                    />
                ))}
            </div>
        </div>
    );
}