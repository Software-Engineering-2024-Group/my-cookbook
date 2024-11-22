import React from 'react';
import './HomePage.css';
import { useTheme } from '../../Themes/themeContext'

const MealPage = () => {
  const { theme } = useTheme();
  return (
    <div style={{ backgroundColor: theme.background, color: theme.color }}>
     
        <h2 >My Meal Plan</h2>
        
    </div>
  );
};

export default MealPage;
