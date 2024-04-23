const express = require ('express'); //экспорт модуля express
const fs = require('fs'); //экспорт модуля fs для перезаписи файла в котором будет счетчик посещения страниц
const path = require('path'); // эспорт метода который будет помогать работыть с файлами для загрузки сохраненных данных

const app =express();

app.get('/',(req, res) => {
    const pathToFileHome = path.join(__dirname, 'userCountHome.json');
        const userCountHomeData = JSON.parse(fs.readFileSync(pathToFileHome, 'utf-8'));
    
        userCountHomeData.count = userCountHomeData.count + 1;
    
        fs.writeFileSync(pathToFileHome, JSON.stringify(userCountHomeData));
    res.send(`<h1>Главная страница</h1><p>Просмотров: ${userCountHomeData.count}</p> <a href='/about'>Ссылка на 2ую страницу</a>`);
});

app.get('/about',(req, res) => {
    const pathToFileAbout = path.join(__dirname, 'userCountAbout.json');
    const userCountAboutData = JSON.parse(fs.readFileSync(pathToFileAbout, 'utf-8'));

    userCountAboutData.count = userCountAboutData.count + 1;

    fs.writeFileSync(pathToFileAbout, JSON.stringify(userCountAboutData));
    res.send(`<h1>2ая  страница</h1><p>Просмотров: ${userCountAboutData.count}</p> <a href='/'>Ссылка на главную страницу</a>`);
});



const port = 3000;
app.listen(port, () => {
        console.log(`Сервер запущен на порту ${port}`);
    });


