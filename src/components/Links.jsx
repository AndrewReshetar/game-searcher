import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { signIn, signOut } from '../actions';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Links() {
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [auth2, setAuth2] = useState(null);
  const dispatch = useDispatch();
  const store = useSelector(state => state.auth);
  useEffect(() => {
    const onAuthChange = (isSignedIn) => {
      if (isSignedIn) {
        dispatch(signIn(userName));
      } else {
        dispatch(signOut());
      }
    }
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '538795503303-us86c6m723p1re7cnjlo4b5ic5hc2n14.apps.googleusercontent.com',
        scope: 'email profile'
      }).then(() => {
        const auth = window.gapi.auth2.getAuthInstance();
        setAuth2(auth);
        onAuthChange(auth.isSignedIn.get());
        auth.isSignedIn.listen(onAuthChange);
        if (auth.isSignedIn.get() === true) {
          setUserName(auth.currentUser.get().getBasicProfile().getGivenName());
          setImageUrl(auth.currentUser.get().getBasicProfile().getImageUrl());
        }
      })
    })

  }, [dispatch, userName]);

  const onSignInClick = () => {
    auth2.signIn();
  }

  const onSignOutClick = () => {
    auth2.signOut()
    history.push('/');
  }

  const renderedLinks = () => {
    return (
      <>
        <li>
          <NavLink to='/upcoming' activeStyle={{ color: 'red ', opacity: .6 }}>Upcoming</NavLink>
        </li>
        <li>
          <NavLink to='/popular' activeStyle={{ color: 'red ', opacity: .6 }}>Popular</NavLink>
        </li>
        <li>
          <NavLink to='/new' activeStyle={{ color: 'red ', opacity: .6 }}>New</NavLink>
        </li>
      </>
    )
  }

  const renderedAva = () => {
    return (
      <li style={{ marginRight: '24rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={imageUrl} alt={userName} style={{ borderRadius: '50%', width: '25%', height: '25%' }} />
        <p style={{
          fontSize: '1em', paddingLeft: '10px', color: 'tomato'
        }}>{userName}</p>
      </li>
    )
  }

  const renderAuthButton = () => {
    if (store.isSignedIn) {
      return (
        <button onClick={onSignOutClick} className="googleButton" style={{ backgroundColor: 'lightblue' }}>
          Sign Out
        </button>
      )
    } else {
      return (
        <button onClick={onSignInClick} className="googleButton" style={{ backgroundColor: 'lightblue' }}>
          Sign In
        </button>
      )
    }
  }

  return (
    <StyledLink>
      <ul>
        {store.isSignedIn && store.username ? renderedAva() : ''}
        {store.isSignedIn ? renderedLinks() : null}
        <li>
          {renderAuthButton()}
        </li>
      </ul>
    </StyledLink >
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
