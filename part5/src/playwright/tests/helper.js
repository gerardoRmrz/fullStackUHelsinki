//import { screen } from '@testing-library/react'

const logginWith = async (page, userName, password) => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByTestId('username').fill(userName)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, newBlog) => {
  await page.getByRole('button', { name: /create a new blog/i }).click()
  await page.getByTestId('blog-title').fill(newBlog.title)
  await page.getByTestId('blog-author').fill(newBlog.author)
  await page.getByTestId('blog-url').fill(newBlog.url)
  await page.getByTestId('newBlogSubmitButton').click()
}

export { logginWith, createBlog }