import React from "react";
import "./home.css";
// import kigumo from "./images/KigumoOfficial.jpeg";
import { Link } from "react-router-dom";
import Timer from "./timer/Timer";

import { BsFacebook } from "react-icons/bs";
import { FaGlobeAfrica } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";

export default function Home() {
  return (
    <>
      <div className="bg" id="fullpage"></div>
      {/* <div className="bg bg2" id="fullpage"></div> */}
      {/* <div className="bg bg3" id="fullpage"></div> */}
      <span></span>
      <div className="conent">
        <div className="landingview">
          <div className="landingviewpage">
            <Timer />

            <Link to="/buy">
              <button className="" type="submit">
                Book your ticket
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* ...........footer section............ */}
      {/* <footer>
        <div className="foot">
          <a href="https://twitter.com/sdajkuat" id="linkf" target="_blank">
            <BsTwitter id="sicon" />
            SDA church,JKUAT
          </a>

          <a href="" id="linkf" target="_blank">
            <FaInstagramSquare id="sicon" />
            SDA Church,JKUAT
          </a>
          <a href="https://www.facebook.com/jkusda/" id="linkf" target="_blank">
            <BsFacebook id="sicon" />
            SDA Church,JKUAT
          </a>
          <a href="https://www.jkusdachurch.org/" id="linkf" target="_blank">
            <FaGlobeAfrica id="sicon" />
            JKUSDA Church
          </a>
        </div>
      </footer> */}
      {/* .....footer section ends........ */}
    </>
  );
}
