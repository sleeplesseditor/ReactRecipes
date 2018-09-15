import React from 'react';
import posed from 'react-pose';
import { Link } from 'react-router-dom';

const RecipeItem = posed.li({
    shown: {
        opacity: 0
    },
    hidden: {
        opacity: 1
    }
});

export default ({ _id, imageUrl, name, category }) => (
    <RecipeItem
        style={{ background: `url(${imageUrl}) center center / cover no-repeat` }}
        className="card"
    >
        <span className={category}>{category}</span>
        <div className="card-text">
            <Link to={`/recipes/${_id}`}>
                <h4>{name}</h4>
            </Link>
        </div>
    </RecipeItem>
);