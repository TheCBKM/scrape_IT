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
        args: ["--no-sandbox"]
    }
});

app.get('/', function(req, res) {
    res.send('/get/:count/:id')
})

app.get('/get/:count/:id', function(req, res) {
    (async() => {
        const results = await google.scrape(req.params.id, req.params.count);
        console.log('results', results);

        res.json(results)
    })();
})




app.listen(process.env.PORT || 3000)