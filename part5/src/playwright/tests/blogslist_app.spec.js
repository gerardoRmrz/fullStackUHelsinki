import { test, expect, beforeEach, describe } from '@playwright/test'

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4000')
  })

  test('login form is shown', async ({ page }) => {
    const locator = await page.getByText('Blogs')

    await expect(locator).toBeVisible()
    await page.getByRole('button', {name: 'login'}).click()
    await expect(page.getByRole('textbox').first()).toBeVisible()
    await expect(page.getByRole('textbox').last()).toBeVisible()
    await expect(page.getByRole('button', {name: 'login'})).toBeVisible()
    await expect(page.getByRole('button', {name: 'cancel'})).toBeVisible()
  })


  

})