import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';
import './BasicCard.scss';

function Rating({ average }) {
    const stars = [
        <BsStar className="star" />,
        <BsStarHalf className="star" />,
        <BsStarFill className="star" />,
    ];

    return (
        <div className="rating">
            <p>Rating ({average}): </p>
            {Array.from({ length: 5 }).map((_, i) => {
                let percentage = Math.round(average * 2) / 2;
                console.log(percentage)

                if (i < percentage) {
                    if (percentage - i === 0.5) {
                        return stars[1];
                    }
                    return stars[2];
                }
                return stars[0];
            })}
        </div>
    )
}

export default Rating;

