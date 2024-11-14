/*

Copyright (C) 2022 SE CookBook - All Rights Reserved
You may use, distribute and modify this code under the
terms of the MIT license.
You should have received a copy of the MIT license with
this file. If not, please write to: help.cookbook@gmail.com

*/

import React from 'react';
import logo from './photos/logo.png';
import './HomePage.css';

const ContactPage = () => {
  return (
    <div className="contact"> 
        <h2>Contact us :</h2>
        <img src={logo} width="700" alt="logo"/>
        <p>In case of any queries and for additional help, please email us at: <a className='email' href="mailto:help.cookbook@gmail.com">help.cookbook@gmail.com</a></p>
    </div>
  );
};

export default ContactPage;
