# Интеренет магазин на Node.js
![alt node.js](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/250px-Node.js_logo.svg.png)

## Установка node.js

* Для начала установить саму Node.js https://nodejs.org/uk/
* Далее пакет для авт. перезагрузки сервера https://www.npmjs.com/package/nodemon

## Работа с консолью windows

* Для смены локального диска ввести имя диска и enter:  ``` d: ```
* Осмотреться: ``` dir ```
* Переход в папку app ( достаточно ввести начальную букву папки и нажать TAB. Если похожие названия - переключаемся между ними тем же TAB ): ``` cd app ``` или указать полный путь ``` cd D:\App ```
* Очистка консоли: ``` cls ```
* Подняться на уровень выше: ``` cd .. ```
* Создать папку ``` md ```
* Удалить папку ``` rd ```
* Вывод команды перенаправить в файл: ``` dir > t.txt ```. Результат будет записан в созданный файл t.txt
## Создание сервера на node.js
Создаю файл ```app.js```
с содержимым:
```node.js
// подключаем модуль http, сохраняем его в константу http
const http = require('http');
// запуск модуля
// 3000 - порт ,т.е своего рода номер на который могу обратиться и получить ответ
http.createServer().listen(3000)
```
Запускаю выполнение из консоли ```node app ```
В адресной строке ввожу ```http://localhost:3000/```
Будет крутиться загрузка - нечем ответить серверу. Научим его отвечать.
```node.js
const http = require('http');
// http.createServer().listen(3000)
// учим серевер отвечать
// в request попадает всё о браузере времени запроса, методе запроса
// response - то что ответит сервер
http.createServer(function(request, response){
    response.end('<h1>Hello, it is my first server on Node</h1>')
}).listen(3000)
```
Чтобы постоянно не перезапускать - можно установить https://www.npmjs.com/package/nodemon и запуск ``` nodemon app.js```
* F12 по http://localhost:3000/ и Ctrl+Shift+R и во вкладке All панельки Network
* Вкладка Header для поля localhost таблицы Name - то что в request. Request - объект со свойствами ,поэтому можно:
```node.js
const http = require('http');

http.createServer(function(request, response){
    console.log(request.url);
    if(request.url=='/'){
        response.end('Main server')
    }else if(request.url=='/cat'){
        response.end('Category')
    }    
}).listen(3000)
```
#### модифицирую код

```node.js
const http = require('http');

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
    }    
}).listen(3000)
```
### Хочу открыть файл и показать его содержимое в строку.
* Для этого создаю 1.dat
```html
<h1>Hello!</h1>
<h2>Hi!</h2>
<img src="https://cdn2.iconfinder.com/data/icons/whcompare-isometric-web-hosting-servers/50/server-2-256.png" alt="server">
```
https://nodejs.org/dist/latest-v6.x/docs/api/fs.html#fs_fs_readfile_file_options_callback
* справка по fs.readFile
https://ru.code-maven.com/reading-a-file-with-nodejs 

```node.js
const http = require('http');
// для возможности чтения из файла подкл. модуль
const fs = require('fs');

http.createServer(function(request, response){   
    
    response.setHeader('Content-Type', 'text/html;charset=utf-8;')

    if(request.url=='/'){
        response.end('<strong>Main server</strong>. Этот текст для проверки кириллицы.')
        
    }else if(request.url=='/cat'){
        response.end('<i>Category</i>')
    }else if(request.url=='/dat'){
        
        // прочитаю содержимое файла
        let myFile = fs.readFileSync('1.dat', 'utf8');
        response.end(myFile)
    }    
}).listen(3000)
```
* ввожу в адр. строке http://localhost:3000/dat и получаю html 
* НО ... если я положе картинку локально - она НЕ отобразится.

