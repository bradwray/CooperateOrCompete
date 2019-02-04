import React from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import GamePlayer from "./gamePlayer.js";
import GameRunner from "./gameRunner.js";

export default class Root extends React.Component {
   render() {
      return (
         <BrowserRouter>
            <div>
               <Route exact path="/" component={GameRunner} />
               <Route exact path="/:code" component={GamePlayer} />
            </div>
         </BrowserRouter>
      );
   }
}
