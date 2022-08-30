/* eslint-disable react/react-in-jsx-scope */

import { ThemeProvider } from "@mui/material";
import ItemCount from "./components/ItemCount";
import ItemListContainer from "./components/ItemListContainer";
import NavBar from "./components/NavBar";
import theme from "./MuiTheme";


function App() {
  const saludo = "Sitio Web en construccion";
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <ItemListContainer saludo={saludo} />
      <ItemCount stock={5} initial={1} />
      {/* 
       <Formularios/>
      <Promesas/>
      <Contador />
      <Mensaje />
      <EnableOnInputChange/> */}
      {/* <Demo/> */}
      {/* <Producto item={producto1} color={'coral'} consoleHolaMundo={consoleHolaMundo}/> */}
    </ThemeProvider>
  );
}

export default App;
