import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './Components/Main'
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import StateProvider from './Components/Popup/_useHook'
import Popup from './Components/Popup/Popup'
import Modal from 'react-modal'

const client = new ApolloClient({
  uri: 'https://thunderboosting.com/graphql',
});

Modal.setAppElement('#root');

function App() {

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route component={Main} path="/" exact />
          <Route component={Boost} path="/boost" exact />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>

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

