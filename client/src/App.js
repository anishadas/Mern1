import { Container } from "@mui/material";
import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { deepPurple } from '@mui/material/colors';
import Auth from "./components/Auth/Auth";
import Details from "./components/Comments/Details";
const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
      contrastText: deepPurple[500]
    }
  }
});
function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <Router>
      <Container maxWidth="xl">
        <ThemeProvider theme={theme}>
          <Navbar />
        </ThemeProvider>
        <Routes>
          <Route path="/"  element={<Navigate replace to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" exact element={<Details/>} />
          <Route path="/auth" element={!user?<Auth />:<Navigate replace to='/posts'/>} />
        </Routes>
      </Container >
    </Router>
  )
}

export default App;
