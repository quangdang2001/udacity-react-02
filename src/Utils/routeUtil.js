import {
  LoginPage,
  HomePage,
  LeaderBoardPage,
  NewPage,
  NotFoundPage,
} from "../Layout";
import QuestionPage from "Layout/QuestionPage/QuestionPage";

import { Navigate } from "react-router-dom";

export const routes = [
  {
    id: 1,
    path: "/",
    element: <HomePage />,
    title: "Home Page",
    nav: "Home",
    isShow: true,
  },
  {
    id: 2,
    path: "/leaderboard",
    element: <LeaderBoardPage />,
    title: "LeaderBoard Page",
    nav: "LeaderBoard",
    isShow: true,
  },
  {
    id: 3,
    path: "/add",
    element: <NewPage />,
    title: "Add Poll Page",
    nav: "New",
    isShow: true,
  },
  {
    id: 5,
    path: "/login",
    element: <LoginPage />,
    title: "Login Page",
    nav: "Login",
    isShow: false,
  },
  {
    id: 4,
    path: "/questions/:question_id",
    element: <QuestionPage />,
    title: "Question Page",
    nav: "Question Page",
    isShow: false,
  },
  {
    id: 6,
    path: "notFound",
    element: <NotFoundPage />,
    title: "Poll Application",
    nav: "",
    isShow: false,
  },
  {
    id: 7,
    path: "*",
    element: <Navigate to="/notFound" />,
    title: "Default",
    nav: "",
    isShow: false,
  },
];
