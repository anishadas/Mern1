import { Container } from "@mui/material";
import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { deepPurple } from '@mui/material/colors';
import Auth from "./components/Auth/Auth";
import Details from "./components/Comments/Details";
import { connect } from 'react-redux';
const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
      contrastText: deepPurple[500]
    }
  }
});
function App({ user }) {
  
  return (
    <Router>
      <Container maxWidth="xl">
        <ThemeProvider theme={theme}>
          <Navbar />
        </ThemeProvider>
        <Routes>
          <Route path="/" element={<Navigate replace to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" exact element={<Details />} />
          <Route path="/auth" element={!user ? <Auth /> : <Navigate replace to='/posts' />} />
        </Routes>
      </Container >
    </Router>
  )
}

const mapStateToProps = state => ({
  user: state.userData.user,
  message: state.userData.message// Replace 'yourReducer' with the actual name of your reducer
});

const mapDispatchToProps = dispatch => ({
  // fetchData: () => dispatch(fetchDataAction()), // Replace with your actual action creator
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

