import React, { useState } from 'react';

import './App.css';
import Navbar from './Navbar';
import { Switch, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Create from './Create';
import View from './View';

function App() {
  const [data, setData] = useState([]);

  const addData = (d) => {
    setData([...data, d]);
  };

  return (
    <div className='App'>
      <Navbar />
      <Switch>
        <Route exact path='/' render={() => <Homepage />}></Route>
        <Route
          exact
          path='/create'
          render={(routeProps) => <Create {...routeProps} getData={addData} />}
        ></Route>
        <Route
          exact
          path='/view'
          render={() => <View confessions={data} />}
        ></Route>
      </Switch>
    </div>
  );
}

export default App;
