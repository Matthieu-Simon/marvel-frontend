import { useState, useEffect } from 'react';
import axios from 'axios';

import './Comics.css';

export default function Comics () {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // console.log("useEffect");
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/comics');
                console.log(response.data);
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return isLoading ? <p>Loading...</p> : (
        <>
            <h1 className="title-comics">Liste des comics</h1>
            <main className="comics-section">
            {data.results.map((comic) => {
                return (
                    <div className="comics-card" key={comic._id}>
                        <img className="image-comics" src={comic.thumbnail.path + ".jpg"} />
                        <div className="comics-content">
                            <h2 className="comics-title">{comic.title}</h2>
                            <p className="comics-description">{comic.description}</p>
                        </div>
                    </div>
                )
            })}
            </main>
            <p className="pagination">Pagination</p>
        </>
    )
};