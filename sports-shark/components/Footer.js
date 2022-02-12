const Footer = () => {
    return (
        <div className='container'>
            <footer className='py-3 my-4'>
                <ul className='nav justify-content-center border-bottom pb-3 mb-3'>
                    <li className='nav-item'>
                        <a href='/' className='nav-link px-2 text-muted'>
                            Home
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href='/porudzbine' className='nav-link px-2 text-muted'>
                            Orders
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href='/shop' className='nav-link px-2 text-muted'>
                            Shop
                        </a>
                    </li>
                </ul>
                <p className='text-center text-muted'>© 2022 The Sharks</p>
            </footer>
        </div>
    );
};

export default Footer;