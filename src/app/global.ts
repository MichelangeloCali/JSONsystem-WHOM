import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --background: #121212;
    --white: #ffffff;
    --error: #B00B1F;
    --success: #3FE676;
    --input-border-normal: #343434;
    --input-border-focused: #d4d4d4;
    --input-background-normal: #121212;
    --input-background-hovered: #1C1C1C;
    --input-background-focused: #2D2D2D;
    --input-label-normal: #E1E1E1;
    --input-label-error: ##CF6679;
    --input-label-sucess: #4DA444;
    --button-primary: #4DA444;
    --button-primary-hover: #3FE676;
    --button-primary-background: #2D2D2D;
    --button-secundary: #8D8D8D;
    --button-secundary-hover: #E1E1E1;
    --button-secundary-background: #121212;
  }
  
  // font-size: 16px (Desktop)
  html {
    @media (max-width: 1080px) {
      font-size: 93.75%; //15px
    }
    @media (max-width: 720px) {
      font-size: 87.5%; //14px
    }
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }
  
  h1, h2, h3, h4, strong {
    font-weight: 600;
    color: #e1e1e1
  }

  button {
    cursor: pointer;
  }
  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }


  

`
