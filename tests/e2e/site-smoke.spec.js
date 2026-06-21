import { expect, test } from '@playwright/test'

async function expectNoHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement
    return doc.scrollWidth - doc.clientWidth
  })

  expect(overflow).toBeLessThanOrEqual(1)
}

async function acceptCookiesIfPresent(page) {
  const accept = page.getByRole('button', { name: 'Accept' })
  if (await accept.isVisible().catch(() => false)) {
    await accept.click()
  }
}

test.describe('site smoke checks', () => {
  test('home page renders key content without horizontal overflow', async ({ page, isMobile }) => {
    await page.goto('/')
    await acceptCookiesIfPresent(page)

    await expect(page.getByRole('heading', { name: /Financial clarity\. Operational calm\./i })).toBeVisible()
    if (!isMobile) {
      await expect(page.getByRole('link', { name: 'Client Login' }).first()).toBeVisible()
      await expect(page.getByRole('link', { name: 'Book a Consultation' }).first()).toBeVisible()
    }
    await expectNoHorizontalOverflow(page)
  })

  test('top navigation remains sticky while scrolling', async ({ page, isMobile }) => {
    await page.goto('/')
    await acceptCookiesIfPresent(page)
    await page.evaluate(() => window.scrollTo(0, 1200))

    const header = page.locator('header')
    await expect(header).toBeVisible()

    const box = await header.boundingBox()
    expect(box?.y ?? 999).toBeLessThanOrEqual(isMobile ? 90 : 50)

    if (!isMobile) {
      await expect(page.getByRole('link', { name: 'Client Login' }).first()).toBeVisible()
      await expect(page.getByRole('link', { name: 'Book a Consultation' }).first()).toBeVisible()
    }
  })

  test('mobile menu exposes client login and consultation actions', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile navigation check only runs on mobile project')

    await page.goto('/')
    await acceptCookiesIfPresent(page)
    await page.locator('details summary').click({ force: true })

    const mobileNav = page.getByRole('navigation', { name: 'Mobile navigation' })
    await expect(mobileNav.getByRole('link', { name: 'Client Login' })).toBeVisible()
    await expect(mobileNav.getByRole('link', { name: 'Book a Consultation' }).last()).toBeVisible()
    await expectNoHorizontalOverflow(page)
  })

  test('contact page includes phone field and no horizontal overflow', async ({ page }) => {
    await page.goto('/contact')

    await expect(page.getByRole('heading', { name: /Start with a conversation/i })).toBeVisible()
    await expect(page.getByLabel('Phone')).toBeVisible()
    await expectNoHorizontalOverflow(page)
  })

  test('thank-you page is concise and does not mention auto reply', async ({ page }) => {
    await page.goto('/thank-you')

    await expect(page.getByRole('heading', { name: /Thank you\. We value the opportunity/i })).toBeVisible()
    await expect(page.getByText(/automatic confirmation email/i)).toHaveCount(0)
    await expect(page.getByText(/Please check your inbox/i)).toHaveCount(0)
    await expectNoHorizontalOverflow(page)
  })

  test('chatbot appears only on public pages', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('button', { name: 'Ask Fidara' })).toBeVisible()

    for (const path of ['/login', '/staff-login', '/portal', '/admin']) {
      await page.goto(path)
      await expect(page.getByRole('button', { name: 'Ask Fidara' })).toHaveCount(0)
    }
  })

  test('portal auth and legal routes load without real credentials', async ({ page }) => {
    const routes = [
      ['/login', /Client Portal Login/i],
      ['/staff-login', /Staff Login/i],
      ['/forgot-password', /Reset your portal password/i],
      ['/reset-password', /Choose a new password/i],
      ['/privacy', /Privacy and client confidentiality matter/i],
      ['/terms', /Terms for using Fidara Group online services/i],
      ['/security', /Practical safeguards for portal workflows/i],
    ]

    for (const [path, heading] of routes) {
      await page.goto(path)
      await expect(page.getByRole('heading', { name: heading })).toBeVisible()
      await expectNoHorizontalOverflow(page)
    }

    await page.goto('/portal')
    await expect(page.getByRole('heading', { name: /Welcome to your Fidara dashboard/i })).toBeVisible()
    await expect(page.getByText('Client account active')).toHaveCount(0)
    await expect(page.getByRole('button', { name: 'Download' })).toHaveCount(0)
    await expectNoHorizontalOverflow(page)

    await page.goto('/admin')
    await expect(page.getByText(/Verifying staff access|Unable to verify staff access|Access denied/i).first()).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Fidara Admin Portal' })).toHaveCount(0)
    await expect(page.getByText('Total Clients')).toHaveCount(0)
    await expectNoHorizontalOverflow(page)
  })
})
