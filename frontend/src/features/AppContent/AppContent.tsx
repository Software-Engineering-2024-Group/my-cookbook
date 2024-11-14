/*

Copyright (C) 2022 SE CookBook - All Rights Reserved
You may use, distribute and modify this code under the
terms of the MIT license.
You should have received a copy of the MIT license with
this file. If not, please write to: help.cookbook@gmail.com

*/

/**
 * File name: AppContent.tsx
 * Task - The component defines the routes for the application and decides which component on render on that
 * particular route
 * @author Priyanka Ambawane - dearpriyankasa@gmail.com
 */
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import About from './HomePage/AboutPage'
import Contact from './HomePage/ContactPage'
import RecipeInformation from './RecipeInformation/RecipeInformation'
import RecipeList from './RecipeList/RecipeList'

const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipe-list" element={<RecipeList />} />
      <Route path="/recipe-details/:id" element={<RecipeInformation />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}

export default AppContent
