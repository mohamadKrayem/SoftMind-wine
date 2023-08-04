import './Card.scss';
function Card({ item }) {
    return (
        <div className="card">
            <img
                src={
                    item.image || ''
                }
                alt="Item Image"
                className="item-image"
            />
            <h3 className="winery">{item.winery}</h3>
            <h3 className="wine">{item.wine}</h3>
            <p className="location">{item.location || "Items's Location"}</p>
        </div>
    )
}

export default Card;

