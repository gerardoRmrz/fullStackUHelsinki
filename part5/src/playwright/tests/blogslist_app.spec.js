import { test, expect, beforeEach, describe } from '@playwright/test'

describe('Blog app', () => {
  beforeEach( async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Lou N. Atick',
        username: 'louNatick',
        password: '123456'
      }
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
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByTestId('username').fill('louNatick')
    await page.getByTestId('password').fill('123456')
    await page.getByRole('button', { name: 'login' }).click()

    await expect( page.getByText('Lou N. Atick logged in ') ).toBeVisible()
  })

  test('login fails with wrong credentials', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByTestId('username').fill('willSha')
    await page.getByTestId('password').fill('9784hau293')
    await page.getByRole('button', { name: 'login' }).click()

    await expect( page.getByText('Request failed with status code 401 ') ).toBeVisible()
  })




})

describe('When logged in', () => {
  beforeEach( async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Lou N. Atick',
        username: 'louNatick',
        password: '123456'
      }
    })

    await page.goto('/')
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByTestId('username').fill('louNatick')
    await page.getByTestId('password').fill('123456')
    await page.getByRole('button', { name: 'login' }).click()
  })

  test('When user login can create a new blog', async ({ page }) => {
    const newBlog = {
      title: ' Becoming a Hacker: Must Read Security & Cyber Crime Books',
      author: 'Matt Fay',
      url: 'https://javascripttoday.com/blog/becoming-a-hacker-book-list'
    }

    await page.getByTestId('create a new blog').click()
    await page.getByTestId('blog-title').fill(newBlog.title)
    await page.getByTestId('blog-author').fill(newBlog.author)
    await page.getByTestId('blog-url').fill(newBlog.url)
    await page.getByTestId('newBlogSubmitButton').click()

    await expect( page.getByText(`a new ${newBlog.title} by ${newBlog.author} added`) ).toBeVisible()
    await expect( page.getByText(`${newBlog.title} ${newBlog.author}`) ).toBeVisible()
  })

})