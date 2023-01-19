const groupArticle = document.querySelector('article') // Todo o conteúdo dos posts
const searchForm = document.querySelector('.search') // Class do form (campo de pesquisa do usuario)
const inputUser = document.querySelector('.input') // Pega o valor pesquisado pelo usuário.

// atributo -> input[src=assets/img/favorite.png]
// .title (nome da classe) > img

searchForm.addEventListener('submit', action)

function action(event) {
  event.preventDefault()

  const baseUrl = 'https://newsapi.org/v2/everything?'
  const page = 'page=1'
  const pageSize = 'pageSize=8' // Tamanho por página
  const apiKey = '846b63d2889449c1b4e4f14a2892a107'
  let topicSearch = inputUser.value

  let url = `${baseUrl}q=${topicSearch}&${page}&${pageSize}&apiKey=${apiKey}`

  fetch(url)
    .then(res => {
      return res.json()
    })
    .then(data => {
      console.log(data)
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
        groupArticle.appendChild(divPostGroup) // Adiciona o divPostGroup completo no ARTICLE.
      })
    })
}
