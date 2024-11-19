/*

Copyright (C) 2022 SE CookBook - All Rights Reserved
You may use, distribute and modify this code under the
terms of the MIT license.
You should have received a copy of the MIT license with
this file. If not, please write to: help.cookbook@gmail.com

*/

import React from 'react'
import {
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import './HomePage.css'

const FAQPage = () => {
  return (
    <div className="faq">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <Paper
        elevation={5}
        sx={{
          marginRight: '5%',
          marginLeft: '5%',
          color: 'white',
          bgcolor: '#1c3c5b',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: 'auto',
          padding: '2rem',
        }}
      >
        {/* FAQ entries */}
        <div className="faq-entry">
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontFamily: 'RobotoThin', fontWeight: 600, fontSize: '20px' }}
          >
            1. What is CookBook?
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            paragraph
            sx={{ fontFamily: 'RobotoThin', fontSize: '20px' }}
          >
            CookBook is a platform designed to suggest recipes based on the
            ingredients you already have at home. It not only provides recipe
            suggestions but also gives detailed instructions, ratings,
            nutritional information, and more. It aims to help users cook
            efficiently with the ingredients available to them.
          </Typography>
        </div>

        <div className="faq-entry">
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontFamily: 'RobotoThin', fontWeight: 600, fontSize: '20px' }}
          >
            2. How do I use CookBook?
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            paragraph
            sx={{ fontFamily: 'RobotoThin', fontSize: '20px' }}
          >
            Using CookBook is easy. Simply enter the ingredients you have in the
            search bar, and CookBook will suggest a list of recipes that can be
            made with those ingredients. You can then follow the step-by-step
            instructions to make the recipe at home.
          </Typography>
        </div>

        <div className="faq-entry">
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontFamily: 'RobotoThin', fontWeight: 600, fontSize: '20px' }}
          >
            3. How can I share a recipe?
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            paragraph
            sx={{ fontFamily: 'RobotoThin', fontSize: '20px' }}
          >
            Once you’ve selected a recipe, you can share it with others via
            WhatsApp, Discord, or Slack. Simply click on the respective button
            to share the recipe URL.
          </Typography>
        </div>

        <div className="faq-entry">
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontFamily: 'RobotoThin', fontWeight: 600, fontSize: '20px' }}
          >
            4. What types of recipes can I find on CookBook?
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            paragraph
            sx={{ fontFamily: 'RobotoThin', fontSize: '20px' }}
          >
            CookBook offers a wide variety of recipes from multiple cuisines and
            cultures. Whether you're in the mood for Italian pasta, Indian
            curry, or a quick snack, CookBook has got you covered.
          </Typography>
        </div>

        {/* Collapsible FAQ entries */}
        <Accordion
          sx={{ backgroundColor: '#1c3c5b', color: 'white', width: '100%' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
            id="faq1"
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'RobotoThin',
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              5. Can I add my own recipes to CookBook?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ fontFamily: 'RobotoThin', fontSize: '20px' }}
            >
              Currently, users cannot upload their own recipes to the platform.
              However, you can suggest a recipe, and our team will review it for
              future updates.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{ backgroundColor: '#1c3c5b', color: 'white', width: '100%' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
            id="faq2"
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'RobotoThin',
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              6. Is CookBook available on mobile devices?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ fontFamily: 'RobotoThin', fontSize: '20px' }}
            >
              Yes, CookBook is fully responsive and can be used on any mobile
              device or tablet. Simply visit our website from your mobile
              browser, and you can enjoy all the features on-the-go.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </div>
  )
}

export default FAQPage
