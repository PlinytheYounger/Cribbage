import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Instructions from './Components/Instructions/Instructions';
import Footer from './Components/Footer/Footer';
import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
    <Router>
      <Header />
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/instructions">
        <Instructions />
      </Route>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
