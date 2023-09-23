import React from "react";
import { BtnLoc } from "./BtnLoc";
import { IcGesture } from "./IcGesture";
import { NavbarX } from "./NavbarX";
import { SearchField } from "./SearchField";
import "./style.css";
import "../Acceuil.jsx";

export const Home = () => {
  return (
    <div className="home">
      <div className="overlap-wrapper">
        <div className="overlap-2">
          <img className="image" alt="Image" src="map.png" />
          <BtnLoc className="btn-loc-instance" icLocShape="shape-7.svg" />
          <img className="block-bg" alt="Block bg" src="block-bg.svg" />
          <IcGesture className="ic-gesture-instance" line="line-2.svg" />
          <SearchField
            className="search-field-instance"
            icSearchShape="shape-3.svg"
            overlapGroupClassName="design-component-instance-node"
          />
          <NavbarX
            battery="image.png"
            cellularConnection="cellular-connection-2.svg"
            className="navbar-x-instance"
            hasNavText={false}
            icMenuShape="shape-8.svg"
            icMenuShapeClassName="navbar-x-3"
            overlapClassName="navbar-x-2"
            wifi="wifi-2.svg"
          />
          <IcGesture className="ic-gesture-2" line="line-3.svg" />
          <img className="group" alt="Group" src="group.png" />
          <div className="text-wrapper-2">Rechercher dans GreenMeet</div>
        </div>
      </div>
    </div>
  );
};
