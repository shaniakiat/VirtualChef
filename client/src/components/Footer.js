import React from "react";
// import { MDBContainer, MDBFooter } from "mdbreact";
import "./Styles/Footer.css";

const FooterPage = () => {
  return (
    <div className="footer">
      &copy; {new Date().getFullYear()} Copyright.{" "}
      <a
        href="https://github.com/DavidLuong98"
        target="_blank"
        rel="noopener noreferrer"
      >
        {" "}
        David L.{" "}
      </a>
      <a
        href="https://github.com/shaniakiat"
        target="_blank"
        rel="noopener noreferrer"
      >
        {" "}
        Shania K.{" "}
      </a>
      <a
        href="https://github.com/AnthonyIbe"
        target="_blank"
        rel="noopener noreferrer"
      >
        {" "}
        Anthony I.
      </a>
    </div>
  );
};

export default FooterPage;
