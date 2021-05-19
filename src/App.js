import React, {useState, useEffect} from 'react'
import {Route, Link, Switch} from 'react-router-dom'
import './App.scss';
import Display from './Display'
import Form from './Form'

function App() {

  // url local
  // const url = 'http://localhost:4000/movie/'

  // url heroku
  const url = 'https://mern-lab-movies-backend-329-ct.herokuapp.com/movie'

  const [movies, setMovies] = useState([])

  const emptyMovie = {
    name: "",
    img: "",
    description: ""
  }

  const [selectedMovie, setSelectedMovie] = useState(emptyMovie)

  // function to get list of movies
  const getMovies = () => {
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      setMovies(data)
    })
  }

  useEffect(() => getMovies(), [])

  // function to create new movie when form submitted
  const handleCreate = (newMovie) => {
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(newMovie)
    })
    .then(() => getMovies())
  }

  // function to update movie when form submitted
  const handleUpdate = (movie) => {
    fetch(url + movie._id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    })
    .then(() => getMovies())
  }

  // function to specify which movie to edit
  const editMovie = (movie) => {
    setSelectedMovie(movie)
  }

  // function to delete a movie
  const deleteMovie = (movie) => {
    fetch(url + movie._id, {
      method: 'delete'
    })
    .then(() => getMovies())
  }


  return (
    <div className="App">
      <h1>FAVORITE MOVIES SITE</h1>
      <hr/>
      <main>
        <Switch>
          <Route 
            exact
            path='/'
            render={(rp) => (
              <div>
                <Link to='/create'>
                  <button>Add Movie</button>
                </Link>
                <Display
                  {...rp}
                  movies={movies}
                  editMovie={editMovie}
                  deleteMovie={deleteMovie}
                />
              </div>
              
            )}
          />
          <Route 
            exact
            path='/create'
            render={(rp) => (
              <Form
                {...rp}
                label='create'
                movie={emptyMovie}
                handleSubmit={handleCreate}
              />
            )}
          />
          <Route 
            exact
            path='/edit'
            render={(rp) => (
              <Form
                {...rp}
                label='edit'
                movie={selectedMovie}
                handleSubmit={handleUpdate}
              />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
