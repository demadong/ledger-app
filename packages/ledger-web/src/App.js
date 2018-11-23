import React, { Component } from 'react';

import EntryList from './entries/EntryList';
class App extends Component {
  render() {
    return (
      <div className="App">
        <EntryList />
      </div>
    );
  }
}

export default App;
