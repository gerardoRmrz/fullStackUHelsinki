import { test, expect, beforeEach, describe } from '@playwright/test'
import { logginWith, createBlog } from './helper'

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

      await page.getByRole('button', { name: /view/i }).click()

      await page.getByRole('button',{ name: /like/i }).click()

      await expect( page.getByTestId('likes-num') ).toHaveText('1 like')
    })

  } )

})