import React, { useState } from "react";
import "../styles/MainContainer.css"; // Import the CSS file for MainContainer

function MainContainer({ apiKey }) {

  function formatDate(daysFromNow = 0) {
    let output = "";
    var date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    output += date.toLocaleString("en-US", { weekday: "long" }).toUpperCase();
    output += " " + date.getDate();
    return output;
  }
  
  // TODO: Create state variables to hold weather data
  // HINT: You can use 'useState' hook to create state variables
  // HINT: What data do you need to display the weather information?

  return (
    <div id="main-container">
      <div id="weather-container">
        {/* TODO: Display the weather data here using 'weather' state */}
        {/* HINT: You can use conditional rendering (ternary operator) to check if 'weather' is available */}
        {/* HINT: How can you extract the required information from 'weather' state to display? */}
      </div>
    </div>
  );
}

export default MainContainer;
