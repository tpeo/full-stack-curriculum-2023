import React, { useState } from "react";
import "../styles/SideContainer.css"; // Import the CSS file for SideContainer

function SideContainer(props) {
  // We are using the same search() and renderSearchResults() given to you from the previous HW!
  function search() {
    // takes the value from the search input
    let searchInput = document.querySelector("#search-input").value;
    if (searchInput) {
      // creates the API call with the value from the search input as a query
      let apiCall = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput},,US&limit=5&appid=${props.apiKey}`;
      // calls the API
      fetch(apiCall)
        .then((response) =>
          // after recieving a response, take the response from the server and convert it to JSON
          response.json()
        )
        .then((data) => {
          // after recieving the converted JSON data, pass the JSON to the renderSearchResults() function
          renderSearchResults(data);
        });
    }
  }

  function renderSearchResults(searchResults) {
    // selects the unordered list element search-results-list
    const ul = document.querySelector("#search-results-list");
    // shows the unordered list if was hidden previously
    ul.classList.remove("hidden");
    // clears out any list items from the previous search
    ul.innerHTML = "";
    // loops through each search result and creates and attaches a list item for the unordered list
    searchResults.forEach((searchResult, index) => {
      // creates a new unordered list element
      const li = document.createElement("li");
      // sets the list item's class as search-result
      li.setAttribute("class", "search-result");
      // sets the text inside the list item as the name and state of the city
      const fullName = searchResult.name + ", " + searchResult.state;
      li.innerHTML = fullName;
      // if the list item of a city is clicked, call the selectCity() function
      li.addEventListener("click", () =>
        selectCity(
          fullName,
          searchResult.name,
          searchResult.state,
          searchResult.lat,
          searchResult.lon
        )
      );
      // attaches the list item elements to search-results-list
      ul.appendChild(li);
    });
  }

  /*
  TODO: Modify the 'selectCity' function.
  
  In your previous HW, the select city function might have done everything. With vanilla 
  Javascript, your function could have made all the API calls and rendered the weather info
  in one function. However, in React, the components are modular. 

  Now, with React, we want to follow the principle of "lifting state up." That is, when a piece of data 
  affects more than one component, it's often easier to move it closer to the common ancestor of those
  components.

  Here's what you need to do:

  1. Remember, the SideContainer's purpose now is to just determine which city was selected.
  2. Once a city is selected in SideContainer, you need to inform the parent (App.js) about this change.
     - You can achieve this by calling a function passed as a prop from App.js to SideContainer.
     - This function will set the state of the selected city in App.js.
  3. Once the state is set in App.js, it can pass this selected city data down to the MainContainer component
     which will then display the weather info for that city.
  4. In this 'selectCity' function, instead of just logging the city, you'll want to call the function passed 
     down from App.js to set the selected city. Something like:
     
     `props.setSelectedCity(city);`

  5. Ensure that App.js passes down the right function to SideContainer that sets its state for the selected city.
  
  Keep these steps in mind as you make the modifications. Good luck!
  */

  // function that is called whenever a city has been selected
  function selectCity(fullName, name, state, lat, lon) {
    // hides the search-results-list since it is not needed right now
    document.querySelector("#search-results-list").className = "hidden";
    // sets the global city variable
    document.querySelector("#search-input").value = "";
    let city = {
      fullName: fullName,
      name: name,
      state: state,
      lat: lat,
      lon: lon,
    };
    console.log(city);
  }

  return (
    <div id="side-container">
      <div>
        <input id="search-input" placeholder="search for a city"></input>
        <button id="search-button" onClick={search}>
          search
        </button>
      </div>
      <ul id="search-results-list"></ul>
    </div>
  );
}

export default SideContainer;
