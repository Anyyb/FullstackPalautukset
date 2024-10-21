const { test, expect, beforeEach, describe } = require('@playwright/test')
// nollataan tietokanta ja luodaan käyttäjä
describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Maija Meikäläinen',
        username: 'admin',
        password: 'salasana'
      }
    })
    await page.goto('http://localhost:5173')
  })

// testi Login formin näyttämiselle
  test('Login form is shown', async ({ page }) => {
    //haetaan LoginForm komponentin otsikko
    await page.getByRole('heading', { name: 'Login' })
    //haetaan form elementti komponentin LoginForm divin sisältä käyttämällä page.locator
    const locator = await page.locator('form')
    //tarkistetaan, että otsikko Login renderöityy komponentista loginForm
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    // tarkistetaan, että locatorin löytämä elementti form renderöityy
    await expect(locator).toBeVisible()
  })
  //testi, että kirjautuminen onnistuu oikeilla tunnuksilla 
  test('Login succeeds with correct credentials', async ({ page }) => {
    //testataan oikeilla tunnuksilla
    await page.getByTestId('username').fill('admin')
    await page.getByTestId('password').fill('salasana')
    await page.getByRole('button',{name:'Login'}).click()
    // testataan, että kirjautuminen on onnistunut ja teksti renderöityy sivulle
    await expect(page.getByText('Maija Meikäläinen logged in')).toBeVisible()
  })
  //testi, että kirjautuminen ei onnistu väärillä tunnuksilla 
  test('Login fails with wrong credentials', async ({ page }) => {
    //testataan väärillä tunnuksilla
    await page.getByTestId('username').fill('admin')
    await page.getByTestId('password').fill('vääräsalasana')
    await page.getByRole('button',{name:'Login'}).click()
    // testataan, että kirjautuminen on epäonnistunut ja virhe ilmoitus renderöityy sivulle
    await expect(page.getByText('wrong username or password')).toBeVisible()
  })
  //testi, että uusi blogi voidaan luoda
  test('a new blog can be created', async ({ page }) => {

    //kirjaudutaan, jotta blogin lisäys lomake renderöityy
    await page.getByTestId('username').fill('admin')
    await page.getByTestId('password').fill('salasana')
    await page.getByRole('button',{name:'Login'}).click()

    // testataan, että kirjautuminen on onnistunut ja teksti renderöityy sivulle
    await expect(page.getByText('Maija Meikäläinen logged in')).toBeVisible()
    // avataan uuden blogin lisäys lomake
    await page.getByRole('button',{name:'Add new blog'}).click()
    //täytetään kentät, lähetään lomake ja testataan menikö blogin luominen läpi
    await page.getByTestId('title').fill('otsikko')
    await page.getByTestId('author').fill('kirjoittaja')
    await page.getByTestId('url').fill('url1')
    await page.getByTestId('likes').fill('100')

    await page.getByRole('button',{name:'add'}).click()

    //jos luotu blogi meni löpi sivulle renderöityy lause
    await expect(page.getByText('New blog added in blogs: Title: otsikko')).toBeVisible()
  })

  //testi, että blogista voi tykätä
  test('blog can be liked', async ({ page }) => {

    //kirjaudutaan, jotta nähdään blogit
    await page.getByTestId('username').fill('admin')
    await page.getByTestId('password').fill('salasana')
    await page.getByRole('button',{name:'Login'}).click()

    // testataan, että kirjautuminen on onnistunut ja teksti renderöityy sivulle
    await expect(page.getByText('Maija Meikäläinen logged in')).toBeVisible()
    await page.getByRole('heading', { name: 'Blogs:' })
    page.locator('li').filter({ hasText: 'Syökää porkkanaa'}).getByRole('button',{name:'Show more'}).click()
    await page.getByRole('button',{name:'like'}).click()

    //jos tykkäys nappia painettiin sivulle renderöityy lause
    await expect(page.getByText('Blog liked')).toBeVisible()
  })
  
  //testi, että blogin voi poistaa
  test('blog can be deleted', async ({ page }) => {
    //kirjaudutaan, jotta nähdään blogit
    await page.getByTestId('username').fill('admin')
    await page.getByTestId('password').fill('salasana')
    await page.getByRole('button',{name:'Login'}).click()
    // testataan, että kirjautuminen on onnistunut ja teksti renderöityy sivulle
    await expect(page.getByText('Maija Meikäläinen logged in')).toBeVisible()

    // ignoorataan window.confirm
    page.on('dialog', dialog => dialog.dismiss())
    await page.getByRole('heading', { name: 'Blogs:' })
    //haetaan blogi ja poistetaan se
    page.locator('li').filter({ hasText: 'otsikko'}).getByRole('button',{name:'Delete'}).click()

    //jos delete onnistui sivulle renderöityy lause, joka kertoo äsken lisätyn blogin poiston onnistuneen.
    await expect(page.getByText('Blog deleted: otsikko')).toBeVisible()
  })

})