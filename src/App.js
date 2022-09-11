import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import NavBar from "./components/NavBar/NavBar";
import About from "./pages/About/About";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/about" component={About}/>
          <Route path="/" component={HomePage} />
          <Route path="turkeys/:id" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
