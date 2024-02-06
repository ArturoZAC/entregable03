import { useRef, useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import useFetch from "./hooks/useFetch"
import LocationCard from './components/LocationCard'
import ResidentCard from './components/ResidentCard'
import Pagination from './components/Pagination'

function App() {

  const [finder, setFinder] = useState(Math.floor(Math.random() * 126 + 1))
  const [location, getLocation, isLoading, hasError,vacio] = useFetch()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    // const randomLocation = Math.floor(Math.random() * 126 + 1);
    const url = `https://rickandmortyapi.com/api/location/${finder}`
    getLocation(url);
  }, [finder])

  // console.log(location)
  const textInput = useRef()

  const handleSubmit = event =>{
    event.preventDefault();
    setFinder(textInput.current.value.trim());
  }

  const quantity = 5;
  const second = currentPage * quantity;
  const first = second - quantity;
  const residentPart = location && location.residents.slice(first,second);
  const totalPage = location && Math.floor(location.residents.length / quantity + 1);



  console.log(finder)

  return (
    <div className='app'>
      {
        isLoading ?
          <h2>Loading...</h2>
        :
        <>
        <div className='banner'>
          <img className='imgrick' src="https://www.logoshirt-shop.de/out/pictures/generated/category/thumb/1140_250_100/rick-und-morty-t-shirts-logoshirt-shop.jpg" alt="rick" />
        </div>
        <h3 className='h3__title'>Welcome to Rick & Morty Page</h3>
          <form className='app__form' onSubmit={handleSubmit}>
            <input className='app__text' type="number" ref={textInput}
              placeholder='Type a number (1 to 126)'
              />
            <button className='app__btn'>Search</button>
          </form>
          {
            hasError || finder === "0" ?
              <h2 className='error'>This Location do not exist</h2>
              :
              <>
                <LocationCard 
                  location = {location}
                />
                {
                  location?.residents.length === 0 ? 
                    null
                  :
                  <>

                  <Pagination 
                      currentPage={currentPage}
                      setCurrentPage = {setCurrentPage}
                      totalPage = {totalPage}
                  />
                  <div className='app__container'>
                    {
                      residentPart.map(resident => (
                        <ResidentCard 
                          key = {resident}
                          resident = {resident}
                        />
                      ))
                    }
                  </div>
                  <Pagination 
                      currentPage={currentPage}
                      setCurrentPage = {setCurrentPage}
                      totalPage = {totalPage}
                    />


                  </>
                }

              </>
          }
        </>
      }
    </div>
    )
}

export default App
