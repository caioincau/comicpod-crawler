let request = require('request-promise')
let cheerio = require('cheerio')
let fs = require('fs')


request('http://www.terrazero.com.br/category/comicpod-podcast-quadrinhos/', async function(err, res, body) {
    if (err) console.log(`Erro: ${err}`)

    let $ = cheerio.load(body)

    let arrayResponse = []

    let objPodcast = {}
    let posts = $('.herald-posts article')

    const promises = posts.map((index, item) => {
        const postPodcast = $(item).find('a').attr('href')
        return request(postPodcast)
    }).get()


    const itens = promises.map(async (p) => {
        return await p.then((body) => {
            let $ = cheerio.load(body)
            let tituloPodcast = $('.entry-title').first().text()
            let descPodcast = $('.entry-content p').first().text()
            let linkPodcast = $('.powerpress_links_mp3').first().find("a").first().attr('href')
            objPodcast = {
                "titulo": tituloPodcast,
                "descricao": descPodcast,
                "link": linkPodcast
            }
            arrayResponse.push(objPodcast)
            return objPodcast
        }
    )})
    const podcastObjects = await Promise.all(itens)
    console.log(podcastObjects)
})