import { test, expect, beforeEach, describe } from '@playwright/test'
import { logginWith, createBlog, createBolgsList } from './helper'

describe('Blog app', () => {
  const userData = {
    name: 'Lou N. Atick',
    username: 'louNatick',
    password: '123456'
  }

  const newBlog = {
    title: ' Becoming a Hacker: Must Read Security & Cyber Crime Books',
    author: 'Matt Fay',
    url: 'https://javascripttoday.com/blog/becoming-a-hacker-book-list'
  }

  const blogList = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 3,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 6
    },
    {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 5
    },
    {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 1,
    },
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 4
    }
  ]

  beforeEach( async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: userData
    })

    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {
    const locator = await page.getByText('Blogs')

    await expect(locator).toBeVisible()
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByRole('textbox').first()).toBeVisible()
    await expect(page.getByRole('textbox').last()).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'cancel' })).toBeVisible()
  })

  test('login succeeds with correct credentials', async ({ page }) => {
    await logginWith(
      page,
      userData.username,
      userData.password
    )

    await expect( page.getByText('Lou N. Atick logged in ') ).toBeVisible()
  })

  test('login fails with wrong credentials', async ({ page }) => {
    await logginWith(page, 'louNati', '12345')

    await expect( page.getByText('Request failed with status code 401 ') ).toBeVisible()
  })

  describe('When logged in', () => {

    beforeEach( async ({ page }) => {
      await page.goto('/')
      await logginWith(
        page,
        userData.username,
        userData.password
      )
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, newBlog)
      await expect( page.getByText(`a new ${newBlog.title} by ${newBlog.author} added`) ).toBeVisible()
      await expect( page.getByText(`${newBlog.title} ${newBlog.author}`) ).toBeVisible()
    })

  })

  describe( 'A blog can be', () => {

    test('edited', async ({ page }) => {

      await logginWith(
        page,
        userData.username,
        userData.password
      )

      await createBlog(page, newBlog)

      const message = page.getByText(`a new ${newBlog.title} by ${newBlog.author} added`)
      await message.waitFor( )

      const blogItem = page.getByText(`${newBlog.title} ${newBlog.author}`)
      await blogItem.waitFor(  )
      const id = await blogItem.evaluate( el => el.id )
      await page.getByRole('button', { name: /view/i }).click()

      await page.getByTestId(`like-${id}`).click()
      const likeElm = page.getByTestId(`likesNum-${id}`)
      await expect( likeElm ).toHaveText('1 like')
    })

    test('can be deleted by own user', async ({ page }) => {
      await logginWith(
        page,
        userData.username,
        userData.password
      )

      await createBlog(page, newBlog)
      const blogItem = page.getByText(`${newBlog.title} ${newBlog.author}`)
      await blogItem.waitFor(  )

      await page.getByRole('button', { name: /view/i }).click()
      await page.getByRole('button',{ name: /remove/i }).click()

      await expect( page.getByTestId('result-message') ).toHaveText(`blog ${newBlog.title} ${newBlog.author} successfully removed`)
    })

    test('can be eliminated jus for the own user', async ({ page, request }) => {

      await logginWith(
        page,
        userData.username,
        userData.password
      )

      await createBlog(page, newBlog)
      const blogItem = page.getByText(`${newBlog.title} by ${newBlog.author} added`)
      await blogItem.waitFor( { state:'hidden' } )


      await page.getByRole('button', { name: 'logout' }).click()

      const testUser = {
        username: 'testUser',
        name: 'Test User',
        password: '123456'
      }

      await request.post('http://localhost:3001/api/users', {
        data: testUser
      })

      const login = page.getByRole('button', { name:'login' })
      await login.waitFor()

      await logginWith( page,
        testUser.username,
        testUser.password )

      await page.getByRole('button', { name: /view/i }).click()
      const blogItem2 = page.getByText(`${newBlog.title} ${newBlog.author}`)
      await blogItem2.waitFor(  )
      await expect( page.locator('.removeButton') ).toBeHidden()
    })

    test( 'ordered by likes number', async ({ page, request }) => {
      const expected_likes = blogList.map( blog => blog.likes ).sort( (a,b) => b-a ).map( likeNum => `${likeNum} like` )
      await logginWith(page, userData.username, userData.password)
      await createBolgsList(page, request, blogList)
      const actual_likes = await page.locator('.likesNum').allTextContents()
      expect(actual_likes).toEqual(expected_likes)
    })

  } )

})