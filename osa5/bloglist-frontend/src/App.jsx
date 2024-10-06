import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlogForm from './components/BlogForm'
import PropTypes from 'prop-types'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  //haetaan blogit
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  //talletetaan kirjautuneen käyttäjän token local storageen
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  //kirjautumisen tapahtumankäsittelijä
  const handleLogin =  async (event) => {
    event.preventDefault()
    console.log('logging in with', username)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 7000)
    }
  }
  //uloskirjautumisen tapahtumankäsittelijä
  //tyhjennetään tila ja local storage
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }
  // käytetään komponentista BlogForm tapahtumankäsittelijää funktiolla createNewBlog
  // jonka se saa parametrina.
  const addNewBlog =  async ( createNewBlog ) => {
    console.log('New Blog added')
    await
    blogService.create(createNewBlog)
    setBlogs(blogs.concat(createNewBlog))
    setErrorMessage(` New blog added in blogs: Title: ${createNewBlog.title}.`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  //blogin poisto
  const deleteBlog = async(id) => {
    console.log('Blog Deleted')
    const findBlog=(blogs.find(blog => blog.id === id))
    if(window.confirm(`Delete ${findBlog.title}?`))

      await
      blogService.deleteBlog(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
    setErrorMessage(` Blog deleted: ${findBlog.title}.`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  //blogin tykkäys
  //haen blogin id:n ja välitän id:n sekä päivitetyn tykkäyksen backendille
  // järjestän blogit pienestä suurempaan
  const likeBlog = async(id) => {
    console.log('Blog like updated')
    const findBlog=(blogs.find(blog => blog.id === id))

    const updated = {
      author: findBlog.author,
      title: findBlog.title,
      url: findBlog.url,
      likes: findBlog.likes + 1
    }
    await
    blogService.update(id, updated)
    const updatedBlogs = blogs.map(blog => blog.id === id ? updated : blog)
    updatedBlogs.sort((compare, blog) => compare.likes - blog.likes)
    setBlogs(updatedBlogs)
  }

  //renderöidään näkymä
  return (
    <div>
      <Notification message={errorMessage}/>
      {!user && <LoginForm handleLogin={handleLogin} username={username}password={password} setUsername={setUsername}
        setPassword={setPassword}/>}
      {user &&
          <div>
            <button className="button" onClick={handleLogout}>Log out</button>
            <h4>{user.name} logged in</h4>
            {<BlogList blogs={blogs}  whenLiked={likeBlog} whenDeleted={deleteBlog}/>}
            {<AddBlogForm createNewBlog={addNewBlog}/>}
          </div>
      }
    </div>
  )
}
//annetaan bloglistille propseiksi blogien renderöitävä näkymä ja whenLiked, whenDeleted funktiot
const BlogList = ({ blogs, whenLiked, whenDeleted }) => {
  return (
    <div className="blog">
      <h2>Blogs:</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} whenLiked={ whenLiked} whenDeleted={whenDeleted} />
      ))}
    </div>
  )
}
const LoginForm=(props) => {
  return(
    <div>
      <h2>Login</h2>
      <form onSubmit={props.handleLogin}>
        <div>
          username: <input
            type="text"
            value={props.username}
            name="Username"
            onChange={({ target }) => props.setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            value={props.password}
            name="Password"
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </div>
        <button className="button" type="submit">Login</button>
      </form>
    </div>
  )
}
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}
export default App