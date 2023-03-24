import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  // Function to be called when Button 1 is clicked
  const handleButton1Click = () => {
    console.log('Button 1 clicked');
  };

  // Function to be called when Button 2 is clicked
  const handleButton2Click = () => {
    console.log('Button 2 clicked');
  };

  // Determine which button to display based on the current location
  let button = null;
  if (location.pathname === '/page1') {
    button = (
      <button onClick={handleButton1Click}>
        Button 1
      </button>
    );
  } else if (location.pathname === '/page2') {
    button = (
      <button onClick={handleButton2Click}>
        Button 2
      </button>
    );
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/page1">Page 1</Link>
          </li>
          <li>
            <Link to="/page2">Page 2</Link>
          </li>
        </ul>
      </nav>
      {button}
    </header>
  );
}

export default Header;
