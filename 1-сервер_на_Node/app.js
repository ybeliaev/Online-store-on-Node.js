const http = require('http');
// для возможности чтения из файла подкл. модуль
const fs = require('fs');

http.createServer(function(request, response){
    console.log(request.url);// можно вывести url
    console.log(request.method); // можно вывести метод
    console.log(request.headers['user-agent']) // данные о браузере, операц. системе

    // setHeader укажет распознавать теги и кириллицу
    response.setHeader('Content-Type', 'text/html;charset=utf-8;')

    if(request.url=='/'){
        response.end('<strong>Main server</strong>. Этот текст для проверки кириллицы.')
        // русский тест не отобразится

    }else if(request.url=='/cat'){
        response.end('<i>Category</i>')
    }else if(request.url=='/dat'){
        
        // прочитаю содержимое файла
        let myFile = fs.readFileSync('1.dat', 'utf8');
        response.end(myFile)
    }    
}).listen(3000)