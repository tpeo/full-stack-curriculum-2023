// Import the createTheme function from Material-UI (MUI). This function allows us to define a custom theme.
import { createTheme } from "@mui/material/styles";

// The purpose of having a theme is to have a consistent design language across our app.
// Rather than manually specifying colors, fonts, and other styles every time we use a component, 
// we can define them all in one place (this file) and then apply them consistently across the app.
// This makes the app look more cohesive and makes it easier to update styles.

const theme = createTheme({
  // The `palette` object allows us to define colors for our app. 
  // MUI components will use these colors by default, ensuring a consistent look.
  
  palette: {
    // The `primary` color is used by default by many MUI components.
    // For instance, a button will use the primary color as its background unless we specify otherwise.
    primary: {
      main: "#BF5700", // UT's Burnt Orange. This color will be used for primary elements. 
                       // Experiment by changing it and observe how various components in the 
                       // app adopt this color!
    },
    
    // The `secondary` color is like the primary color but is used less frequently. 
    // It's useful for things you want to stand out but not dominate the page.
    secondary: {
      main: "#FF8787", // A light red. It might be used for alerts or secondary buttons, for instance.
    },
  },
});

// We export the theme so we can use it in other parts of our app, particularly in App.js 
// where we wrap our components with the ThemeProvider component to provide them the custom theme.
export default theme;

