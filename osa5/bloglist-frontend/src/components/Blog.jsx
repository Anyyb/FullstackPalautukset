import { useState } from 'react'
const Blog = ({ blog, whenDeleted, whenLiked }) => {
  const [blogsVisible, setBlogsVisible] = useState(false)

  const hideWhenVisible = { display: blogsVisible ? 'none' : '' }
  const showWhenVisible = { display: blogsVisible ? '' : 'none' }


  return(
    <div className="blog">
      <ul>

        <li><h4>Title: {blog.title}</h4>
          <button className="button" onClick={() => whenDeleted(blog.id)}>Delete</button>
          <div style={hideWhenVisible} className="togglableContent">
            <button className="button" onClick={() => setBlogsVisible(true)}>Show more</button>
          </div>
          <div style={showWhenVisible}>
            <p>Author: {blog.author}</p>
            <p>Url: {blog.url}</p>
            <p>Likes: {blog.likes}</p>
            <button className="button" onClick={() => whenLiked(blog.id)}>Like</button>
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