const express = require('express');


const server = express();

server.use('/css', express.static('css'));//middleware pour servir des reponses statiques comme les css
server.set('views','./views');
server.set('view engine', 'ejs');// indiquer que l'on utilise ejs comme moteur de template

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
    )

server.get('/movie/:id/:title', // les : c'est exclusivement pour definir des paramètres
    (req,res) => {
    //title = 'titre';
        res.render('details', {movieId: req.params.id, movieTitle: req.params.title});
    }
    );



server.listen('3000',
    () => {
    console.log('serveur demarrer');
    }

)

