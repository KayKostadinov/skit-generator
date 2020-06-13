import React from 'react';
import { Link } from 'react-router-dom';


export default function Header() {


    return (
        <nav className="navbar">
            <div className='nav-links'>
                <Link className='nav-link' to="/">
                    <p className='fas fa-atom'></p>
                    <p className='cat-name' >Generator</p>
                </Link>
                <Link className='nav-link' to="/outlines">
                    <p className='fas fa-book'></p>
                    <p className='cat-name' >outlines</p></Link>
                <Link className='nav-link' to="/db">
                    <p className='fas fa-database'></p>
                    <p className='cat-name' >Database</p></Link>
            </div>
        </nav>
    )
}