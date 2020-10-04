const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const Scraper = require('images-scraper');

app.use(bodyParser.json())
app.use(cors())

const google = new Scraper({
    puppeteer: {
        headless: true,
    }
});


app.get('/get/:count/:id', function(req, res) {
    (async() => {
        const results = await google.scrape(req.params.id, req.params.count);
        console.log('results', results);
        let html = ''
        results.map(r => {
            html += `<img src="${r.url}" width="200"></img>`
        })
        res.send(html)
    })();
})




app.listen(process.env.PORT || 3000)