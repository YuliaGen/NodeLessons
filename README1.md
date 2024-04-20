Комментарий преподавателя:

Вячеслав Лихачев・Преподаватель
Здравствуйте, Юлия
В тег a необязательно передавать полный путь, достаточно относительного / и /about
Обработчики разных роутов можно вынести в самостоятельные функции, чтобы не захламлять коллбэк createServer


'use strict';

    const http = require('http');
    let counter1 = 0;
    let counter2 = 0;
    let counter3 = 0;

    const server = http.createServer((req, res) => {
       
    if(req.url === '/') {
        counter1 = counter1+1;
    res.writeHead(200, {
    'Content-Type': 'text/html; charset=UTF-8'
    });
   
    res.end(
        `<h1>Первая страница </h1>
        <h2> <a href="http://127.0.0.1:3000/about"> для перехода на страницу 2 </a></h2> 
        <br> 
        <p>Вы зашли на страницу ${counter1} раз</p>`);
    
    } else if (req.url === '/about') {
        counter2++;
    res.writeHead(200, {
    'Content-Type': 'text/html; charset=UTF-8'
    });
   
    res.end(
        `<h1> Вторая страница </h2>
        <h2><a href="http://127.0.0.1:3000"> На первую страницу </a></h2>
                <br> 
        <p>Вы зашли на страницу ${counter2} раз</p>`);
    } else {
    res.writeHead(404, {
    'Content-Type': 'text/html; charset=UTF-8'
    });
    counter3 ++;
    res.end(`<h1>Такой страницы не существует</h1>
    <p>Вы зашли на страницу ${counter3}раз </p>`);
    }
    });

    const port = 3000;

    server.listen(port, () => {
    console.log('server on port' + port);
    });
