import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

// images
import Logo from "../../assets/images/my-store.png";
// images

// style
import "./style.scss";
// style

export default function Header() {

// let button=null;

//   if (location.pathname === '/add-product') {

//     button = (
//       <Link to="/" >
//       <span className="nav-link mx-2 active" aria-current="page">
//         cancel
//       </span>
//       </Link>
//     );
//   } else if (location.pathname === '/') {

//     button = (
//       <Link to="add-product" >
//       <span className="nav-link mx-2 active" aria-current="page">
//         Add Products
//       </span>
//       </Link>
//     );
//   }





  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light" id="neubar">
        <div className="container">
          <span className="navbar-brand">
            <img src={Logo} height="50" alt="the logo" />
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className=" collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
              
              </li>
              <li className="nav-item">
                <span className="btn btn-danger">Mass Delete</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
