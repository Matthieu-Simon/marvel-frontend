import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import './Collections.css';

export default function Collection () {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [characterName, setCharacterName] = useState('');
    const { characterId } = useParams();
    // console.log(characterId);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const characterResponse = await axios.get(`https://site--marvel-backend--wmhs7j45p7n2.code.run/character/${characterId}`);
                // console.log(characterResponse.data);
                
                const characterData = characterResponse.data;
                // console.log(characterData.name);
                
                setCharacterName(characterData.name)

                const comicsResponse = await axios.get(`https://site--marvel-backend--wmhs7j45p7n2.code.run/comics/${characterId}`);
                console.log(comicsResponse.data);

                setData(comicsResponse.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [characterId]);

    return isLoading ? <p>Loading</p> : (
        <>
            <h1 className="title-collection">Collection de {characterName}</h1>
            <main className="content-collection">
                <div className="section-collection">
                    {data.comics.map((comic) => {
                        {/* {console.log(comic)} */}
                        return (
                            <div className="card-collection" key={comic._id}>
                                <div>
                                    <h2 className="title-comic-collection">{comic.title}</h2>
                                </div>
                                <img className="img-collection" src={comic.thumbnail.path + ".jpg"} alt="Photo comics" />
                                <Link to={`/comic/${comic._id}`}>
                                    <button className="btn-collection-comic">Voir Comic</button>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </main>
        </>
        
    )
};