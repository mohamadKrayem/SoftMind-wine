import '../Cards/Cards.scss';
import BasicCard from '../../components/BasicCard/BasicCard';

function CardsWithoutPagination({ data }) {
    return (
        <div className="cards">
            {
                data.length > 0 && data ?
                data.map((item, index) => (
                    <BasicCard item={item} key={index} />
                )):<></>
            }
        </div>
    )
}

export default CardsWithoutPagination;