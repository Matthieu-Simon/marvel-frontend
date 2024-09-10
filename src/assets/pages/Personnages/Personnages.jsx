import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Personnages.css';
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Personnages () {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); 
    const itemsPerPage = 100;

    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const skip = (currentPage - 1) * itemsPerPage;
                // console.log("skip: ", skip);
                
                const response = await axios.get(`https://site--marvel-backend--wmhs7j45p7n2.code.run/characters?limit=${itemsPerPage}&skip=${skip}`)
                // console.log(response.data);
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


    useEffect(() => {
        if (search) {
            const searchCharacters = async () => {
                try {
                    const response = await axios.get(`https://site--marvel-backend--wmhs7j45p7n2.code.run/characters?name=${search}`);
                    // console.log(response.data);
                    
                    setFilteredData(response.data.results);
                } catch (error) {
                    console.log(error.message);
                }
            };
            searchCharacters();
        }
    }, [search]);

    const handleSearch = (search) => {
        setSearch(search);
        setCurrentPage(1);
    }

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
            <SearchBar onSearch={handleSearch} />
            <div className="main-personnage">
            {(search ? filteredData : data.results).map((character) => {
                const pathImage = character.thumbnail.path + `/portrait_uncanny.jpg` ;
                return (
                    <div className="card-personnage" key={character._id}>
                        <img className="image-personnage" src={pathImage} />
                        <div className="content-personnage">
                            <h2 className="title-personnage">{character.name}</h2>
                            <p className="description-personnage">
                            {character.description}
                            </p>
                        </div>
                        <Link to={`/comics/${character._id}`}>
                            <button className="btn-personnage">Voir Comics</button>
                        </Link>
                    </div>
                    )
            })}
            </div>
            {!search && (
                <div className="pagination">
                    <button disabled={currentPage === 1} className="btn-pagination" onClick={handlePreviousPage}>
                        Page précédente
                    </button>
                    <span>Page {currentPage} sur {totalPages}</span>
                    <button disabled={currentPage === totalPages} className="btn-pagination" onClick={handleNextPage}>
                        Page suivante
                    </button>
                </div>
            )}
        </>
    )
};