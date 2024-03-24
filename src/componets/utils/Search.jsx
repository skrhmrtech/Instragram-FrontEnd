import { Box, Grid, Input } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SearchPost, SearchUser } from '../../features/post/PostCRUD';
import SearchPosts from './Search/SearchPost';
import SearchUsers from './Search/SearchUser';

function Search() {
  const dispatch = useDispatch();

  const postData = useSelector(state => state.postCRUD.searchPost) || [];
  const userData = useSelector(state => state.postCRUD.searchUser) || [];

  const searchHandler = async (value) => {
    dispatch(SearchPost(value));
    dispatch(SearchUser(value));
  }

  let counter = 0;
  useEffect(() => {
    if ((counter === 0)) {
      dispatch(SearchPost("T"));
      dispatch(SearchUser("T"));
    }
    counter++;
  }, [counter, dispatch]);

  return (
    <Box>
      <Grid container display={"flex"} justifyContent={"center"} spacing={2} padding={2}>
        <Grid item xs={10}>
          <Box border={"solid"} paddingX={2} paddingY={1} borderRadius={50} borderColor={"cadetblue"}>
            <Input
              type="text"
              name="search"
              placeholder="Search ..."
              fullWidth={true}
              onKeyUp={(e) => { searchHandler(e.target.value) }}
              onKeyDown={(e) => { searchHandler(e.target.value) }}
              onKeyUpCapture={(e) => { searchHandler(e.target.value) }}
              onKeyDownCapture={(e) => { searchHandler(e.target.value) }}
            />
          </Box>
        </Grid>
        <Grid item md={8} sm={10} xs={12}>
          <Box>
            <Grid container spacing={3}>
              {
                postData.map((post, index) => {
                  return (
                    <Grid item xs={6} display={"flex"} justifyContent={"center"} key={index}>
                      <SearchPosts Post={post} />
                    </Grid>
                  )
                })
              }
              {
                postData.length === 0 && <Box margin={4} width={"100%"}><h4><Box textAlign={"center"} border={"dashed"} width={"100%"}>No Post Founded</Box></h4></Box>
              }
            </Grid>
          </Box>
        </Grid>
        <Grid item md={4} sm={8} xs={12}>
          <Box>
            <Grid container spacing={3}>
              {
                userData.map((user, index) => {
                  return (
                    <Grid item xs={12} display={"flex"} justifyContent={"center"} key={index}>
                      <SearchUsers User={user} />
                    </Grid>
                  )
                })
              }
              {
                userData.length === 0 && <Box margin={4} width={"100%"}><h4><Box textAlign={"center"} border={"dashed"} width={"100%"}>No User Founded</Box></h4></Box>
              }
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Search
