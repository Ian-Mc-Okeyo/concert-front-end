import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
    return(
    <>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>
        <div className="content">
            <h1>BRIGHTEN YOUR CORNER CONCERT</h1>
            <Link to ='/buy' className='btn btn-primary'>Get Your ticket</Link>
        </div>
    </>
    )
}

export default Home