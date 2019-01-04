import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SurveyPage from './survey/SurveyPage';
import Home from './Home';

const App = () => (
  <Router>
    <div>
      <Header />

      <Route exact path="/" component={Home} />
      <Route path="/survey" component={SurveyPage} />
    </div>
  </Router>
);

const Header = () => (
  <div>
    <Link to="/">
      <button>home</button>
    </Link>
    <Link to="/survey">
      <button>survey</button>
    </Link>
  </div>
);

export default App;
