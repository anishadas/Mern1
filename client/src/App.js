import { Container } from "@mui/material";
import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { deepPurple } from '@mui/material/colors';
import Auth from "./components/Auth/Auth";
const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
      contrastText: deepPurple[500]
    }
  }
});
function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <ThemeProvider theme={theme}>
          <Navbar />
        </ThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container >
    </Router>
  )
}

export default App;
