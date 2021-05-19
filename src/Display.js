import React from 'react'

const Display = (props) => {

  const {movies, history, editMovie, deleteMovie} = props

  const loaded = () => (
    <div className='container' style={{textAlign: 'center'}}>
      {movies.map((movie) => (
        <article key={movie._id}>
          <img src={movie.img} alt="movie"/>
          <h2>{movie.name}</h2>
          <h4>{movie.description}</h4>
          <button
            onClick={() => {
              editMovie(movie)
              history.push('/edit')
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteMovie(movie)
            }}
          >
            Delete
          </button>
        </article>
      ))}
    </div>
  )

  const loading = () => <h1>Loading...</h1>

  return movies.length > 0 ? loaded() : loading()
}

export default Display