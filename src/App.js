import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import MoviesPage from './pages/MoviePage/MoviePage';
import MovieDetailsPage from './pages/MoviePage/MovieDetailsPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/movies" component={MoviesPage} />
        <Route path="/movie-details/:id" component={MovieDetailsPage} />
        <Redirect to="/" /> {/* Redirects to the login page if no other routes match */}
      </Switch>
    </Router>
  );
};

export default App;
