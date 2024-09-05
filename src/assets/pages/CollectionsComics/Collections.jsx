import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './Collections.css';

export default function Collection () {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();
    console.log(id);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/comics/:${id}`);
                console.log(response.data);
                // setData(response.data);
                // setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    });

    return (
        <>
            <h1 className="title-collection">Collection de comics</h1>
            <main className="content-collection">

            </main>
            <p className="pagination">Pagination</p>
        </>
        
    )
};