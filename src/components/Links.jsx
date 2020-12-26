import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

function Links() {
  return (
    <StyledLink>
      <ul>
        <li>
          <NavLink to='/upcoming' activeStyle={{ color: 'red ', opacity: .6 }}>Upcoming</NavLink>
        </li>
        <li>
          <NavLink to='/popular' activeStyle={{ color: 'red ', opacity: .6 }}>Popular</NavLink>
        </li>
        <li>
          <NavLink to='/new' activeStyle={{ color: 'red ', opacity: .6 }}>New</NavLink>
        </li>
        <li>
          <button style={{ backgroundColor: 'lightblue' }}>Log In</button>
        </li>
      </ul>
    </StyledLink>
  )
}

const StyledLink = styled(motion.div)`
  width: 87%;
  position:absolute;
  top:0;
  ul{
    display:flex;
    justify-content: flex-end;
    align-items: center;
    list-style-type:none;
    li{
      margin-right: 2%;
      font-size: 1.2rem;
      padding: 10px 0;
      font-family: 'Abril Fatface', cursive;
      letter-spacing:0.5px;
      a{
        opacity: .8;
        &:hover{
          opacity: .5;
        }
      }
      button{
        margin-left: 2rem;
      }
    }
  }

`

export default Links
