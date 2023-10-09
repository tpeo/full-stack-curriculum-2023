import React, { useState } from 'react';
import "../styles/SideContainer.css"; // Import the CSS file for SideContainer

function SideContainer({ apiKey }) {
  const [searchResults, setSearchResults] = useState([]);

  function search() {
    // TODO: Get the value from the search input (use 'document.querySelector')
    // TODO: Check if the searchInput has a value (use 'if' statement)
    // TODO: Use the 'fetch' function to make the API call URL with the searchInput and apiKey
    // TODO: Convert the response to JSON (use '.then' method on the response)
    // TODO: Update the 'searchResults' state with the JSON data (use 'setSearchResults')
  }

  function renderSearchResults(searchResults) {
    // TODO: Loop through 'searchResults' array using 'map' and create list items with city names
    // TODO: In the click event listener, call the 'selectCity' function (you need to define it)
  }

  // TODO: Define the 'selectCity' function (it should update the city state in MainContainer.js)
  // HINT: You need to pass 'selectCity' function as a prop from App.js to MainContainer.js
  // When calling the 'selectCity' function from here, what arguments does it need?
  // How can you pass the required information from here to MainContainer.js through App.js?

  return (
    <div id="side-container">
      <div>
        <input id="search-input" placeholder="search for a city"></input>
        <button id="search-button" onClick={search}>
          search
        </button>
      </div>
      <ul id="search-results-list">
        {/* Call the renderSearchResults function here with 'searchResults' as argument */}
      </ul>
    </div>
  );
}

export default SideContainer;
