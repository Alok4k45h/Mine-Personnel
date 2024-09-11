import React from "react";
import "./HomeComponent.css";
function HomeComponent() {
  return (
    <div className="banner-sections-bg-container d-flex justify-content-center flex-column">
      <div className="text-center">
        <img src="./shovel.gif" alt="" className="shovel-gif" />
        <h1 className="banner-h1 mb-3">SIARMAL OPENCAST PROJECT</h1>
        <h2 className="banner-h1 mb-3">MAHALAXMI AREA</h2>
        <h3 className="banner-h1 mb-3">MCL</h3>
        <img src="./loadingImg.webp" alt="" className="loading-logo" />
      </div>
    </div>
  );
}

export default HomeComponent;
