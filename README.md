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
* **НО ... если я положу картинку локально - она НЕ отобразится:** она будет в state ```panding```
```html
...some code
<img src="./server.png" alt="server">
```
* Напомню, что ```nodemon``` я глобально установил ,поэтому можно запускать сервер командой
```node.js
nodemon app
```
## Установка и настройка Express
https://expressjs.com/ru/
```node.js
node init
```
```node.js
npm install express --save
```
Благодаря ключу ```---save```"express" попадает в зависимости:
```json
...
"dependencies": {
    "express": "^4.17.0"
  }
 ```
* Теперь для установки на новой машине достаточно ввести команду ``` node install``` и подтянутся все необходимые пакеты. 
* Вышесказанное произойдёт **без** начального наличия папки node_modules и файла package-lock.json
* Запускаю следующий код командой ```node app```:
```node.js
let express = require('express');

// создаю новый экземпляр объекта эксперсс
let app = express();

// подключаю статику
/**
 * public - имя папки ,где хранится статика
 */
app.use(express.static('public'))

// запуск сервера
app.listen(3000, function(){
    console.log('node express work on 3000!');
});

// приложение. req - запрос, res - ответ
// в данном примере обращение идёт get запросом (app.get)
app.get('/', function(req, res){
    res.end('Hello!');
})

app.get('/cat', function(req, res){
    res.end('Hello, CAT!');// http://localhost:3000/cat выведет 'Hello, CAT!'
})
```
* Создаю папку public, в которой папки js, images, css... Также создаю файл index.html, style.css -> css, кладу картинку в images...
* Теперь нужно научить экспресс читать этот файл
```node.js
let express = require('express');
let app = express();

app.use(express.static('public'))

app.listen(3000, function(){
    console.log('node express work on 3000!');
});

app.get('/', function(req, res){
    console.log('load /') // сейчас  этот второй вывод не выведет - только первый 'node express work on 3000!' 
    res.render(index.html);
})

app.get('/cat', function(req, res){
    res.end('Hello, CAT!');
})
```
* Картинки и стили отлично считались.(см. папку 2)

## Отладка на Node.js
**https://expressjs.com/uk/starter/generator.html**
* В доках ```> set DEBUG=myapp:* & npm start```
* Я пишу: ```> set DEBUG=express:* & npm app```  - в переменную DEBUG попадает приложение express и * - будет вывод ВСЕЙ отладки
* & укажет на последовательность команд: вначале & после этого
* Можно указать вид необх. информации: 
* ```> set DEBUG=express:router & npm app``` - для начала достаточно этого.
* Или ```> set DEBUG=express:aplication & npm app```
#### как быть с nodemon?
* После  ``` set DEBUG=express:router & npm app``` переменная DEBUG сохраняется , поэтому достаточно ввести
``` nodemon app.js```

## Работа с PUG
https://expressjs.com/ru/guide/using-template-engines.html

* ``` npm install pug --save ```
* Создаю папку *views* где будут шаблоны *pug*
* В ```app.js``` добавляю строку 
```node.js
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
```
* В препроцессор был передан объект. На странице он выводится конструкцией ```#{}```
```pug
include header

h2 Hi!
a(href="images/server.png")
h3 #{name}
h3 #{age}
```

## Установка, настройка MySQL
* Скачать клиент https://dev.mysql.com/downloads
где скачать MySQL Community Server  и затем MySQL Workbench
* Выключить остальные сервера (комп - управление - службы и приложения - службы).
* Проинсталировать.


* Должна проинсталироваться и программа MySQL Workbench.
* Добавляем соединение на главной панели нажатием на плюсик: MySQL Connection +
* Прописываем имя соединения, вводим пароль.
* Создаём новую базу "create a new schema..." 
* Выбрать charset и apply
* ПКМ на новой базе -> Set as default schema

### Для остановки службы mySQL-> Компьютер - Управление - Службы...

## Ввод данных в базу
* Открыть новую вкладку Query 1 и в ней пишу запрос:
```mySQL
DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
    	`category` varchar(255) DEFAULT NULL,
    	`description` varchar(500) DEFAULT NULL,
	`image` varchar(500) DEFAULT NULL,
   	 PRIMARY KEY (`id`)
)
```
* Если нужно, можно вручную скопировать рядок и переделать его
* Нажать на значёк молнии для исполнения, а затем значёк обновить чтобы появилась таблица ```category```
* ПКМ на названии таблицы и выбрать ```Alter table``` - сможем работать со структурой таблицы
* Аналогично ввожу данные в таблицу
```mySQL
INSERT INTO `category` VALUES (1, 'Ноутбуки', 'Ноутбук (англ. notebook — блокнот, портативный ПК) — переносной персональный компьютер, в корпусе которого объединены типичные компоненты ПК, включая дисплей, клавиатуру и устройство указания (обычно сенсорная панель или тачпад), а также аккумуляторные батареи.', 'notbook.png'), (2, 'Телефоны', 'Телефо́н (от др.-греч. τῆλε «далеко» + φωνή «голос», «звук») — аппарат для передачи и приёма звука (в основном — человеческой речи) на расстоянии. Современные телефоны осуществляют передачу посредством электрических сигналов.', 'Smartphone.png')

```
* Далее ещё таблица с товарами

