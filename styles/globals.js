import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
/* styles/globals.css or styles/globals.js */
body.dark {
  background-color: #0a0a0a;
  color: white;
}

body.light {
  background-color: #f0f0f0;
  color: black;
}

/* You can also target specific elements like this */
body.dark .navbar {
  background-color: #1e1e1e;
}

body.light .navbar {
  background-color: #ffffff;
}

  body {
    background-color: #0a0a0a;
    font-family: 'Segoe UI', sans-serif;
  }
  a {
    color: #00bcd4;
    text-decoration: none;
  }
    
`

export default GlobalStyle