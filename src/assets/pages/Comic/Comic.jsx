import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './Comic.css';

export default function Comic () {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { comicId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://site--marvel-backend--wmhs7j45p7n2.code.run/comic/${comicId}`);
                console.log(response.data);

                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [comicId]);

    return isLoading ? <p>Loading...</p> : (
        <>
            <h2 className="title-comic">{data.title}</h2>
            <main className="comic-content">
                <img className="image-comic" src={data.thumbnail.path + ".jpg"} alt="Image Comic" />
                <div className="section-description">
                    <p className="comic-description">{data.description}</p>
                </div>
            </main>
        </>
        
    )
}