```mySQL
CREATE TABLE `goods` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`name` varchar(255) DEFAULT NULL,
	`description` text,
	`cost` double DEFAULT NULL,
	`image` varchar(500) DEFAULT NULL,
	`category` int(5) DEFAULT NULL,
	PRIMARY KEY (`id`)
)
```
* Вставляю данные
```mySQL

INSERT INTO `goods` VALUES (1, 'Asus X507MA (X507MA-EJ020) Gold','15,6" (1920x1080) TN+film / Intel Celeron N4000 (1.1 - 2.6 ГГц) / RAM 4 ГБ / HDD 500 ГБ / Intel UHD Graphics 600 / Bluetooth , Wi-Fi / Без ОС (freeDOS, Linux) / Без ОД / 1.75 кг', 6999, 'Asus_X507MA.jpg', 1),(2,'Mi Notebook 15 Lite i3 4G 128 W','15.6" IPS (1920x1080) Full HD / Intel Core i3-8130U (2.2 - 3.4 ГГц) / RAM 4 ГБ / SSD 128 ГБ / Intel UHD Graphics 620 / без ОД / Wi-Fi / Bluetooth / веб-камера / Windows 10 Home 64bit / 2.18 кг',14999,'Mi_Notebook.jpg',1),(3, 'Dell Inspiron 5570','15,6" (1920x1080) TN / Intel Core i5-8250U (1.6 - 3.4 ГГц) / RAM 8 ГБ / HDD 2 ТБ / AMD Radeon 530, 2 ГБ / Bluetooth , Wi-Fi / Без ОС (freeDOS, Linux) / DVD / 2.2 кг',16999,'Dell Inspiron',1 ),(4,'Acer Aspire 3 A315-32','15,6" (1920x1080) / Intel Pentium Silver N5000 (1.1 - 2.7 ГГц) / RAM 8 ГБ / HDD 1 ТБ / Intel UHD Graphics 605 / Bluetooth , Wi-Fi / Без ОС (freeDOS, Linux) / Без ОД / 2.1 кг',9455, 'acer_aspire.jpg',1),(5,'HP 250 G6','15,6" (1366x768) SVA / Intel Pentium Silver N5000 (1.1 - 2.7 ГГц) / RAM 4 ГБ / HDD 500 ГБ / Intel HD Graphics 605 / Bluetooth , Wi-Fi / Без ОС (freeDOS, Linux) / без ОД/ 1.86 кг',7777,'HP_250.jpg', 1),(6, 'Xiaomi Redmi Note 7 4/64GB','Діагональ екрану: 6.3"; Роздільна здатність дисплея: 2340x1080; Камера: 48 Мп + 5 Мп; Кількість ядер: 8; Оперативна пам"ять: 4 Гб',5999,'Xiaomi.jpg',2),(7, 'Samsung Galaxy A50 4/64', 'Діагональ екрану: 6.4"; Роздільна здатність дисплея: 2340x1080; Камера: 25 Мп + 5 Мп + 8 Мп; Кількість ядер: 8; Оперативна пам"ять: 4 Гб',8499,'Samsung_Galaxy.jpg',2),(8,'Huawei P30 Lite 4/128 GB','Діагональ екрану: 6.15"; Роздільна здатність дисплея: 2312x1080; Камера: 48 Мп + 8 Мп + 2 Мп; Кількість ядер: 8; Оперативна пам"ять: 4 Гб',8999,'Huawei.jpg',2),(9,'Honor 8X 4/64 GB','Діагональ екрану: 6.5"; Роздільна здатність дисплея: 2340x1080; Камера: 20 Мп + 2 Мп; Кількість ядер: 8; Оперативна пам"ять: 4 Гб',6499, 'honor_8x_blue.jpg', 2),(10,'Apple iPhone XR 64GB','Діагональ екрану: 6.1"; Роздільна здатність дисплея: 1792x828; Камера: 12 Мп; Кількість ядер: 6; Оперативна пам"ять: 3 Гб',22499,'apple_iphone_xr_black.jpg',2)

```
* ``` npm install mysql --save```  - без этого модуля не будет соединения с базой
* Запуск проекта ```nodemon app.js```
* В случае ошибок выполнить запрос ```ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'здесь пароль';``` в MySQL Workbench
https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
```node.js
let express = require('express');
let app = express();

app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug');

app.listen(3000, function(){
    console.log('node express work on 3000!');
});

// подключаю модуль для соединения с базой данных
let mysql      = require('mysql');
// настройка модуля
let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'market'
});

app.get('/', function (req, res) {
    con.query(
        'SELECT name FROM goods;', // название запроса, далeе ф-я обрабатывающая запрос
        function(err, result){
            if (err) throw err;
            console.log(result);
        }
    )
    res.render('index', {
        name: 'John',
        age: 120
    });
  });
```
