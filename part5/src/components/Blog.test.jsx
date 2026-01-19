import { render, screen} from '@testing-library/react'
import Blog from './Blog'


describe( 'Render blog', () => {
  const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Lou N. Atick',
      url: 'http://www.some.place.com',
      likes: 2
  }

  test( 'title and author', () => {

    render( <Blog blog={blog} /> )

    const element = screen.getByText( `${blog.title} ${blog.author}` )

    screen.debug(element)

    expect(element).toBeDefined()
  })

  test('not url', () => { 
    render(<Blog blog={blog} />)

    const element = screen.queryByText(`${blog.url}`)
    screen.debug(element)

    expect(element).toBeNull()
  })

  test('not likes', () => { 
    render(<Blog blog={blog} />)

    const element = screen.queryByText(`${blog.likes}`)
    screen.debug(element)

    expect(element).toBeNull()
  })


})

/* test( 'render content 2', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Lou N. Atick',
    url: 'http://www.some.place.com'
  }

  const { container } = render( <Blog blog={blog} /> )

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
}) */