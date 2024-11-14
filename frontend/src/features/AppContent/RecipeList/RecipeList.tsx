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
  CardMedia,
  CardActionArea,
  Pagination,
  CircularProgress,
} from '@mui/material'
import { getRecipeInfoInitiator } from '../RecipeInformation/getRecipeInformation.action'
import { getRecipeListInitiator } from './getRecipeList.action'
import './RecipeList.css'

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
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

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
  }, [getRecipeListState.getRecipeListData])

  useEffect(() => {
    setLoading(getRecipeListState.isGetRecipeListLoading)
  }, [getRecipeListState])

  const gotoRecipe = (id: string) => {
    console.log('hello' + id)
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
  }

  return (
    <>
      <Pagination
        page={page}
        count={Math.ceil(totalCount / 10)}
        sx={{ m: 2 }}
        onChange={handlePageChange}
        color="secondary"
        variant="outlined"
        shape="rounded"
      />
      {!loading ? (
        totalCount > 0 ? (
          recipeList.map((data: any) => {
            return (
              <Card variant="outlined" sx={{ width: 4 / 5, m: 1 }}>
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
        ) : ( // No recipes found
          <Typography variant="h5" component="div" sx={{m:4}} className='no-recipe-found'>Currently our database does not have any recipes with the selected ingredients. Check back in later for any updates.</Typography>
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
