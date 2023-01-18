import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <div className="content">
        <h1>BRIGHTEN YOUR CORNER CONCERT</h1>
        <Link to="/buy">
          <button className="" type="submit">
            RSVP
          </button>
        </Link>
        {/* ...........footer section............ */}

        {/* .....footer section ends........ */}
      </div>
    </>
  );
}
