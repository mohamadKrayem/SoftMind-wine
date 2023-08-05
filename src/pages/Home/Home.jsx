import { useState, useEffect } from 'react';
//import WineFile from '../../WineFile';
import Card from '../../components/Card/Card';
import BasicCard from '../../components/BasicCard/BasicCard';
import Pagination from 'react-bootstrap/Pagination';
import './Home.scss';
import Cards from '../Cards/Cards';
import axios_lib from '../../lib/axios.js';
import { toast } from "react-toastify";
import fetchData from '../../api/index.js'

function Home({ header, end }) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [WineFile, setWineFile] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const WINES_PER_PAGE = 10;

  const indexOfLastWine = currentPage * WINES_PER_PAGE;
  const indexOfFirstWine = indexOfLastWine - WINES_PER_PAGE;

  useEffect(()=> {
    console.log(axios_lib)
    //const cancelToken = axios_lib.CancelToken;
    //const source = cancelToken.source();
    fetchWine(end);
    //return () => {
    //  source.cancel();
    //}
  }, [])

  async function fetchWine(endpoint) {
    try{
      setLoading(true);
      const data = await fetchData(endpoint);
      setWineFile(data);
    }catch(error) {
      toast.error("Something went wrong !!!!");
      setErr(true);
    }finally {
      setLoading(false);
    }
  }  

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function displayData() {
    return (
      <>
      <Cards WineFile={WineFile} indexOfFirstWine={indexOfFirstWine} indexOfLastWine={indexOfLastWine} />
      <Pagination size='sm' className='pagination'>
        {
          Array.from({ length: Math.ceil(WineFile.length / WINES_PER_PAGE) }).map((_, index) => (
            <Pagination.Item className='page-item' key={index} onClick={() => paginate(index + 1)} active={index+1==currentPage}>{index + 1}</Pagination.Item>
          ))
        }
      </Pagination>
      </>
    )
  }

  const displayLoading = () => <h2>Loading... </h2>
  
  const displayError = () => <h2>Something went wrong !!!</h2>

  function displayResult(loading, err) {
    if(loading) return displayLoading();
    else if(err) return displayError();
    return displayData();
  }

  return (
    <div className="home">
      <h1 style={{marginBottom: "30px"}}>{header}</h1>
      {
        displayResult(loading, err)
      }
    </div>
  );
}

export default Home

