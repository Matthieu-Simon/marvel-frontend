import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Comics.css';

export default function Comics () {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); 
    const itemsPerPage = 100;

    useEffect(() => {
        // console.log("useEffect");
        const fetchData = async () => {
            try {
                const skip = (currentPage - 1) * itemsPerPage;
                // console.log("skip: ", skip);

                const response = await axios.get(`http://localhost:3000/comics?limit=${itemsPerPage}&skip=${skip}`);
                console.log(response.data);
                const sortedData = response.data.results.sort((a, b) => {
                    a.title.localeCompare(b.title)
                });
                setData({...response.data, results: sortedData });
                setTotalPages(Math.ceil(response.data.count / itemsPerPage));
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

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
                        <Link to={`/comic/${comic._id}`}>
                            <button className="btn-personnage">Voir Comic</button>
                        </Link>
                    </div>
                )
            })}
            </main>
            
            <div className="pagination">
                <button disabled={currentPage === 1} className="btn-pagination" onClick={handlePreviousPage}>
                    Page précédente
                </button>
                <span>Page {currentPage} sur {totalPages}</span>
                <button disabled={currentPage === totalPages} className="btn-pagination" onClick={handleNextPage}>
                    Page suivante
                </button>
            </div>
        </>
    )
};