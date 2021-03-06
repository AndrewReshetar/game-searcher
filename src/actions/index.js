import axios from 'axios';

import { popularGamesURL, upcomingGamesURL, newGamesURL, gameDetailsURL, gameScreenshotURL, searchGameURL, randomGameURL } from '../api';

export const loadGames = () => async (dispatch) => {
  const popularData = await axios.get(popularGamesURL());
  const newGamesData = await axios.get(newGamesURL());
  const upcomingData = await axios.get(upcomingGamesURL());
  const randomData = await axios.get(randomGameURL());

  dispatch({
    type: 'FETCH_GAMES',
    payload: {
      popular: popularData.data.results,
      upcoming: upcomingData.data.results,
      newGames: newGamesData.data.results,
      random: randomData.data.results
    }
  })
}

export const loadDetail = (id) => async (dispatch) => {
  dispatch({
    type: 'LOADING_DETAIL'
  })
  const detailData = await axios.get(gameDetailsURL(id));
  const screenShotData = await axios.get(gameScreenshotURL(id));
  dispatch({
    type: 'GET_DETAIL',
    payload: {
      game: detailData.data,
      screen: screenShotData.data
    }
  })

}

export const fetchSearch = (game_name) => async dispatch => {
  const searchedGames = await axios.get(searchGameURL(game_name));

  dispatch({
    type: 'FETCH_SEARCHED',
    payload: {
      searched: searchedGames.data.results
    }
  })
}


//google 
export const signIn = (name) => {
  return {
    type: 'SIGN_IN',
    payload: name
  }
}

export const signOut = () => {
  return {
    type: 'SIGN_OUT'
  }
}