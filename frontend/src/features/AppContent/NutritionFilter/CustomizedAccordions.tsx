import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {Slider} from "@material-ui/core";
import { Stack } from '@mui/material';
import { VolumeDown, VolumeUp } from '@mui/icons-material';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {getRecipeListInitiator} from "../RecipeList/getRecipeList.action";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

// let cal =0;

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));




export default function CustomizedAccordions() {
  const dispatch = useDispatch()
  const navigateTo = useNavigate()
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  // const changeSlider = (event) =>{
  //     this.setSlider({
  //
  //     })
  // };
    const defaultValue = 50
    const [cal, setCal] = React.useState<number>(defaultValue);
    const [fat, setFat] = React.useState<number>(defaultValue);
    const [sug, setSug] = React.useState<number>(defaultValue);
    const [pro, setPro] = React.useState<number>(defaultValue);

    const onSearch = () => {
        console.log(cal)
        console.log(fat)
        console.log(sug)
        console.log(pro)
        dispatch(
          getRecipeListInitiator('http://localhost:8000/recipe/search2/', {
              page: 1,
              caloriesUp: cal,
              fatUp: fat,
              sugUp: sug,
              proUp: pro
          })
        )
        navigateTo('/recipe-list')
    }

  // @ts-ignore
  return (

    <div><br></br>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Nutrition Filter</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {/*<Typography id="non-linear-slider" gutterBottom>*/}
            {/*    Storage: zz*/}
            {/*</Typography>*/}
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center" >
              <Typography id="non-linear-slider" gutterBottom>
                Calories:
              </Typography>
                <Slider
                    // value={value}
                  aria-label="Calories"
                  valueLabelDisplay="auto"
                  defaultValue={defaultValue}
                  onChange={(e,v) => setCal(v as number)}
                  max={4000}
              />
                <Typography id="non-linear-slider" gutterBottom>
                Fat:
              </Typography>
            <Slider
                  aria-label="Fat"
                  valueLabelDisplay="auto"
                  defaultValue={defaultValue}
                  max={140}
                  onChange={(e,v) => setFat(v as number)}
            />
                <Typography id="non-linear-slider" gutterBottom>
                Sugar:
              </Typography>
                <Slider
                  aria-label="Sugar"
                  valueLabelDisplay="auto"
                  defaultValue={defaultValue}
                  max={150}
                  onChange={(e,v) => setSug(v as number)}
            />
                <Typography id="non-linear-slider" gutterBottom>
                Protein:
              </Typography>
                <Slider
                  aria-label="Protain"
                  valueLabelDisplay="auto"
                  defaultValue={defaultValue}
                  max={250}
                  onChange={(e,v) => setPro(v as number)}
            />
            </Stack>
            <Typography id="non-linear-slider" gutterBottom>
                Calorie: {cal} - Fat: {fat} - Sugar: {sug} - Protein: {pro}
            </Typography>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center" justifyContent="center">
              <Button size = "medium" variant="contained" onClick={onSearch}>Search</Button>
            </Stack>

        </AccordionDetails>
      </Accordion>
    </div>
  );
}
