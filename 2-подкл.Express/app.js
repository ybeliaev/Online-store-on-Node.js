let express = require('express');
let app = express();

app.use(express.static('public'))

app.listen(3000, function(){
    console.log('node express work on 3000!');
});

app.get('/', function(req, res){
    console.log('load /')
    res.render(index.html);
})

app.get('/cat', function(req, res){
    res.end('Hello, CAT!');
})