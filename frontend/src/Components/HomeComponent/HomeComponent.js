import React from "react";
import "./HomeComponent.css";
function HomeComponent() {
  return (
    <div className="banner-sections-bg-container d-flex justify-content-center flex-column">
      <div className="text-center">
        <img
          src="https://media.licdn.com/dms/image/D4D12AQF1rxN5UtHYKA/article-cover_image-shrink_600_2000/0/1685713292847?e=2147483647&v=beta&t=yCIt33N1tCtQjFwBgt8boEEQCwZjSvgcCmVaN0OZjRE"
          alt=""
          className=""
        />
        <h1 className="banner-h1 mb-3">SIARMAL OPENCAST PROJECT</h1>
        <h2 className="banner-h1 mb-3">MAHALAXMI AREA</h2>
        <h3 className="banner-h1 mb-3">MCL</h3>
        <img
          src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif"
          alt=""
          className="loading-logo"
        />
      </div>
    </div>
  );
}

export default HomeComponent;
