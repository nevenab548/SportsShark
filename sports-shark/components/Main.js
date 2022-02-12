import React, {useState} from 'react';
import Product from './Product';
import Form from 'react-bootstrap/Form'

function Main(props) {
    const {products, onAdd} = props;
    const [sortData, setSortData] = useState('');

    var byPrice = products.slice(0);
    byPrice.sort(function (a, b) {
        return parseFloat(a.price) - parseFloat(b.price);
    });
    var byPriceDesc = products.slice(0);
    byPriceDesc.sort(function (a, b) {
        return parseFloat(b.price) - parseFloat(a.price);
    });
    let productsShow = products;
    if(sortData.sort==='asc') {
        productsShow = byPrice;
    } else if(sortData.sort==='desc') {
        productsShow = byPriceDesc;
    }

    return (
        <main className="block prod-col">
            <h2>Products</h2>
            <hr/>
            <Form.Select aria-label="Default select example" onChange={event => {
                setSortData(
                    Object.assign({}, sortData, {sort: event.target.value})
                )
            }
            }>
                <option>No sorting</option>
                <option value="asc">Price ascending</option>
                <option value="desc">Price descending</option>
            </Form.Select>
            <hr/>
            <div className="row">
                {
                    productsShow.map((product) => (
                        <Product key={product.title} product={product} onAdd={onAdd}/>
                    ))}
            </div>
        </main>
    );
}
export default React.memo(Main);