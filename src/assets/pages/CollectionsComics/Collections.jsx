import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './Collections.css';

export default function Collection () {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { characterId } = useParams();
    // console.log(characterId);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const response = await axios.get(`http://localhost:3000/comics/${characterId}`);
                // console.log(response.data);

                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [characterId]);

    return isLoading ? <p>Loading</p> : (
        <>
            <h1 className="title-collection">Collection de </h1>
            <main className="content-collection">
                <div className="section-collection">
                    {data.comics.map((comic) => {
                        {console.log(comic)}
                        return (
                            <div className="card-collection" key={comic._id}>
                                <div>
                                    <h2 className="title-comic-collection">{comic.title}</h2>
                                </div>
                                <img className="img-collection" src={comic.thumbnail.path + ".jpg"} alt="Photo comics" />
                            </div>
                        )
                    })}
                </div>
            </main>
        </>
        
    )
};