import React, { useState } from 'react'
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logo from '../img/logo.svg';
import { useHistory } from 'react-router-dom';
import { fetchSearch } from '../actions';
import { useDispatch } from 'react-redux';

import Links from './Links';

function Nav() {
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

  return (
    <StyledNav>
      <Links />
      <Logo onClick={clearSearched}>
        <img src={logo} alt="logo" />
        <h1>Ignite</h1>
      </Logo>
      <form className="search">
        <input type="text" onChange={inputHandler} value={textInput} />
        <button onClick={submitHandler} type='submit'>Search</button>
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
`

export default Nav
