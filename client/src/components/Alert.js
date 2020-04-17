import React from "react";

import Fade from "react-reveal/Fade";

const Alert = ({ type, text }) => {
  return (
    <>
      <Fade up>
        <div className={`alert alert-${type}`}>{text}</div>
      </Fade>
    </>
  );
};

export default Alert;
