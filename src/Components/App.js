import React, { Component } from 'react';
import Router from "Components/Router";
import GloblaStyles from "Components/GlobalStyles";


class App extends Component {
  render() {
    return (
      <>
        <Router />
        <GloblaStyles />
      </>
    );
  }
}

export default App;
