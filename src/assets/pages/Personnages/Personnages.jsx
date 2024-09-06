import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Personnages.css';

export default function Personnages () {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); 
    const itemsPerPage = 100;
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const skip = (currentPage - 1) * itemsPerPage;
                console.log("skip: ", skip);
            
                const response = await axios.get(`http://localhost:3000/characters?limit=${itemsPerPage}&skip=${skip}`)
                console.log(response.data);
                // console.log(response.data.count);
                
                setData(response.data);
                setTotalPages(Math.ceil(response.data.count / itemsPerPage));
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
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
            <h1 className="title-section">Liste des Personnages</h1>
            <main className="main-personnage">
            {data.results.map((character) => {
                const pathImage = character.thumbnail.path + `/portrait_uncanny.jpg` ;
                return (
                    <div className="card-personnage" key={character._id}>
                    {/* {console.log(character._id)} */}
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