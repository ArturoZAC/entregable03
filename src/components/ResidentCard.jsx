import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import "./styles/residentCard.css"

const ResidentCard = ({resident}) => {

  // console.log(resident)
  const[resi, getResi] = useFetch();

  useEffect(() => {
    getResi(resident)
  }, [])

  console.log(resi)
  

  return (  
    <article className='resident'>
      <figure className='resident__photo'>
        <img src={resi?.image} alt="imgr&m"/>
        <figcaption className='resident__status'>
          <div className={`resident__circle ${resi?.status}`}></div>
          <p>{resi?.status}</p>
        </figcaption>
      </figure>
      <h3 className='resident__name'>{resi?.name}</h3>
      <hr />
      <ul className='resident__list'>
        <li className='resident__item'><span>Specie: </span><span>{resi?.species}</span></li>
        <li className='resident__item'><span>Origen: </span><span>{resi?.origin.name}</span></li>
        <li className='resident__item'><span>Eppisodes where appear: </span><span>{resi?.episode.length}</span></li>

      </ul>
    </article>
  )
}

export default ResidentCard