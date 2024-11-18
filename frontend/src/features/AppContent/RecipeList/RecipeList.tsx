/*

Copyright (C) 2022 SE CookBook - All Rights Reserved
You may use, distribute and modify this code under the
terms of the MIT license.
You should have received a copy of the MIT license with
this file. If not, please write to: help.cookbook@gmail.com

*/

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star'
import {
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardActionArea,
  Pagination,
  CircularProgress,
  SelectChangeEvent,
  Box,
  FormHelperText,
} from '@mui/material'
import { getRecipeInfoInitiator } from '../RecipeInformation/getRecipeInformation.action'
import { getRecipeListInitiator } from './getRecipeList.action'
import './RecipeList.css'
import { RECIPE_CATEGORIES } from './recipeCategories'

/**
 * File name: RecipeList.tsx
 * Task - This component displays a list of recipes based on the ingredients inputed.
 * This component is a dynamic component and is seen only when you click on a recipe from the recipe list.
 */

interface RecipeListData {
  id: string
  name: string
  description: string
  cookTime: string
  prepTime: string
  category: string
  rating: string
}

const RecipeList = () => {
  const dispatch = useDispatch()
  const navigateTo = useNavigate()

  const [recipeList, setRecipeList] = useState<readonly RecipeListData[]>([])
  const [filtedRecipeList, setFilteredRecipeList] = useState<
    readonly RecipeListData[]
  >([])
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const getRecipeListState = useSelector(
    (state: any) => state.getRecipeListAppState
  )

  useEffect(() => {
    let recipes = getRecipeListState.getRecipeListData['recipes']
    if (Array.isArray(recipes)) {
      recipes.forEach((item: any, index: number) => {
        setRecipeList((list) =>
          list.concat({
            id: item._id,
            name: item.name,
            description: item.description,
            cookTime: item.cookTime,
            prepTime: item.prepTime,
            category: item.category,
            rating: item.rating,
          })
        )
      })
      setTotalCount(getRecipeListState.getRecipeListData['count'])
      setPage(getRecipeListState.getRecipeListData['page'])
    }
    return () => {
      setRecipeList([])
      setTotalCount(0)
      setPage(1)
    }
  }, [getRecipeListState.getRecipeListData, selectedCategory])

  useEffect(() => {
    setLoading(getRecipeListState.isGetRecipeListLoading)
  }, [getRecipeListState])

  useEffect(() => {
    // Filter recipes based on selected category
    if (selectedCategory) {
      const filtered = recipeList.filter(
        (recipe) => recipe.category === selectedCategory
      )
      setFilteredRecipeList(filtered)
    } else {
      setFilteredRecipeList(recipeList)
    }
  }, [selectedCategory, recipeList])

  const gotoRecipe = (id: string) => {
    dispatch(getRecipeInfoInitiator('http://localhost:8000/recipe/' + id))
    navigateTo('/recipe-details/' + id)
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const ingredientsArray = JSON.parse(
      sessionStorage.getItem('ingredients') || '[]'
    )
    dispatch(
      getRecipeListInitiator('http://localhost:8000/recipe/search/', {
        ingredients: ingredientsArray,
        page: value,
      })
    )
    setSelectedCategory('')
  }

  // Handle category change
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value)
  }

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          alignItems: 'center',
          gap: 2,
          mb: 2,
          m: 2,
        }}
      >
        <Box />
        <Pagination
          page={page}
          count={Math.ceil(totalCount / 10)}
          onChange={handlePageChange}
          color="secondary"
          variant="outlined"
          shape="rounded"
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
          }}
        />
        {totalCount > 0 && (
          <FormControl
            sx={{ display: 'flex', justifyContent: 'flex-end', height: '100%' }}
            size="small"
          >
            <InputLabel
              sx={{
                color: 'white',
                fontSize: '18px',
                '&.Mui-focused': {
                  color: 'white',
                },
              }}
            >
              Category
            </InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Category"
              sx={{
                maxWidth: '280px',
                color: 'white',
                fontSize: '15px', // Set font size for the selected option
                marginTop: '3px',
                height: '40px', // Set same height as Pagination
                width: '100%', // Full width inside FormControl
                '.MuiSelect-icon': {
                  color: 'white', // Dropdown arrow color
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', // Border color on hover
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', // Border color on focus
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 200,
                    overflowY: 'auto',
                    marginTop: '8px',
                  },
                },
              }}
            >
              <MenuItem value="">All Categories</MenuItem>
              {RECIPE_CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            {selectedCategory && filtedRecipeList.length === 0 && (
              <FormHelperText sx={{ color: '#f44336', marginTop: '8px' }}>
                No recipes found in this category.
              </FormHelperText>
            )}
          </FormControl>
        )}
      </Box>
      {!loading ? (
        totalCount > 0 ? (
          (selectedCategory && filtedRecipeList.length > 0
            ? filtedRecipeList
            : recipeList
          ).map((data: any, index: number) => {
            return (
              <Card variant="outlined" sx={{ width: 4 / 5, m: 1 }} key={index}>
                <CardActionArea onClick={() => gotoRecipe(data.id)}>
                  <CardContent>
                    <div className="d-flex flex-row">
                      <Typography
                        sx={{ fontWeight: 600 }}
                        gutterBottom
                        variant="h5"
                        component="div"
                      >
                        {data.name} |{' '}
                        <StarIcon sx={{ color: '#dede04' }} fontSize="medium" />{' '}
                        {data.rating}/5.0
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="span"
                        className="supplemental-info"
                      >
                        {data.category}
                      </Typography>
                    </div>
                    <Typography
                      sx={{ textAlign: 'left' }}
                      variant="subtitle2"
                      color="text.secondary"
                    >
                      Prep Time : {data.prepTime} | Cook Time : {data.cookTime}
                    </Typography>

                    <Typography
                      sx={{
                        textAlign: 'left',
                        marginTop: 2,
                        fontStyle: 'italic',
                      }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {data.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            )
          })
        ) : (
          // No recipes found
          <Typography
            variant="h5"
            component="div"
            sx={{ m: 4 }}
            className="no-recipe-found"
          >
            Currently our database does not have any recipes with the selected
            ingredients. Check back in later for any updates.
          </Typography>
        )
      ) : (
        <CircularProgress style={{ color: 'white', margin: '50px' }} />
      )}
      <Pagination
        page={page}
        count={Math.ceil(totalCount / 10)}
        sx={{ m: 2 }}
        onChange={handlePageChange}
        color="secondary"
        variant="outlined"
        shape="rounded"
      />
    </>
  )
}

export default RecipeList
