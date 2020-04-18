import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./about";
function App() {
  return (
    <div>
      <switch>
        {/* <Route path="/" component={Home} /> */}
        <Route path="/about" component={About} />
      </switch>
    </div>
  );
}

export default App;
