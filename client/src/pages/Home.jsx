import React from 'react'
import Header from '../components/Header'
import Aside from './Aside'

const Home = () => {
    return (
        <div>
            <Header />
            <div className="screen-layout">
                <Aside/>
            </div>
        </div>
    )
}

export default Home
