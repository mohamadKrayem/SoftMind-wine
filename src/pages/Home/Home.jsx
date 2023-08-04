import { useState, useEffect } from 'react';
import WineFile from '../../WineFile';
import Card from '../../components/Card/Card';
import BasicCard from '../../components/BasicCard/BasicCard';
import Pagination from 'react-bootstrap/Pagination';
import './Home.scss';
import Cards from '../Cards/Cards';

function Home({ header }) {
  const [currentPage, setCurrentPage] = useState(1);
  const WINES_PER_PAGE = 10;

  const indexOfLastWine = currentPage * WINES_PER_PAGE;
  const indexOfFirstWine = indexOfLastWine - WINES_PER_PAGE;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home">
      <h1 style={{marginBottom: "30px"}}>{header}</h1>
      <Cards WineFile={WineFile} indexOfFirstWine={indexOfFirstWine} indexOfLastWine={indexOfLastWine} />
      <Pagination size='sm' className='pagination'>
        {
          Array.from({ length: Math.ceil(WineFile.length / WINES_PER_PAGE) }).map((_, index) => (
            <Pagination.Item className='page-item' key={index} onClick={() => paginate(index + 1)} active={index+1==currentPage}>{index + 1}</Pagination.Item>
          ))
        }
      </Pagination>
    </div>
  );
}

export default Home

