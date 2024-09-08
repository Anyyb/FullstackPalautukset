const Blog = ({ blog }) => (
  <div>
  <ul>
    <li><h4>Title: {blog.title}</h4>
    <p>Author: {blog.author}</p>
    <p>Url: {blog.url}</p>
    <p>Likes: {blog.likes}</p></li>
  </ul>
  </div>  
)

export default Blog