const Blog = ({ blog }) => (
  <div>
  <ul>
    <li><h4>Title: {blog.title}</h4>
    <p>Author: {blog.author}</p></li>
  </ul>
  </div>  
)

export default Blog