/*

Copyright (C) 2022 SE CookBook - All Rights Reserved
You may use, distribute and modify this code under the
terms of the MIT license.
You should have received a copy of the MIT license with
this file. If not, please write to: help.cookbook@gmail.com

*/

import React from 'react'

import './Navbar.css'

/**
 * File name: Navbar.tsx
 * Task - Home, About, Contact options available for the user on the Navigation Bar.
 * @author Asrita Kuchibhotla
 */

function Navbar() {
  return (
    <section className="navbar">
      <a href="/" className="navbar-item">
        Home
      </a>
      <a href="/about" className="navbar-item">
        About
      </a>
      <a href="/contact" className="navbar-item">
        Contact
      </a>
    </section>
  )
}

export default Navbar
