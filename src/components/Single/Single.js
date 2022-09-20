import React from 'react'
import { img_300, unavailable } from '../config/config'
import './Single.css'
import { Badge } from '@mui/material'
import SingleModal from '../SingleModal/SingleModal'

const Single = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <SingleModal media_type={media_type} id={id}>
      <Badge badgeContent={vote_average} color={vote_average>6?'primary' : 'secondary'}/>
      <img className= "picture" src={poster ? `${img_300}/${poster}` : unavailable } alt={title} />
      <b className='title'>{title}</b>
      <span className='title-date'>
        {media_type === 'tv' ? "Tv Show" : "Movie"}
      <span className='title-date'>{date}</span>
      </span>
    </SingleModal>
  )
}

export default Single