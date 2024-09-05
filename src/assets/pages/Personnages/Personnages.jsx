import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Personnages.css';

export default function Personnages () {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/characters')
                console.log(response.data);
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    return isLoading ? <p>Loading...</p> : (
        <>
            <h1 className="title-section">Liste des Personnages</h1>
            <main className="main-personnage">
            {data.results.map((character) => {
                const pathImage = character.thumbnail.path + `/portrait_uncanny.jpg` ;
                return (
                    <div className="card-personnage" key={character._id}>
                        <img className="image-personnage" src={pathImage} />
                        <div className="content-personnage">
                            <h2 className="title-personnage">{character.name}</h2>
                            <p className="description-personnage">{character.description}</p>
                        </div>
                        <Link to={`/comics/${character._id}`}>
                            <button className="btn-personnage">Voir Comics</button>
                        </Link>
                    </div>
                )
            })}
            </main>
            <p className="pagination">Pagination</p>
        </>
    )
};