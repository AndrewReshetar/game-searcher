import React, { useState } from 'react'
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logo from '../img/logo.svg';
import { useHistory } from 'react-router-dom';
import { fetchSearch } from '../actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import Links from './Links';

function Nav() {
  const store = useSelector(state => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState('');

  const inputHandler = (e) => {
    setTextInput(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(fetchSearch(textInput));
    setTextInput('');
    history.push('/searched');
  }

  const clearSearched = () => {
    dispatch({ type: 'CLEAR_SEARCHED' });
    history.push('/');
  }

  const blockedBtn = store.isSignedIn ? '' : 'disabled';

  return (
    <StyledNav>
      <Links />
      <Logo onClick={clearSearched}>
        <img src={logo} alt="logo" />
        <h1>Ignite</h1>
      </Logo>
      <form className="search">
        <input type="text" onChange={inputHandler} value={textInput} disabled={blockedBtn} />
        <button className='searchButton' onClick={submitHandler} type='submit' disabled={blockedBtn}>Search</button>
      </form>
    </StyledNav>
  )
}

const StyledNav = styled(motion.div)`
  padding: 6rem 5rem 4rem 5rem;
  text-align: center;
  input{
    width: 30%;
    font-size:1.5rem;
    padding: 0.5rem;
    margin-top: 1rem;
    border: none;
    box-shadow:0px 0px 30px rgba(0,0,0,0.2);
  }
  button{
    font-size: 1.5rem;
    border: none;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background-color: #ff7676;
    color: white;
  }

  @media screen and (max-width: 768px){
    input{
    width: 100%;
    font-size:1.5rem;
    }
    button.searchButton{
    width: 50%;
    margin-top: 20px;
  }
  }

  @media screen and (max-width: 375px){
    input{
    width: 100vw;
    }
    button.searchButton{
    width: 80%;
    margin-left: 100px;
  }
  }

`

const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  padding: 1rem;
  cursor: pointer;
  img{
    height:2rem;
    width:2rem;
  }

  @media screen and (max-width: 375px){
    margin-left:75%;
  }
`

export default Nav
