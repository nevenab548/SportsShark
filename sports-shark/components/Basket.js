import React from 'react';
import Router from "next/router";

export default function Basket(props) {
    const { cartItems, onAdd, onRemove, username } = props;
    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
    const taxPrice = itemsPrice * 0.14;
    const shippingPrice = itemsPrice > 2000 ? 0 : 20;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    async function handleSubmit(event) {
        event.preventDefault()

        let products = cartItems;
        let price = totalPrice;
        let user = username;

        const url = 'http://localhost:3000/napravi-order';

        async function postData(url = '') {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    'userName':user,
                    'products':products,
                    'priceTotal':price
                })
            })
            return response
        }

        postData(url)
            .then(data => {
                alert('Successful purchase!')
                Router.push("/porudzbine");
            });
    }

    return (
        <aside className="block cart-col">
            <h2>Shopping cart</h2>
            <div>
                {cartItems.length === 0 && <div>Empty cart</div>}
                {cartItems.map((item) => (
                    <div key={item.title} className="row">
                        <div className="col-2">{item.title}</div>
                        <div className="col-2">
                            <button onClick={() => onRemove(item)} className="remove">
                                -
                            </button>{' '}
                            <button onClick={() => onAdd(item)} className="add">
                                +
                            </button>
                        </div>

                        <div className="col-2 text-right">
                            {item.qty} x ${item.price.toFixed(2)}
                        </div>
                    </div>
                ))}

                {cartItems.length !== 0 && (
                    <>
                        <hr></hr>
                        <div className="row">
                            <div className="col-2">Product price</div>
                            <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
                        </div>
                        <div className="row">
                            <div className="col-2">Tax price</div>
                            <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
                        </div>
                        <div className="row">
                            <div className="col-2">Shipping</div>
                            <div className="col-1 text-right">
                                ${shippingPrice.toFixed(2)}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-2">
                                <strong>Total price</strong>
                            </div>
                            <div className="col-1 text-right">
                                <strong>${totalPrice.toFixed(2)}</strong>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <button onClick={handleSubmit}>
                                Order
                            </button>
                        </div>
                    </>
                )}
            </div>
        </aside>
    );
}