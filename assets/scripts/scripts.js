const groupArticle = document.querySelector('article') // Todo o conteúdo dos posts
const groupPagination = document.querySelector('nav')
const searchForm = document.querySelector('.search') // Class do form (campo de pesquisa do usuario)
const inputUser = document.querySelector('.input') // Pega o valor pesquisado pelo usuário.

const newsPerPage = 2 // Tamanho de noticias por pagina
let pageStart = 1

searchForm.addEventListener('submit', action)

function action(event) {
  event.preventDefault()

  const baseUrl = 'https://newsapi.org/v2/everything?'
  const apiKey = '846b63d2889449c1b4e4f14a2892a107'
  const topicSearch = inputUser.value
  const url = `${baseUrl}q=${topicSearch}&page=${pageStart}&pageSize=${newsPerPage}&apiKey=${apiKey}`

  groupArticle.innerHTML = ''

  fetch(url)
    .then(res => {
      return res.json()
    })
    .then(data => {
      console.log(data)

      // let totalNews = data.totalResults // 1050 noticias
      // let totalPages = Math.ceil(totalNews / newsPerPage) // 30 paginas

      data.articles.forEach(article => {
        // Grupo dos posts
        const divPostGroup = document.createElement('div')
        divPostGroup.setAttribute('id', 'post-group')

        // Grupo do data-like (contém a data do post e o simbolo de fav)
        const divDataLike = document.createElement('div')
        divDataLike.classList.add('data-like')

        // Contém a Data da publicação
        const pData = document.createElement('p')
        pData.textContent = article.publishedAt

        // Contém o favorito da publicação
        const imgFav = document.createElement('input')
        imgFav.classList.add('fav')
        imgFav.setAttribute('type', 'image')
        imgFav.setAttribute('src', '/assets/images/favorite.png')

        // Grupo do post (contém o titulo e o paragrafo do artigo)
        const divPost = document.createElement('div')
        divPost.classList.add('post')

        // Titulo do artigo
        const titlePost = document.createElement('h2')
        titlePost.classList.add('title-post')
        titlePost.textContent = article.title

        // Conteudo do artigo
        const pContent = document.createElement('p')
        pContent.textContent = article.content

        divPost.append(titlePost, pContent) // Adiciona o titulo e o conteudo do artigo dentro do grupo Post
        divDataLike.append(pData, imgFav) // Adiciona a data (tag p) e o fav dentro do grupo data-like
        divPostGroup.append(divDataLike, divPost) // Adiciona o data-like dentro do grupo de posts.
        groupArticle.append(divPostGroup) // Adiciona o divPostGroup completo no ARTICLE.
      })
    })
}

// API Pagination
const previous = document.querySelector('.previous')
const next = document.querySelector('.next')
const pages = document.querySelectorAll('.page')

previous.addEventListener('click', previousAction)
next.addEventListener('click', nextAction)

//Cenário 1: Clicar em qualquer numero de page (pageStart = pageClicked)
pages.forEach(page => {
  page.addEventListener('click', event => {
    event.preventDefault()

    pageClicked = page.textContent

    pageStart = pageClicked
    action(event)
  })
})

// Cenario 2: Clicar no previous (pageStart--)
function previousAction(event) {
  event.preventDefault()

  if (pageStart > 1) {
    pageStart--
    action(event)
  }
}

// Cenario 3: Clicar no next (pageStart++)
function nextAction(event) {
  event.preventDefault()

  pageStart++
  action(event)
}

// pages.forEach(page => {
//   page.addEventListener('click', pageAction)
// })

// Cenario 3: Clicar em qualquer um dos numeros (pega o value e coloca no pageStart)
// function pageAction(event) {
//   event.preventDefault()

//   pageSelected = page.textContent
//   groupArticle.innerHTML = ''

//   console.log(pageSelected)
//   pageStart = pageSelected
//   action(event)
// }
