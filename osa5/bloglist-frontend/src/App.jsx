import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLike, setNewLike] = useState('')
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
    console.log('logging in with', username, password)
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
      }, 5000)
    }
  }
  //uloskirjautumisen tapahtumankäsittelijä
  //tyhjennetään tila ja local storage
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }
  //uuden blogin lisäyksen tapahtumankäsittelijä
  const handleAddNewBlog =  async (event) => {
    event.preventDefault()
    console.log('New Blog added')

    const newblog = { 
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLike,
  }
  await
    blogService.create(newblog)
    setNewTitle(newTitle)
    setNewAuthor(newAuthor)
    setNewUrl(newUrl)
    setNewLike(newLike)
    setErrorMessage(` New blog added in blogs: Title: ${newTitle}.`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  //renderöidään näkymä
  return (
    <div>
        <Notification message={errorMessage}/>
        {!user && <LoginForm handleLogin={handleLogin} username={username}password={password} setUsername={setUsername}
        setPassword={setPassword}/>} 
        {user && 
          <div>
            <button onClick={handleLogout}>Log out</button>
            <p>{user.name} logged in</p> 
              {<BlogList blogs={blogs}/>}
              {<AddBlogForm handleAddNewBlog={handleAddNewBlog} newTitle={newTitle} setNewTitle={setNewTitle}setNewAuthor={setNewAuthor}
              setNewUrl={setNewUrl}setNewLike={setNewLike}/>}
            </div>
            } 
    </div>
  )
}
//refaktoroidaan komponentit 
const BlogList=(props)=>{
  return(
    <div>
      <h2>Blogs:</h2>
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}
const LoginForm=(props)=>{
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
        <button type="submit">Login</button>
      </form> 
  </div>
  )
}
const AddBlogForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleAddNewBlog}>
        <div>
        <div>
        Title: 
        <input 
        type="text"
        value={props.newTitle}
        onChange={({ target }) => props.setNewTitle(target.value)}
        />
        </div>
        <div>
        Author: 
        <input
        type="text" 
        value={props.newAuthor}
        onChange={({ target }) => props.setNewAuthor(target.value)}
        />
        </div>
        <div>
        Url: 
        <input 
        type="text"
        value={props.newUrl}
        onChange={({ target }) => props.setNewUrl(target.value)}
        />
        </div>
        <div>
        Likes: 
        <input 
        type="number"
        value={props.newLike}
        onChange={({ target }) => props.setNewLike(target.value)}
        />
        </div>
        </div>

        <div>
          <button type="submit">add</button>
        </div>

      </form>
    </div>
  )
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