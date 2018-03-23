const express = require('express')
const ejs = require('ejs')
const app = express()
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
let dataKaart
let tempData

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// app.get('/', (req, res) => res.send('Hello World!'))

// view engine setup
app.set('view engine', 'ejs');

app.use(express.static('public'))

function apiCall(finalArray, cb) {

  console.log( finalArray );
  const arr = []

  for (var i = 0; i < 12; i++) {
    var sparqlquery = `
      PREFIX dc: <http://purl.org/dc/elements/1.1/>
      PREFIX foaf: <http://xmlns.com/foaf/0.1/>
      SELECT ?cho ?title ?description ?img WHERE {
        ?cho dc:type ?type .
        ?cho dc:title ?title .
        ?cho dc:description ?description .
        ?cho foaf:depiction ?img .
        FILTER REGEX(?title, '${finalArray[i]}', 'i')
      }
      LIMIT 1`
    var encodedquery = encodeURIComponent(sparqlquery);
    var queryurl = 'https://api.data.adamlink.nl/datasets/AdamNet/all/services/endpoint/sparql?default-graph-uri=&query=' + encodedquery + '&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on';

    arr.push( fetch(queryurl) )

    // fetch(queryurl)
    //   .then((resp) => resp.json()) // transform the data into json
    //   .then(function(data) {
    //     console.log(30, data);
    //     dataKaart = data
    //     cb( null, data )
    //   }).catch(function(error) {
    //     // if there is any error you will catch them here
    //     console.log(error);
    //     cb( error )
    //   });
  }

  Promise.all( arr ).then( res => {

    return Promise.all( res.map( resp => resp.json() ) )

  } ).then(res => {
    console.log( res )
    dataKaart = res
    cb( null, res )
  }).catch( err => {
    console.log( err )
    cb( err )
  })

}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

app.get("/", function(req, res) {
  // console.log(req.session.ingelogd);
  res.render("index")
})

app.get("/game", function(req, res){
  console.log('woooooo')
  console.log(dataKaart)
  res.render("game", {
    data: dataKaart
  })
})

app.post( '/keywords', function(req, res) {

  console.log(req.body);
  const arr = []
  for ( let i = 1; i < 7; i++ ) {

    if (req.body['key' + i].length > 0) {
      arr.push( req.body['key' + i] )
    }

    // res.redirect('/game')

  }

  const arr1 = shuffle( arr ),
    arr2 = shuffle( arr.slice() )

    console.log(arr);
    console.log(arr2)

    apiCall( arr1.concat( arr2 ), function( err, data ) {

      if ( err ) {

        console.log( err )
        res.redirect( '/' )

      }

      console.log( data )
      res.redirect('/game')

    } )

} )





app.listen(3000, () => console.log('Example app listening on port 3000!'))
