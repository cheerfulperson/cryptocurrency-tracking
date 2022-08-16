import * as React from 'react'
import { Link } from 'react-router-dom';
import './NotFound.scss'

function NotFound() {
    return (
        <section className='not-found'><h1>Not Found</h1> <Link to=''>home</Link></section>
    )
}

export default NotFound;