import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './Components/Main'

import StateProvider from './Components/Popup/_useHook'
import Popup from './Components/Popup/Popup'
import Modal from 'react-modal'

Modal.setAppElement('#root');
function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route component={Main} path="/" exact />
        <Route component={Boost} path="/boost" exact />
      </Switch>
    </BrowserRouter>
  );
}

function Boost() {
  return (
    <StateProvider>
      <Popup />
    </StateProvider>
  )
}



export default App;
