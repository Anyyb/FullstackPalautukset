import { useState} from 'react'
// Blog form yhdistetty tapahtumankäsittelijään. 
//Se sai parametrikseen uuden funktion createNewBlog, jota se kutsuu kun uusi blogi luodaan.
const AddBlogForm = ({ createNewBlog }) => {  
    const [newAuthor, setNewAuthor] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [newLike, setNewLike] = useState('')
    const [addBlogVisible, setaddBlogVisible] = useState(false)
    const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: addBlogVisible ? '' : 'none' }


    //uuden blogin lisäyksen tapahtumankäsittelijä
    const handleAddNewBlog =  async (event) => {
      event.preventDefault()
  
      const newBlog = { 
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        likes: newLike,
    }
  
      await
      // täytyy asettaa uusi blogi createNewBlog funktioon
      createNewBlog(newBlog)
      // asetetaan kentät tyhjiksi
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setNewLike(0)
    }
  
    return (
      <div>
        <div style={hideWhenVisible}>
            <button onClick={() => setaddBlogVisible(true)}>Add new blog</button>
          </div>
          <div style={showWhenVisible}>
        <form onSubmit={handleAddNewBlog}>
          <div>
          <div>
          Title: 
          <input
          name="title" 
          type="text"
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
          />
          </div>
          <div>
          Author: 
          <input
          name="author" 
          type="text" 
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
          />
          </div>
          <div>
          Url: 
          <input
          name="url" 
          type="text"
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
          />
          </div>
          <div>
          Likes: 
          <input
          name="likes"  
          type="number"
          value={newLike}
          onChange={({ target }) => setNewLike(target.value)}
          />
          </div>
          </div>
  
          <div>
            <button type="submit">add</button>
          </div>
          
        </form>
        <button onClick={() => setaddBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
  export default AddBlogForm