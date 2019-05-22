let express = require('express');
let app = express();

app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug');


app.listen(3000, function(){
    console.log('node express work on 3000!');
});

app.get('/', function (req, res) {
    res.render('index', {
        name: 'John',
        age: 120
    });
  });

app.get('/cat', function(req, res){
    res.end('Hello, CAT!');
})