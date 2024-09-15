import React from "react";
import {
  FaCopyright,
  FaFacebook,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import "./HomeComponent.css";
function HomeComponent() {
  return (
    <div className="banner-sections-bg-container d-flex justify-content-center flex-column">
      <div className="text-center">
        <img
          src="https://res.cloudinary.com/alokkumar07/image/upload/v1726239845/socp_employees/shovel_da3snu.gif"
          alt=""
          className="shovel-gif"
        />
        <h1 className="banner-h1 mb-3">SIARMAL OPENCAST PROJECT</h1>
        <h2 className="banner-h1 mb-3">MAHALAXMI AREA</h2>
        <h3 className="banner-h1 mb-3">MCL</h3>
        <img
          src="https://res.cloudinary.com/alokkumar07/image/upload/v1726239811/socp_employees/loadingImg_fjmbyf.webp"
          alt=""
          className="loading-logo"
        />
        <hr className="hr-footer" />
        <FaCopyright className="icon mr-2" />
        <span className="section-copyright">
          SIARMAL OCP MCL- 2024 | Designed & Developed by Alok Kumar | MT @ MCL
          CIL
        </span>
        <br />
        <span className="section-copyright text-warning">CONNECT ME ON</span>
        <div className="d-flex flex-row justify-content-center mt-3 mb-3">
          <a
            href="https://www.facebook.com/kr.alok07/"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebook className="logo facebook" />
          </a>

          <a
            href="https://www.linkedin.com/in/07alokkumar"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn className="logo linkedin" />
          </a>

          <a
            href="https://github.com/Alok4k45h"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub className="logo github" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
