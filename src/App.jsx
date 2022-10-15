import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Netflix from "./pages/Netflix";
import Player from "./pages/Player";
import * as ROUTES from "./constants/routes";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import UserLiked from "./pages/UserLiked";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={ROUTES.LOGIN} element={<Login />} />
        <Route exact path={ROUTES.SIGNUP} element={<SignUp />} />
        <Route exact path={ROUTES.PLAYER} element={<Player />} />
        <Route exact path={ROUTES.HOME} element={<Netflix />} />
        <Route exact path={ROUTES.TV} element={<TVShows />} />
        <Route exact path={ROUTES.MOVIES} element={<Movies />} />
        <Route exact path={ROUTES.LIST} element={<UserLiked />} />
      </Routes>
    </BrowserRouter>
  );
}
