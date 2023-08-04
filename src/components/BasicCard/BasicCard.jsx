import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Rating from '../Rating/Rating';
import useSize from '../../hooks/useSize';

function BasicCard({ item }) {
  // const [screenSize, setScreenSize] = useState(getCurrentDimension());


  // function getCurrentDimension() {
  //   return {
  //     width: window.innerWidth,
  //     height: window.innerHeight
  //   }
  // }

  // useEffect(() => {
  //   const updateDimension = () => {
  //     setScreenSize(getCurrentDimension())
  //   }
  //   window.addEventListener('resize', updateDimension);


  //   return (() => {
  //     window.removeEventListener('resize', updateDimension);
  //   })
  // }, [screenSize])

  const screenSize = useSize();

  return (
    <Card style={{minWidth: screenSize.width < 370 ? '240px': '250px'}}>
      <Card.Img variant="top" src={`${item.image}`} style={{ minWidth: screenSize.width < 370 ? '200px' : '250px', maxWidth: '250px', maxHeight: '250px', width: "10em", objectFit: 'contain' }} />
      <Card.Body>
        <Card.Text>
          <h3>- Wine: {item.wine}</h3>
          <h3>- Winery: {item.winery}</h3>
          <h3>- Location: {item.location}</h3>
          <Rating average={item.rating.average} />
          <small>Reviews: {item?.rating?.reviews}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BasicCard;