'use client'

import Link from "next/link";
import Image from "next/image";
import '../styles.scss'
import { useEffect } from "react";

export default function Navbar() {
  useEffect(() =>{
    const menuDiv = document.getElementById("menu-div");
    const ul = document.getElementById("ul");
    const navbar = document.getElementById("navbar");

    menuDiv.addEventListener('click', () =>{
      ul.classList.toggle("show-menu");
      navbar.classList.toggle("show-menu");
    })
  })

    return (
      <div id="navbar">
          <h1>Quiz<span className="green">Go</span></h1>

          <div id="nav-elements">
              <ul id="ul">
                  <li><Link href='/' className="link">Home</Link></li>
                  <li><Link href='/about' className="link">About</Link></li>
              </ul>

              <div id="nav-buttons">
                  <Image src='/images/abstract.svg' width={50} height={50} alt="menu" className="image" id="menu-div"/>
              </div>
        </div>
      </div>
    );
  }