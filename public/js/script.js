(function() {
  var app = {
    init: function() {
      document.querySelector("#eigen").addEventListener("click", self.init)
      document.querySelector("#cpu").addEventListener("click", cpu.init)
    }
  }

  function soundPlay(src) {
    var audioElement = document.getElementById('player-src');
    audioElement.src = src; //src for the player
    var myAudio = document.getElementById("player");
    myAudio.load();
    myAudio.play();
  }

  function soundPlay2(src) {
    var audioElement = document.getElementById('player-src2');
    audioElement.src = src; //src for the player
    var myAudio = document.getElementById("player2");
    myAudio.load();
    myAudio.play();
  }

  function soundPlay3(src) {
    var audioElement = document.getElementById('player-src3');
    audioElement.src = src; //src for the player
    var myAudio = document.getElementById("player3");
    myAudio.load();
    myAudio.play();
  }

  var game = {
    play: function() {
      var aantalKliks = 0
      var match = []
      var matches = 0
      for (var i = 0; i < document.querySelectorAll(".clickAble").length; i++) {
        document.querySelectorAll(".clickAble")[i].addEventListener("click", function() {
          event.target.classList.add("aangeklikt")
          // flip.init()
          // event.target.classList.toggle("flipfront")
          var klik = event.target
          match.push(klik)
          aantalKliks++
          console.log("aantalKliks = " + aantalKliks);
          if (aantalKliks == 2 && match[0].id === match[1].id) {
            match[0].classList.add("none")
            match[1].classList.add("none")
            matches++;
            soundPlay("sound/yay.mp3");
            if (matches == 6) {
              soundPlay();
            }
            for (var i = 0; i < document.querySelectorAll(".clickAble div").length; i++) {
              document.querySelectorAll(".clickAble div")[i].classList.remove("aangeklikt")
            }
            console.log("match");
            match = []
            aantalKliks = 0
          } else if (aantalKliks == 2 && match[0].id !== match[1].id) {
            soundPlay2("sound/fail.mp3");
            console.log("geen match");
            console.log(match[0].classList)
            console.log(match[1].classList);
            setTimeout(function(timeout) {
              for (var i = 0; i < document.querySelectorAll(".clickAble div").length; i++) {
                document.querySelectorAll(".clickAble div")[i].classList.remove("aangeklikt")
              }
            }, 1000)
            match = []
            aantalKliks = 0
          }
          console.log(matches)
          if (matches === 6) {
            console.log("awesome")
            document.querySelector("section").classList.remove("none")
            soundPlay3("sound/victory.mp3");
          }
        })
      }
    }
  }

  var cpu = {
    init: function() {
      var arr = ["Appel", "Kind", "Kerk", "Vriend", "Schilderij", "water"]
      var arr2 = ["Kind", "Kerk", "Vriend", "water", "Appel", "Schilderij"]
      randomise.init(arr, arr2)
    }
  }

  var self = {
    init: function() {
      console.log("aangeroepen");
      document.querySelector("form").classList.remove("none")
      document.querySelectorAll("form")[0].addEventListener("submit", function(e) {
        e.preventDefault()
        var custom = [];
        var custom2 = [];
        self.loop(custom, custom2)
      })
    },
    loop: function(custom, custom2) {
      console.log("hier wel");
      for (var i = 0; i < document.querySelectorAll(".gek input").length; i++) {
        console.log("hij wordt wel aangeroepen");
        var input = document.querySelectorAll(".gek input")[i].value
        custom.push(input)
        custom2.push(input)
        console.log(input);
        console.log(custom);
      }
      if (custom.length == 6) {
        randomise.init(custom, custom2)
      }
    }
  }

  // var flip = {
  //   init: function() {
  //     var divs = document.querySelectorAll('.clickAble')
  //     var divsflip = divs[i]
  //     console.log('doet het')
  //     for (var i = 0; i < divs.length; i++) {
  //       console.log("loop doet het 1")
  //       document.querySelectorAll('.clickAble')[i].addEventListener('click', function(e) {
  //         console.log("loop doet het 2")
  //         divs.classList.add('flip');
  //       })
  //     }
  //
  //   }
  // }

  var randomise = {
    init: function(arr, arr2) {
      // this.randomise(arr, num)
      var newArr = this.shuffle(arr)
      var newArr2 = this.shuffle(arr2)
      var finalArray = newArr.concat(newArr2);
      this.use(finalArray)
      console.log(newArr);
      console.log(newArr2);
      console.log(finalArray)
    },
    shuffle: function(array) {
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
    },
    use: function(finalArray, custom) {

      // console.log(arr);
      // console.log(num);
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
        fetch(queryurl)
          .then((resp) => resp.json()) // transform the data into json
          .then(function(data) {
            rows = data.results.bindings; // get the results
            imgdiv = document.getElementById('images');
            sectionfill = document.querySelector('section')
            console.log(rows);
            for (i = 0; i < rows.length; ++i) {
              var overlay = document.createElement('div');
              var nieuwid = rows[i]['title']['value'].split(" ")
              overlay.classList.add("clickAble")
              var overlayoutside = document.createElement('div');
              overlayoutside.id = nieuwid[0]
              var img = document.createElement('img');

              if ( !document.querySelectorAll( 'section div[data-id="' + nieuwid[0] + '"]' )[ 0 ] ) {

                var sectiondiv = document.createElement('div');
                var imgsection = document.createElement('img')
                var tekstfill = document.createElement('p')

                sectiondiv.setAttribute( 'data-id', nieuwid[0] )
                imgsection.src = rows[i]['img']['value'];
                imgsection.title = rows[i]['title']['value'];
                tekstfill.innerHTML = rows[i]['title']['value'];

                sectionfill.appendChild(sectiondiv);
                sectiondiv.appendChild(imgsection)
                sectiondiv.appendChild(tekstfill)

              }


              img.src = rows[i]['img']['value'];

              img.title = rows[i]['title']['value'];
              console.log(rows[i].img.value);
              imgdiv.appendChild(overlay);
              overlay.appendChild(overlayoutside);
              overlay.appendChild(img);
              console.log(document.querySelectorAll("#images div").length)
              if (document.querySelectorAll("#images div").length == 24) {
                game.play()
              }
            }
          })

          .catch(function(error) {
            // if there is any error you will catch them here
            console.log(error);
          });
      }
    }
  }
  app.init()
})()
