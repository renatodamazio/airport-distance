import React from "react";
import { Paper, Typography } from "@mui/material";
import Search from "../seach/Search";
import "./searchStyles.css";

import illustration2 from "../../illustrations/2.jpg";
import illustration3 from "../../illustrations/3.jpg";
import logo from "../../illustrations/logo.png";


function SearchModal() {
  return (
    <div className="main-search" style={{backgroundImage: `url(${illustration2})`}}>
      <div className="searchContainer">
          <div className="searchHeader">
            <img src={logo} alt="Airport calculation" title="Calculate the distance between two airports"/>
          </div>
          <Search />
      </div>
    </div>
  );
}

export default SearchModal;
