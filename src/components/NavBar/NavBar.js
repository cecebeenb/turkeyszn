import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">🦃 TurkeySZN</Link>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
