import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from '../components/Main';
import Basket from '../components/Basket';
import { useState } from 'react';
import nextCookie from "next-cookies";
import Router from "next/router";
import fetch from "isomorphic-unfetch";
import {withAuthSync} from "../utils/auth";

const Shop = (props) => {

    const array = Object.values(props);
    array.pop();

    const products = array;
    const [cartItems, setCartItems] = useState([]);
    const onAdd = (product) => {
        const exist = cartItems.find((x) => x.title === product.title);
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x.title === product.title ? { ...exist, qty: exist.qty + 1 } : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
    };
    const onRemove = (product) => {
        const exist = cartItems.find((x) => x.title === product.title);
        if (exist.qty === 1) {
            setCartItems(cartItems.filter((x) => x.title !== product.title));
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x.title === product.title ? { ...exist, qty: exist.qty - 1 } : x
                )
            );
        }
    };

    return (
        <div>
            <Header/>
            <div className="row">
                <Main products={products} onAdd={onAdd}/>
                <Basket
                    cartItems={cartItems}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    username={props.token}
                />
            </div>
            <Footer/>
        </div>
    )
}
Shop.getInitialProps = async (ctx) => {
    const token = nextCookie(ctx);
    const apiUrl = "http://localhost:3000/pribavi-korisnika";

    const redirectOnError = () =>
        typeof window !== "undefined"
            ? Router.push("/prijava")
            : ctx.res.writeHead(302, {Location: "/prijava"}).end();

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({"username":token.token}),
    });

    if (response.status === 200) {
        const response2 = await fetch("http://localhost:3000/svi-proizvodi", {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
        if (response2.status === 200) {
            return response2.json();
        }
    } else {
        return await redirectOnError();
    }
};
export default withAuthSync(Shop)
