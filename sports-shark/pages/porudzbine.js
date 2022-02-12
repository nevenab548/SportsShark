import Header from "../components/Header";
import Footer from "../components/Footer";
import nextCookie from "next-cookies";
import Router from "next/router";
import fetch from "isomorphic-unfetch";
import {withAuthSync} from "../utils/auth";
import {useState} from "react";
import {Modal} from 'react-bootstrap'
import {Button} from "react-bootstrap";

const Porudzbine = (props) => {

    const [show, setShow] = useState(false);
    const [order, setOrder] = useState('');
    const [price, setPrice] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = (event) => {
        setOrder(event.target.name)
        setShow(true);
        orderProducts(order).then(res=>{
            setPrice(res.body.priceTotal)
        });
    }

    async function orderProducts(order) {
        const res = await fetch('http://localhost:3000/pribavi-order', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({"orderId": order}),
        });
        return res.json();
    }

    const array = props.orders;

    return (
        <div>
            <Header/>
            <div className={"order-div"}>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col"/>
                        <th scope="col">Order ID</th>
                        <th scope="col"/>
                        <th scope="col" className="text-center"/>
                        <th scope="col" className="text-right"/>
                        <th scope="col" className="text-right"/>
                    </tr>
                    </thead>
                    <tbody>
                    {array.map((order, ind) => {
                        return (
                            <tr key={ind}>
                                <td/>
                                <td>{order}</td>
                                <td/>
                                <td/>
                                <td className="text-right"/>
                                <td className="text-right">
                                    <Button name={order} onClick={handleShow}>Show order</Button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{order}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Order total price: {price}$</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Footer/>
        </div>
    )
}
Porudzbine.getInitialProps = async (ctx) => {
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
        body: JSON.stringify({"username": token.token}),
    });
    if (response.status === 200) {
        return response.json();
    } else {
        return await redirectOnError();
    }
};
export default withAuthSync(Porudzbine)

