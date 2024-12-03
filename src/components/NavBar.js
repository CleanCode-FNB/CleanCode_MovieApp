import React from "react";
// import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    // <nav className="navbar">
    //     <ul>
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li>
    //         <Link to="/search">Search</Link>
    //       </li>
    //     </ul>
    // </nav>
    <div class="navbar"> 
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/search">Search</a></li>
    </ul>
      <button>SIGN IN</button>
    </div>
  );
};

export default Navbar;

