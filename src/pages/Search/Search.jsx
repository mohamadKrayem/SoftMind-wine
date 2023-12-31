import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import WineFile from '../../WineFile';
import { useSearchParams } from "react-router-dom";
import Cards from '../Cards/Cards';
import Pagination from 'react-bootstrap/Pagination';
import './Search.scss';
import useSize from '../../hooks/useSize';


function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [queryParams, setQueryParams] = useSearchParams();
    const [waiting, setWaiting] = useState(false);
    const [cards, setCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const WINES_PER_PAGE = 10;
    const [queryStrings, setQueryStrings] = useState({
        page: currentPage,
    });
    const indexOfLastWine = currentPage * WINES_PER_PAGE;
    const indexOfFirstWine = indexOfLastWine - WINES_PER_PAGE;
    const [clickedPage, setClickedPageState] = useState(false);

    const paginate = (pageNumber) => {
        setClickedPageState(true);
        setQueryStrings({
            ...queryStrings,
            page: pageNumber,
        });
        setCurrentPage(pageNumber)
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (queryStrings.q !== "") {
                // if (queryStrings.page !== "" && setClickedPage) {
                //     setQueryParams(queryStrings);
                //     setClickedPageState(false);
                // }
                setWaiting(true);
                setQueryParams(queryStrings);
            }
        }, 300);
        return () => {
            clearTimeout(timer);
        };
    }, [queryStrings.q]);

    useEffect(() => {
        if (queryStrings.page !== "" && clickedPage) {
            setQueryParams(queryStrings);
            setClickedPageState(false);
        }
    }, [queryStrings.page, clickedPage])

    useEffect(() => {
        if (queryParams.get("page") !== null) {
            setCurrentPage(parseInt(queryParams.get("page")));
            let _query_strings = {
                page: parseInt(queryParams.get("page")),
            }
            if (queryParams.get("q") !== null) {
                _query_strings.q = queryParams.get("q");
            }
            setQueryStrings({ ..._query_strings });
        }
    }, [])

    useEffect(() => {
        if (queryParams.get("q") === "null") {
            console.log("nulll")
            return setCards([]);
        }
        
        if (queryParams.get("q") !== "") {
            setWaiting(true);
            filterItems(WineFile);
        }
        return () => { };
    }, [queryParams]);

    function filterItems(data) {
        const filteredItems = data && data.length > 0 ? data.filter((item) => {
            return item.wine.toLowerCase().includes(queryParams.get('q')?.toLowerCase());
        }) : [];
        setCards(filteredItems);
    }

    function handleChange(e) {
        setSearchTerm(e.target.value);
        console.log("the e is :", e.target.value)
        if (e.target.value === "") {
            let _query_strings = { ...queryStrings };
            delete _query_strings.q;
            setQueryStrings({ ..._query_strings });
            return;
        }
        setQueryStrings({
            ...queryStrings,
            q: e.target.value,
        });
    }

    const size = useSize();

    return (
        <div className='search-container'>
            <h1 style={{ marginBottom: '20px' }}>Search</h1>
            <Form.Control style={{marginBottom: '40px', height:"30px", padding: "5px 7px", width: size.width>500? '20rem':'13rem'}} type="text" placeholder="Search" onChange={handleChange} />
            <div>
                <Cards WineFile={cards} indexOfFirstWine={indexOfFirstWine} indexOfLastWine={indexOfLastWine} />
                <Pagination size='sm' className='pagination'>
                    {
                        Array.from({ length: Math.ceil(cards.length / WINES_PER_PAGE) }).map((_, index) => (
                            <Pagination.Item className='page-item' key={index} onClick={() => paginate(index + 1)} active={index + 1 == currentPage}>{index + 1}</Pagination.Item>
                        ))
                    }
                </Pagination>
            </div>
        </div>
    )
}

export default Search;


