import React from 'react';

export default function Product(props) {
    const { product, onAdd } = props;
    return (
        <div>
            <img className="small" src={product.picture} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div>${product.price}</div>
            <div>
                <button onClick={() => onAdd(product)}>Add to cart</button>
            </div>
        </div>
    );
}