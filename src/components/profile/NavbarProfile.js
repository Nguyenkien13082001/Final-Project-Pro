import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavbarProfile.css";

const li = [
  ["profile", "img/manage user.svg"],
  ["Learning Process", "img/manage  order.svg"],
  ["Evaluate", "img/arrow-chart-8379.svg"],
  ["Get Premium", "img/thanhtoan.svg"],
];

export default function NavbarProfile() {
  const [window, setWindow] = useState(true);

  return (
    <div>
      <nav className="navbar-menu">
        <ul className="navbar__list p-0">
          {li.map((item, i) => (
            <div className="navbar__li-box" key={i}>
              <Link to={`/${item[0].toLowerCase().replace(/ /g, "-")}`}>
                <img
                  src={item[1]}
                  alt={item[0]}
                  style={{ paddingLeft: window ? 27 : 17 }}
                />
                <li
                  className="navbar__li"
                  style={{ display: window ? "inline-block" : "none" }}
                >
                  {item[0]}
                </li>
              </Link>
            </div>
          ))}
        </ul>
      </nav>
    </div>
  );
}
