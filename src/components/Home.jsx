import React, { useEffect } from 'react'
import Game from './Game';
import { useDispatch, useSelector } from 'react-redux';
import { loadGames } from '../actions';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import GameDetail from '../components/GameDetail';

import { Switch, Route } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const pathId = location.pathname.split('/')[2];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGames())
  }, [dispatch])

  const { popular, newGames, upcoming, searched, random } = useSelector(state => state.games);



  return (
    <GameList>
      {pathId && <GameDetail />}
      {searched.length ? (
        <div className="searched">
          <h2>Searched Games</h2>
          <Games>
            {searched.map(game => {
              return <Game key={game.id} name={game.name} released={game.released} id={game.id} image={game.background_image} />
            })}
          </Games>
        </div>
      ) : ''}

      <Switch>
        <Route path='/' exact>
          <Games>
            {random.map(game => {
              return <Game key={game.id} name={game.name} released={game.released} id={game.id} image={game.background_image} />
            })}
          </Games>
        </Route>

        <Route path='/upcoming' >
          <h2>Upcoming Games</h2>
          <Games>
            {upcoming.map(game => {
              return <Game key={game.id} name={game.name} released={game.released} id={game.id} image={game.background_image} />
            })}
          </Games>
        </Route>

        <Route path='/popular'>
          <h2>Popular Games</h2>
          <Games>
            {popular.map(game => {
              return <Game key={game.id} name={game.name} released={game.released} id={game.id} image={game.background_image} />
            })}
          </Games>
        </Route>

        <Route path='/new'>
          <h2>New Games</h2>
          <Games>
            {newGames.map(game => {
              return <Game key={game.id} name={game.name} released={game.released} id={game.id} image={game.background_image} />
            })}
          </Games>
        </Route>
      </Switch>
    </GameList>
  )
}

const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2{
    padding: 5rem 0rem;
  }
`

const Games = styled(motion.div)`
  min-height: 80vh;
  display:grid;
  grid-template-columns: repeat(auto-fit,minmax(500px,1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`

export default Home;