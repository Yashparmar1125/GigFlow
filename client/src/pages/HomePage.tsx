import Header from '../components/Header'
import Hero from '../sections/Hero'
import Category from '../sections/Category'
import Counting from '../sections/Counting'
import Process from '../sections/Process'
import Developers from '../sections/Developers'
import Subscribe from '../sections/Subscribe'
import Reviews from '../sections/Reviews'
import Trust from '../sections/Trust'
import Blog from '../sections/Blog'
import CTA from '../sections/CTA'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />      
      <Category />
      <Counting />
      <Process />
      <Developers />
        <Subscribe />
        <Reviews />
        <Trust />
        <Blog />
        <CTA />
      <Footer />
    </>
  )
}

export default HomePage
