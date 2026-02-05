import { expect } from '@playwright/test'

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

const getBlogId = async(page) => {
  const id = await page.getByRole('button', { name: /like/i }).nth(0)
  console.log(id)
}

const clickManyTimes = async (page, id, blog) => {
  for ( let j = 0; j<blog.likes; j ++ ){
    console.log('counter: ',j)
    await page.getByTestId(`like-${id}`).click()
    await expect( page.getByTestId(`likesNum-${id}`)).toHaveText(`${j+1} like`, { timeout: 5000 })
  }
}


const createBolgsList = async (page, request, blogList) => {
  for ( const blog of blogList ) {
    await createBlog(page, blog)
    console.log('Author: ', blog.author, 'likes: ',blog.likes)
    //await expect(page.getByText(`a new ${blog.title} by ${blog.author} added`)).toBeHidden()
    const item = page.getByText(`${blog.title} ${blog.author}`)
    await expect( item , { timeout: 10000 }).toBeVisible()
    await page.getByRole('button', { name: 'view' }).click()
    const id = await item.evaluate( el => el.id )
    await clickManyTimes(page, id, blog)
  }
}

export { logginWith, createBlog, createBolgsList, getBlogId }