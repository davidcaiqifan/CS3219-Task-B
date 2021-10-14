import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./custom.scss";
import ZoomPage from './pages/ZoomPage';
import AddZoom from './pages/AddZoom';
import Edit from './pages/edit';
import DetailsPage from './pages/DetailsPage';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">ZoomClasses</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/edit" className="nav-link">Edit ZoomClass</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create ZoomClass</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/" exact component={ZoomPage} />
          <Route path="/create" exact component={AddZoom} />
          <Route path="/edit" exact component={Edit} />
          <Route exact path="/details/:id" component={DetailsPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
