import { useState } from 'react'
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
    <div className="blogform">
      <div style={hideWhenVisible}>
        <button className="button" onClick={() => setaddBlogVisible(true)}>Add new blog</button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={handleAddNewBlog}>
          <div>
            <div>
          Title:
              <input
                data-testid='title'
                name="title"
                type="text"
                value={newTitle}
                id='title-input'
                onChange={({ target }) => setNewTitle(target.value)}
              />
            </div>
            <div>
          Author:
              <input
                data-testid='author'
                name="author"
                type="text"
                value={newAuthor}
                onChange={({ target }) => setNewAuthor(target.value)}
              />
            </div>
            <div>
          Url:
              <input
                data-testid='url'
                name="url"
                type="text"
                value={newUrl}
                onChange={({ target }) => setNewUrl(target.value)}
              />
            </div>
            <div>
          Likes:
              <input
                data-testid='likes'
                name="likes"
                type="number"
                value={newLike}
                onChange={({ target }) => setNewLike(target.value)}
              />
            </div>
          </div>

          <div>
            <button className="button" type="submit">add</button>
          </div>

        </form>
        <button className="button" onClick={() => setaddBlogVisible(false)}>cancel</button>
      </div>
    </div>
  )
}
export default AddBlogForm