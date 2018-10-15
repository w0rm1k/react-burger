import React from 'react';

import classes from './Order.css';
import Button from '../UI/Button/Button';

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({ 
            name: ingredientName, 
            amount: props.ingredients[ingredientName]
        })
    };

    const ingredientOutput = ingredients.map(ig => {
        return <span
                 style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '2px'
                }}
                 key={ig.name}>{ig.name} ({ig.amount})</span>
    })
    return (
        <div className={classes.Order}>
            Ingredients: {ingredientOutput}
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
            <Button 
                btnType="Delete"
                clicked={props.deleteOrder}>DELETE ORDER</Button>
        </div>
    )
};
    

export default order;