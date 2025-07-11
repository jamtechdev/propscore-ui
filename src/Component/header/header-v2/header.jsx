import React from "react";
import { Link, NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./header.css";

export default function Header_V2 () {
    return (
      <>
      <div className="grid-line-wrapper">
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
      </div>
        <header className="header">
          <nav className="navbar navbar-expand-xl ">
            <div className="w-100">
              <div className="d-flex align-items-center justify-content-between w-100">
                <a className="navbar-brand d-xl-none d-block" href="#">
                  <img src="/imgs/logo.png" alt="" />
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <img src="/imgs/menu-icon.svg" alt="" />
                </button>
                <div
                  className="collapse navbar-collapse w-100 justify-content-between"
                  id="navbarSupportedContent"
                >
                  <div className="d-flex d-xl-block align-items-center justify-content-between p-xl-0 p-3">
                    <Link className="navbar-brand d-xl-block d-none" to={"/"}>
                      <img src="/imgs/logo.png" alt="" />
                    </Link>
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <img src="/imgs/cross-icon.svg" alt="" />
                    </button>
                  </div>
                  <ul className="navbar-nav  mb-2 mb-lg-0 gap-5">
                    <li className="menu-title d-none">Navigation</li>
                    <li className="nav-item">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "active nav-link" : "nav-link"
                        }
                        to=""
                        // add route
                      >
                        How it Works
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "active nav-link" : "nav-link"
                        }
                        to="about"
                      >
                        About
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "active nav-link" : "nav-link"
                        }
                        to="*"
                        // add route
                      >
                        Agents &amp; Lenders
                      </NavLink>
                    </li>
                    <li className="d-block d-xl-none">
                      <div className="btn-groups">
                        <NavLink className="login" to="auth/login">
                          Login
                        </NavLink>
                        <NavLink className="white-btn" to="/">
                          Get Your Score <FontAwesomeIcon icon={faArrowRight} />
                        </NavLink>
                      </div>
                    </li>
                  </ul>
                  <div className="btn-groups d-none d-xl-flex">
                    <Link className="login" to="auth/login">
                      Login
                    </Link>
                    <NavLink className="white-btn" to="/">
                      Get Your Score <FontAwesomeIcon icon={faArrowRight} />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </>
    );
};