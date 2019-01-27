import React from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Play from "./play.js";
import StartGame from "./startGame.js";

export default class Root extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={StartGame} />
          <Route exact path="/:code" component={Play} />
        </div>
      </BrowserRouter>
    );
  }
}
