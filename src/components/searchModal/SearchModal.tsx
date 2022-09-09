import React from "react";
import Search from "../seach/Search";
import "./searchStyles.css";

import illustration2 from "../../illustrations/2.jpg";
import logo from "../../icons/icons8-perímetro-virtual.gif";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

function SearchModal() {
  const origin = useSelector((state:any) => state.coordinates.origin);

  return (
    <div className={`main-search ${origin?.lat ? "hidden-main-search" : ""}`} style={{backgroundImage: `url(${illustration2})`}}>
      <div className="searchContainer">
          <div className="searchHeader">
            <div className="logo">
              <img src={logo} alt="Airport calculation" title="Calculate the distance between two airports"/>
            </div>
            <div className="description">
              <Typography>Calculate the distance between two airports.</Typography>
            </div>
          </div>
          <Search />
      </div>
    </div>
  );
}

export default SearchModal;
