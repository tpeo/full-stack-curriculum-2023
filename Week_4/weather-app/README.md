# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Weather App - React Homework

## Homework Overview
In the previous week, students built a weather app using regular JavaScript. Now, we are taking it to the next level by re-building the same weather app using React, a popular JavaScript library for building user interfaces. The goal is to introduce students to React's component-based architecture and state management concepts. The app should fetch weather data using the OpenWeatherMap API and display it in a user-friendly manner.

## Getting Started
1. Clone the project repository.
2. Navigate to the project folder and run `npm install` to install the required dependencies.
3. Obtain an API key from OpenWeatherMap and fill in the `apiKey` variable in the `App.js` file.

## Understanding the React Component Structure
The project has already been set up with a basic component structure. There are three main components:
1. `App.js`: The root component that holds the state data and manages data flow between child components.
2. `MainContainer.js`: A child component responsible for displaying the main weather information.
3. `SideContainer.js`: Another child component that handles user interactions and fetches location data.

## Step 1: Completing the Functionality in SideContainer.js
In the `SideContainer.js`, the first step is to complete the functionality that handles user interactions. Users can search for a city, and the app should use OpenWeatherMap's geocoding API to find matching locations. Implement the `search` function to make the API call and render the search results as a list of clickable items.

Hints:
- Use the `useState` hook to manage the city data and the search results.
- Pass a function from `App.js` as a prop to `SideContainer.js` to update the city data when a city is selected.

## Step 2: Connecting and Managing Data in App.js
In the `App.js` component, the next step is to manage the data flow between `MainContainer.js` and `SideContainer.js`. When a city is selected in `SideContainer.js`, update the city data in the state of `App.js`. Store the fetched weather data in the state of `App.js`.

Hints:
- Pass functions to update city data as props to `MainContainer.js` and `SideContainer.js`.

## Step 3: Rendering Data in MainContainer.js
In the `MainContainer.js` component, the final step is to render the weather data obtained from the API call. Use the city data (obtained from App.js as a prop) to make an API call to fetch weather data for that location. Display the current weather information along with a weather forecast for the next five days.

Hints:
- Use the weather data from the state of `App.js` to render the weather information in `MainContainer.js`.
- Use the `map` function to render multiple `WeatherCard` components for the weather forecast.

## Project Completion
After completing the three steps, your weather app built with React should be up and running! You have successfully implemented a weather app using React and learned about component communication, state management, and rendering data.

Happy coding! 🌞🌦️🌧️
