const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const PORT =3000;
const server = express();
let movies = [];

server.use('/css', express.static('css'));//middleware pour servir des reponses statiques comme les css
server.set('views','./views');
server.set('view engine', 'ejs');// indiquer que l'on utilise ejs comme moteur de template

//var urlencodedParser = bodyParser.urlencoded({extend: false});
server.use(bodyParser.urlencoded({extended: false}));// le middleware sera utilisé de manière globale quand on en a besoin
server.get('/',
    (req, res)=> {
    //res.send('bonjour la compagnie');
    res.render('index');
    }
    );
/*server.get('/movie-detail/',
    (req,res) => {
    res.render('details');
    }
)*/

server.get('/movies/add' ,
    (req, res) => {
    res.send('formulaire');
    }
    );

//let movieTitre;



server.get('/movies',
    (req ,res) => {
     movies = [
        {
            title: 'terminator',
            year: 1996
        },
        {
            title: 'terminator',
            year: 1991
        },
         {
             title: 'avenger infinity war',
             year: 2018
         }

        ];
    res.render('movies',{films: movies});


    }
    );

server.post('/movies', upload.fields([]),
    (req, res) => {
    if(!req.body){
        return res.status(500);
    }
    else {
        const formData = req.body;
        console.log(formData);
        const newMovie = { title: req.body.title, year: req.body.year};
        movies = [...movies, newMovie];
        res.sendStatus(201);

    }

}
);

server.get('/movie-search',
    (req, res) => {
    res.render('movie-search');
    }
    )
/*server.post('/movies',
    (req, res) => {
        const newMovie = {
            title: req.body.movie,
            year : req.body.year,
        };
        movies = [...movies,newMovie];
        res.sendStatus(201);

        console.log(movies);
        //res.render('movies');
    }*/



//)
//var urlencoded = bodyParser.urlencoded({extend:false});


server.get('/movie/:id/:title', // les : c'est exclusivement pour definir des paramètres
    (req,res) => {
    //title = 'titre';
        res.render('details', {movieId: req.params.id, movieTitle: req.params.title});
    }
    );



server.listen(PORT,
    () => {
    console.log('serveur demarré');
    }

)

