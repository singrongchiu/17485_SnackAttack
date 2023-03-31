import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from "./components/Login";
import Project from "./components/Project";

import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateUser from './components/CreateUser';

const defaultpage = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/project",
    element: <Project/>,
  },
  {
    path: "/newuser",
    element: <CreateUser/>,
  }
]);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <div className = "App">
//         <Routes/>
//       </div>
//     </BrowserRouter>
//   </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={defaultpage} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
