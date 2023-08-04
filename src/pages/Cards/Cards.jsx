import './Cards.scss';
import BasicCard from '../../components/BasicCard/BasicCard';

function Cards({ WineFile, indexOfFirstWine, indexOfLastWine }) {
    return (
      <div className="cards">
        {
          WineFile.slice(indexOfFirstWine, indexOfLastWine).map((item, index) => (
            // <Card item={item} key={index} />
            <BasicCard item={item} key={index} />
          ))
        }
      </div>
    )
}

export default Cards;

