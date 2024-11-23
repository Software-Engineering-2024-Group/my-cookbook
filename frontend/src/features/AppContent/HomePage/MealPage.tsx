import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { useTheme } from '../../Themes/themeContext';

const MealPage = () => {
    const { theme } = useTheme();
    const [mealPlan, setMealPlan] = useState<any[]>(Array(7).fill(null)); // One meal per day
  
    useEffect(() => {
      const savedMealPlan = localStorage.getItem('mealPlan');
      if (savedMealPlan) {
        setMealPlan(JSON.parse(savedMealPlan));
      }
    }, []);
  
    const printMealPlan = () => {
      window.print();
    };
  
    return (
      <div style={{ backgroundColor: theme.background, color: theme.color, padding: '20px' }}>
        <h2>My Meal Plan</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid', padding: '8px' }}>Day</th>
              <th style={{ border: '1px solid', padding: '8px' }}>Recipe</th>
              <th style={{ border: '1px solid', padding: '8px' }}>Steps</th>
            </tr>
          </thead>
          <tbody>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid', padding: '8px' }}>{day}</td>
                <td style={{ border: '1px solid', padding: '8px' }}>
                  {mealPlan[index]?.name || 'No meal planned'}
                </td>
                <td style={{ border: '1px solid', padding: '8px' }}>
                  {mealPlan[index]?.instructions?.join(', ') || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={printMealPlan} style={{ marginTop: '20px', padding: '10px 20px' }}>
          Print Meal Plan
        </button>
      </div>
    );
  };
  
  export default MealPage;
  