var request = require('request-promise')
var cheerio = require('cheerio')
var fs = require('fs')

request('http://www.terrazero.com.br/category/comicpod-podcast-quadrinhos/', function(err, res, body) {
    if (err) console.log(`Erro: ${err}`)

    var $ = cheerio.load(body)

    var arrayResponse = []

    var objPodcast = {}

    $('.herald-posts article').each(function() {

        var postPodcast = $(this).find('a').attr('href')

        request(postPodcast, function(err, res, body) {
            if (err) console.log(`Erro: ${err}`)

            var $ = cheerio.load(body)

            var tituloPodcast = $('.entry-title').first().text()

            var descPodcast = $('.entry-content p').first().text()

            var linkPodcast = $('.powerpress_links_mp3').first().find("a").first().attr('href')

            objPodcast = {
                "titulo": tituloPodcast,
                "descricao": descPodcast,
                "link": linkPodcast
            }

            arrayResponse.push(objPodcast)


        }).then((res) => {
            console.log(arrayResponse);
        })

        // console.log(arrayResponse);

    })

    // fs.appendFile('podcasts.json', JSON.stringify(arrayResponse))

    // $('.herald-posts article').each(function(){

    //     var postPodcast = $(this).find('a').attr('href')

    //     request(postPodcast, function(err, res, body) {
    //         if (err) console.log(`Erro: ${err}`)

    //         var $ = cheerio.load(body)

    //         var tituloPodcast = $('.entry-title').first().text()

    //         var tituloPodcast = $('.entry-title').first().text()

    //         console.log(`Titulo: ${tituloPodcast}`)

    //     })

    //     //
})