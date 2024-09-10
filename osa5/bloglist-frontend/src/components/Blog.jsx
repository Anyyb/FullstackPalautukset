import { useState} from 'react'

// Blog komponentti ja miten tiedot näytetään.
// Tyylit asetettu index.css, vaikka olisin voinut asettaa tähän. 
// Halusin muokata vain yhdestä tiedostosta.
// muokkasin myös buttonien näköä.

const Blog = ({ blog }) => {
    //const blogStyle = {
    //paddingTop: 10,
    //paddingLeft: 2,
    //border: 'solid',
    //borderWidth: 1,
    // marginBottom: 5
    //}
  const [blogsVisible, setBlogsVisible] = useState(false)

  const hideWhenVisible = { display: blogsVisible ? 'none' : '' }
  const showWhenVisible = { display: blogsVisible ? '' : 'none' }

  return(
  //<div style={blogStyle}>
  <div className="blog">  
  <ul>
    
    <li><h4>Title: {blog.title}</h4>
    <div style={hideWhenVisible}>
      <button className="button" onClick={() => setBlogsVisible(true)}>Show more</button>
    </div>
    <div style={showWhenVisible}>
    <p>Author: {blog.author}</p>
    <p>Url: {blog.url}</p>
    <p>Likes: {blog.likes}</p><button className="button" type="submit">Like</button>
    <p>Username: {blog.username}</p>
    </div>
    </li>
    <div>
    <div style={showWhenVisible}>
    <button className="button" onClick={() => setBlogsVisible(false)}>Show less</button>
    </div>
    </div>
    </ul>
    
  </div>
)
}
export default Blog