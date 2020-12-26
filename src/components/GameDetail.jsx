import React from 'react'
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import playStation from '../img/playstation.svg';
import steam from '../img/steam.svg';
import xbox from '../img/xbox.svg';
import nintendo from '../img/nintendo.svg';
import apple from '../img/apple.svg';
import gamepad from '../img/gamepad.svg';
import starFull from '../img/star-full.png';
import starEmpty from '../img/star-empty.png';



function GameDetail() {
  const history = useHistory();
  const exitDetailHandler = (e) => {
    const element = e.target;
    if (element.classList.contains('shadow')) {
      document.body.style.overflow = 'auto';
      history.goBack();
    }
  }

  const getPlatform = (platform) => {
    switch (platform) {
      case 'PlayStation 4': return playStation;
      case 'Xbox One': return xbox;
      case 'PC': return steam;
      case 'Nintendo Switch': return nintendo;
      case 'iOS': return apple;
      default: return gamepad;
    }
  }
  const getStars = () => {
    const stars = [];
    const rating = Math.floor(game.rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img alt="star" key={i} src={starFull} />)
      } else {
        stars.push(<img alt="star" key={i} src={starEmpty} />)
      }
    }
    return stars;
  }
  const { game, screen, isLoading } = useSelector(state => state.details);
  return (
    <>
      {!isLoading && (
        <CardShadow className="shadow" onClick={exitDetailHandler}>
          <Detail>
            <Stats>
              <div className="rating">
                <h3>{game.name}</h3>
                <p>Rating: {game.rating}</p>
                {getStars()}
              </div>
              <Info>
                <h3>Platforms</h3>
                <Platforms>
                  {game.platforms.map(data => {
                    return <img key={data.platform.id} alt={data.platform.id} src={getPlatform(data.platform.name)} />
                  })}
                </Platforms>
              </Info>

            </Stats>
            <Media>
              <img src={game.background_image} alt="media" />
            </Media>
            <Description>
              <p>{game.description_raw}</p>
            </Description>
            <div className="gallery">
              {screen.results.map(screen => {
                return <img key={screen.id} src={screen.image} alt="game" />
              })}
            </div>
          </Detail>
        </CardShadow>
      )}
    </>
  )
}

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left: 0;
  &::-webkit-scrollbar{
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #ff7676;
  }
  &::-webkit-scrollbar-track{
    background: white;
  }
`
const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  img{
    width: 100%;
  }
`

const Stats = styled(motion.div)`
  display:flex;
  align-items:center;
  justify-content: space-between;
  img{
    width:2rem;
    height: 2rem;
    display:inline;
  }
`

const Info = styled(motion.div)`
  text-align:center;
`

const Platforms = styled(motion.div)`
 display:flex;
 justify-content:space-evenly;
 img{
   margin-left: 3rem;
 }
`

const Media = styled(motion.div)`
 margin-top: 5rem;
 img{
   width: 100%;
 }
`

const Description = styled(motion.div)`
 margin: 5rem 0rem;
 
`


export default GameDetail
