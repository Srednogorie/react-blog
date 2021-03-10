import './App.sass';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import WritersPage from "./pages/WritersPage";
import AboutPage from "./pages/AboutPage";
import SignPage from "./pages/SignPage";

function App() {
  return (
      <Router>
          <div className="page-wrapper">
              <Navigation/>
              <Switch>
                  <div className="content-wrapper">
                      <Route path="/" exact component={HomePage} />
                      <Route path="/writers" exact component={WritersPage} />
                      <Route path="/about" exact component={AboutPage} />
                      <Route path="/sign" exact component={SignPage} />
                  </div>
              </Switch>
              <Footer />
          </div>
      </Router>
  );
}

export default App;
