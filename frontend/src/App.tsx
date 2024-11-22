import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import applicationStore from './store';
import './App.css';
import GetIngredients from './features/GetIngredients/GetIngredients';
import Header from './features/Header/Header';
import AppContent from './features/AppContent/AppContent';
import GetTags from './features/AppContent/Tag/GetTags';
import CustomizedAccordions from './features/AppContent/NutritionFilter/CustomizedAccordions';
import { ThemeProvider, useTheme } from './features/Themes/themeContext';
import Login from './features/AppContent/Auth/Login'; // Import your Login component
import Signup from './features/AppContent/Auth/Signup'; // Import your Signup component

const store = applicationStore();

// Main App component
const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Logic to check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Check for auth token in localStorage
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Layout for authenticated content
  const AppContentLayout: React.FC = () => {
    const { theme } = useTheme();

    return (
      <div className="App" style={{ backgroundColor: theme.background, color: theme.color }}>
        <div className="App-header" data-testid="header-comp-43" style={{ backgroundColor: theme.background }}>
          <Header />
        </div>
        <div className="search-helper" data-testid="search-comp-43" style={{ backgroundColor: theme.background }}>
          <GetIngredients />
        </div>
        <div className="search-helper" data-testid="header-comp-44" style={{ backgroundColor: theme.background }}>
          <GetTags />
        </div>
        <div className="search-helper" data-testid="header-comp-45" style={{ backgroundColor: theme.background }}>
          <CustomizedAccordions />
        </div>
        <div className="App-body" data-testid="body-comp-43" style={{ backgroundColor: theme.background }}>
          <AppContent />
        </div>
      </div>
    );
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            {/* Route for Login page */}
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<AppContentLayout />} />
            {/* Conditional route for Home page (after login) */}
            <Route
              path="/"
              element={isLoggedIn ? <AppContentLayout /> : <Login setIsLoggedIn={setIsLoggedIn} />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
