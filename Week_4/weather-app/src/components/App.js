import React, { useState } from 'react';
import '../styles/App.css'; // Import the CSS file for App

import MainContainer from './MainContainer';
import SideContainer from './SideContainer';

const apiKey = ''; // Your OpenWeatherMap API key here

function App() {
  // TODO: Create state variables to hold city data
  // HINT: You can use 'useState' hook to create state variables
  // HINT: What data do you need to share between 'SideContainer' and 'MainContainer'?

  // TODO: Create a function to update the city data in the state
  // HINT: You can pass this function as a prop to 'SideContainer'
  // HINT: What data does this function need to update the state with?

  return (
    <div className="app-container">
      {/* TODO: Pass the city data update function as a prop to 'SideContainer' */}
      {/* HINT: You can use 'selectCity' as the prop name */}
      <MainContainer apiKey={apiKey} /* TODO: Pass the city data as props to 'MainContainer' */ />
      <SideContainer apiKey={apiKey} /* TODO: Pass the city data update function as a prop to 'SideContainer' */ />
    </div>
  );
}

export default App;