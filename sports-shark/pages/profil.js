import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState } from "react";
import Router from "next/router";
import fetch from "isomorphic-unfetch";
import nextCookie from "next-cookies";
import { withAuthSync } from "../utils/auth";
import { Button, Modal } from "react-bootstrap";


function MyVerticallyCenteredModal(props) {

    const [productData, setProductData] = useState({
        id: props.product._id,
        title: '',
        description: '',
        price: '',
    })

    const handleEdit = async (event) => {
        event.preventDefault()
        setProductData(Object.assign({}, productData, { error: '' }))

        const id = productData.id;
        const title = productData.title;
        const description = productData.description;
        const price = productData.price;

        if (title === '' || description === '' || price === '') {
            alert("Niste popunili sva neophodna polja!");
            return;
        }

        async function postData(url = '') {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    'id': id,
                    "title": title,
                    "description": description,
                    "price": price,
                })
            })
            return response
        }

        postData("http://localhost:3000/edit-product")
            .then(data => {
                alert("Edit success!");
                props.onHide();
                window.location.reload(false);
            });
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.product.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <h5 className="card-title mt-4"> Product data </h5>
                    <hr />
                    <div className="col form-group">
                        <label>Title </label>
                        <input value={productData.title} type="text"
                            className="form-control" placeholder={props.product.title}
                            required
                            onChange={event =>
                                setProductData(
                                    Object.assign({}, productData, { title: event.target.value })
                                )
                            } />
                    </div>
                    <div className="col form-group">
                        <label>Description </label>
                        <input value={productData.description} type="text"
                            className="form-control" placeholder={props.product.description}
                            required
                            onChange={event =>
                                setProductData(
                                    Object.assign({}, productData, { description: event.target.value })
                                )
                            } />
                    </div>
                    <div className="col form-group">
                        <label>Price </label>
                        <input value={productData.price} type="text"
                            className="form-control" placeholder={props.product.price}
                            required
                            onChange={event =>
                                setProductData(
                                    Object.assign({}, productData, { price: event.target.value })
                                )
                            } />
                    </div>
                    <hr />
                    <button type="submit"
                        className="btn btn-secondary btn-block" onClick={handleEdit}> Edit
                    </button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


const Profil = (props) => {

    const [show, setShow] = useState(false);

    const [productData, setProductData] = useState({
        id: '',
        title: '',
        description: '',
        price: '',
    })

    const [userData, setUserData] = useState({
        order: '',
        user:props.token,
    })

    const handleShow = (product) => {
        setProductData(product);
        setShow(true);
    }

    const handleDelete = async (event) => {
        event.preventDefault()

        const product = event.target.name;

        const response = await fetch("http://localhost:3000/obrisi-proizvod", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ "title": product }),
        }).then(r => {
            alert("Success!");
            window.location.reload(false);
        });
    }


    let showAdmin = false;

    if (props.type === "admin") {
        showAdmin = true;

    }

    const token = props.token;

    const array = Object.values(props.orders);
    const array2 = props.products;

    async function handleSubmit(event) {
        event.preventDefault()
        setUserData(Object.assign({}, userData, { error: '' }))

        const order = userData.order;
        const user = userData.user;

        const response = await fetch("http://localhost:3000/obrisi-order", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ "orderId": order, 'username':user }),
        }).then(r => {
            alert("Success!");
            window.location.reload(false);
        });
    }

    var src = "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";

    return (
        <div>
            <Header />
            <div className="card card-cascade container rounded bg-white mt-5 mb-5 d-flex justify-content-center">
                <div className="row">
                    <div>
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img
                            className="rounded-circle mt-5" width="150px"
                            src={src} alt={""} /><span
                                className="text-black-50">{token}</span><span> </span></div>
                    </div>
                </div>
            </div>
            <div className={'card card-cascade container rounded bg-white mt-5 mb-5 d-flex justify-content-center'}
                style={{ maxWidth: '200px' }}>
                <p>Pick an order:</p>
                <hr />
                <div style={{ padding: "5px" }}>
                    <select value={userData.order} style={{ width: "100%" }}
                        onChange={event =>
                            setUserData(
                                Object.assign({}, userData, { order: event.target.value })
                            )
                        }>
                        {array.map(type => {
                            return <option key={Math.random()}>{type}</option>
                        })}
                    </select>
                </div>
                <button onClick={handleSubmit}>Cancel order</button>
            </div>
            <div className={"article-div"}>
                {showAdmin === true &&
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" />
                                <th scope="col">Article</th>
                                <th scope="col" />
                                <th scope="col" className="text-center" />
                                <th scope="col" className="text-right" />
                                <th scope="col" className="text-right" />
                            </tr>
                        </thead>
                        <tbody>
                            {array2.map((product, ind) => {
                                return (
                                    <tr key={ind}>
                                        <td><img style={{ width: "100px", height: "70px" }} src={product.picture} alt={""} />
                                        </td>
                                        <td>{product.title}</td>
                                        <td />
                                        <td />
                                        <td className="text-right">
                                            <Button onClick={() => handleShow(product)}>Edit product</Button>
                                        </td>
                                        <td className="text-right">
                                            <Button name={product.title} onClick={handleDelete}>Delete product</Button>
                                        </td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>

                }
            </div>
            <MyVerticallyCenteredModal
                show={show}
                onHide={() => setShow(false)}
                product={productData}
            />
            <Footer />
        </div>
    )
}
Profil.getInitialProps = async (ctx) => {
    const token = nextCookie(ctx);
    const apiUrl = "http://localhost:3000/pribavi-korisnika";

    const redirectOnError = () =>
        typeof window !== "undefined"
            ? Router.push("/prijava")
            : ctx.res.writeHead(302, { Location: "/prijava" }).end();

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ "username": token.token }),
    });

    const products = await fetch("http://localhost:3000/svi-proizvodi", {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    });

    if (response.status === 200) {
        return { ...await response.json(), 'products': await products.json() };
    } else {
        return await redirectOnError();
    }
};
export default withAuthSync(Profil)