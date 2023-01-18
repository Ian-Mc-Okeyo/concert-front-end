import React from "react";
import { Link } from "react-router-dom";

import { BsFacebook } from "react-icons/bs";
import { FaGlobeAfrica } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";

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
        <footer>
          <div className="foot">
            <a href="https://twitter.com/sdajkuat" id="linkf" target="_blank">
              <BsTwitter id="sicon" />
              SDA church,JKUAT
            </a>

            <a href="" id="linkf" target="_blank">
              <FaInstagramSquare id="sicon" />
              SDA Church,JKUAT
            </a>
            <a
              href="https://www.facebook.com/jkusda/"
              id="linkf"
              target="_blank"
            >
              <BsFacebook id="sicon" />
              SDA Church,JKUAT
            </a>
            <a href="https://www.jkusdachurch.org/" id="linkf" target="_blank">
              <FaGlobeAfrica id="sicon" />
              JKUSDA Church
            </a>
          </div>
        </footer>
        {/* .....footer section ends........ */}
      </div>
    </>
  );
}
