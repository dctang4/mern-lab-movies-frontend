import React, {useState} from 'react'

const Form = (props) => {

  const {movie, history, label} = props

  const [formData, setFormData] = useState(movie)

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleSubmit(formData)
    history.push('/')
  }

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData({...formData, [name]: value})
  }

  const handleClick = () => {
    history.push('/')
  }

  return(
    <form onSubmit={handleSubmit}>
      <button
        onClick={handleClick}
      >
        Back
      </button>
      <hr/>
      <input
        type='text'
        name='name'
        placeholder='name'
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type='text'
        name='img'
        placeholder='image url'
        value={formData.img}
        onChange={handleChange}
      />
      <input
        type='text'
        name='description'
        placeholder='description'
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type='submit'
        value={label}
      />



    </form>
  )

}

export default Form