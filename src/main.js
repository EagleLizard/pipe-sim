
import React from "react";
import ReactDOM from "react-dom";

import { App } from './app/app';

const Index = () => {
  return (
    <div>
      <App/>
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById("app-root"));
