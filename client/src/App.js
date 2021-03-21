import React from "react";
import "materialize-css";
//import "fontsource-roboto";

import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";

function App() {
  const routes = useRoutes();
  return (
    <Router>
      <div className="app">{routes}</div>
    </Router>
  );
}

export default App;
