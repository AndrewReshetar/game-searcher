import React from 'react'
import GlobalStyles from './components/GlobalStyles';
import Home from './components/Home'
import { Route } from 'react-router-dom';
import Nav from './components/Nav';

import { useSelector } from 'react-redux';

function App() {
  const store = useSelector(state => state.auth);
  return (
    <div>
      <GlobalStyles />
      <Nav />
      {store.isSignedIn ?
        <Route path={['/game/:id', '/']}>
          <Home />
        </Route>
        : null
      }
      {!store.isSignedIn ?
        <h4 style={{ textAlign: 'center', color: 'red' }}>Please Sign In!</h4>
        :
        null
      }
    </div>
  )
}

export default App

