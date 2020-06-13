import React from 'react';
import './scss/main.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/static/Header.component';
import Generator from './components/generator/Generator.component';
import Database from './components/database/Database.component';
import ListDBs from './components/database/ListDBs.component'
import Stories from './components/stories/Stories.component'

function App() {
  return (
    <Router>
      <Header />
      <br />
      <Route path='/' exact component={Generator} />
      <Route path='/db' exact component={Database} />
      {/* save story to db */}
      <Route path='/outlines' exact component={Stories} />
      {/* list full dbs */}
      <Route path='/characters' exact component={ListDBs} />
      <Route path='/desires' exact component={ListDBs} />
      <Route path='/locations' exact component={ListDBs} />
      <Route path='/occupations' exact component={ListDBs} />
      <Route path='/themes' exact component={ListDBs} />
      <Route path='/worlds' exact component={ListDBs} />
    </Router>
  );
}

export default App;
