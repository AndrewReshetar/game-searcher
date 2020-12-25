import React from 'react'
import GlobalStyles from './components/GlobalStyles';
import Home from './components/Home'
import { Route } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (
    <div>
      <GlobalStyles />
      <Nav />
      <Route path={['/game/:id', '/']}>
        <Home />
      </Route>
    </div>
  )
}

export default App

