import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="turkeys/:id" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
