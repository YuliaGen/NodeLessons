'use strict';

const http = require('http');
let counter1 = 0;
let counter2 = 0;
let counter3 = 0;

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8;");
   
if(req.url === '/') {
    counter1 ++;
res.write(
`<h1>Первая страница </h1>
    <h2> <a href="/about"> для перехода на страницу 2 </a></h2> 
    <br> 
    <p>Вы зашли на страницу ${counter1} раз</p>`);

} else if (req.url === '/about') {
    counter2 ++;
res.write(
`<h1> Вторая страница </h2>
    <h2><a href="/"> На первую страницу </a></h2>
            <br> 
    <p>Вы зашли на страницу ${counter2} раз</p>`);


} else {
    counter3 ++;
res.write(
`<h1>Такой страницы не существует</h1>
<p>Вы зашли на страницу ${counter3}раз </p>`);

}

res.end();
});

const port = 3000;

server.listen(port, () => {
console.log('server on port' + port);
});