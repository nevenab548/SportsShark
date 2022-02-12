import React, {useState} from 'react';
import Product from './Product';
import Form from 'react-bootstrap/Form'

function Main(props) {
    const {products, onAdd} = props;
    const [sortData, setSortData] = useState('');
    const [categoryData, setCategoryData] = useState('');

    let productsShow = products;
    if(categoryData.category) {
        productsShow = productsShow.filter((product) => product.type == categoryData.category);
    }
    var byPrice = productsShow.slice(0);
    byPrice.sort(function (a, b) {
        return parseFloat(a.price) - parseFloat(b.price);
    });
    var byPriceDesc = productsShow.slice(0);
    byPriceDesc.sort(function (a, b) {
        return parseFloat(b.price) - parseFloat(a.price);
    });
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
            <Form.Select aria-label="Default select example" onChange={event => {
                setCategoryData(
                    Object.assign({}, categoryData, {category: event.target.value})
                )
            }
            }>
                <option value={''}>All categories</option>
                <option value="Socks">Socks</option>
                <option value="Shirts">Shirts</option>
                <option value="Shoes">Shoes</option>
                <option value="Shorts">Shorts</option>
                <option value="Trousers">Trousers</option>
                <option value="Footballs">Footballs</option>
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