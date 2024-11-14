/*

Copyright (C) 2022 SE CookBook - All Rights Reserved
You may use, distribute and modify this code under the
terms of the MIT license.
You should have received a copy of the MIT license with
this file. If not, please write to: help.cookbook@gmail.com

*/

/**
 * File name: App.tsx
 * Task - This is the parent component of the application. It creates the basic UI skeleton
 * viz the header, the search component and the app contents
 * Header and Search component remain static and app contents change according to the state of the application
 * @author Priyanka Ambawane - dearpriyankasa@gmail.com
 */
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import applicationStore from './store'
import './App.css'
import GetIngredients from './features/GetIngredients/GetIngredients'
import Header from './features/Header/Header'
import AppContent from './features/AppContent/AppContent'
import GetTags from './features/AppContent/Tag/GetTags'
import CustomizedAccordions from "./features/AppContent/NutritionFilter/CustomizedAccordions";
const store = applicationStore()

const App: React.FunctionComponent<any> = () => {
  // Main component that wraps the application with necessary providers and routes
  return (
    // Provider ensures that the state of the app, i.e. stored in the app-store is accessible across the application
    <Provider store={store}>
      {/* Browser router enables routing and navigation across multiple pages in the application */}
      <BrowserRouter>
        <div className="App">
          <div className="App-header" data-testid="header-comp-43">
            <Header />
          </div>
          <div className="search-helper" data-testid="search-comp-43">
            <GetIngredients />
          </div>
          <div className="search-helper" data-testid="header-comp-44">
            <GetTags />
          </div>
          <div className="search-helper" data-testid="header-comp-45" >
            <CustomizedAccordions />
          </div>
          <div className="App-body" data-testid="body-comp-43">
            <AppContent />
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
