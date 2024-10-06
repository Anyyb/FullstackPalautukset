import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import AddBlogForm from './BlogForm'

test('renders the whole blog content', () => {
  const blog = {
    author: 'Civ pelaaja',
    title: 'Vain yksi vuoro enää',
    url:'gamerinsivut',
    likes:'999'
  }

  const { container } = render(<Blog blog={blog} />)
  screen.debug()
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Vain yksi vuoro enää')
  expect(div).toHaveTextContent('Civ pelaaja')
  expect(div).toHaveTextContent('gamerinsivut')
  expect(div).toHaveTextContent('999')

})
test('renders only title', () => {
  const blog = {
    author: 'Civ pelaaja',
    title: 'Vain yksi vuoro enää',
    url:'gamerinsivut',
    likes:'999'
  }

  render(<Blog blog={blog}/>)

  const element = screen.queryByText('Civ pelaaja')
  const element2 = screen.queryByText('gamerinsivut')
  const element3 = screen.queryByText('999')
  expect(element,element2,element3).toBeNull()

  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Vain yksi vuoro enää')
})

test('renders rest of the blog information, when button is pressed', async () => {
  const blog = {
    author: 'Civ pelaaja',
    title: 'Vain yksi vuoro enää',
    url:'gamerinsivut',
    likes:'999'
  }
  const mockHandler = vi.fn()
  render(<Blog blog={blog} setBlogsVisible={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('Show more')
  await user.click(button)
  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blog')
  expect(div).toHaveStyle('display: block')
  expect(div).toHaveTextContent('Civ pelaaja')
  expect(div).toHaveTextContent('gamerinsivut')
  expect(div).toHaveTextContent('999')
})

test('like button is pressed twice', async () => {
  const blog = {
    author: 'Civ pelaaja',
    title: 'Vain yksi vuoro enää',
    url:'gamerinsivut',
    likes:'999'
  }
  const mockHandler = vi.fn()
  render(<Blog blog={blog} whenLiked={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('Like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
test('blogform adds a new blog ', async () => {

  const user = userEvent.setup()
  const createNewBlog = vi.fn()

  const { container } = render(<AddBlogForm createNewBlog={createNewBlog} />)
  const input = container.querySelector('#title-input')

  const button = screen.getByText('Add new blog')
  await user.click(button)

  const sendButton = screen.getByText('add')
  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createNewBlog.mock.calls).toHaveLength(1)
  expect(createNewBlog.mock.calls[0][0].title).toBe('testing a form...')
})
