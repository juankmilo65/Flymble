import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import FeaturedRooms from '../components/FeaturedRooms'

  const Home = () => {
    return <>
    <Hero>
        <Banner title="Hotel Rooms" subtitle="Rooms at $10">
        </Banner>
        </Hero>
        <FeaturedRooms/>
        </>
}

export default Home