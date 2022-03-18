// This is a magic theme file for gatsby-theme-material-ui

import { createTheme } from "@mui/material";

// TODO do a theme later
const theme = createTheme({
    // palette: {
    //   mode: "dark",
    // },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
            ul {
                margin: 0;
                padding: 0;
            }
        `
      },
    },
//   typography: {
    //   fontFamily: ["Montserrat", "sans-serif"].join(","),

//   },
});

export default theme;
