import React from 'react'
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { useDispatch } from 'react-redux';
import { loadDetail } from '../actions';

import { Link } from 'react-router-dom';


function Game({ name, released, id, image }) {
  const dispatch = useDispatch();
  const loadDetailHandler = () => {
    document.body.style.overflow = 'hidden';
    dispatch(loadDetail(id))
  }
  return (
    <StyledGame onClick={loadDetailHandler}>
      <Link to={`/game/${id}`}>
        <h3>{name}</h3>
        <p>{released}</p>
        <img src={image} alt={name} />
      </Link>
    </StyledGame>
  )
}

const StyledGame = styled(motion.div)`
  margin: 0 0 40px 0;
  min-height:30vh;
  box-shadow: 0px 5px 20px rgba(0,0,0,0.4);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  overflow:hidden;
  img{
    width: 100%;
    height:40vh;
    object-fit:cover;
  }

  @media screen and (max-width: 375px){
    margin-left: -20%;
  }
`

export default Game
