import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// bootstrap

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddProducts from './routes/AddProducts';
import { useState } from 'react';
import ProductList from './routes/ProductsList';
import Root from './routes/Root';
import NotFoundComp from './routes/NotFound';
// react router


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root  />,
    children:[
      {index:true ,element:<ProductList/>},
      {
        path: "add-product",
        element: <AddProducts />,
      },
    ],
    errorElement:(<NotFoundComp/>)
  },
 
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

