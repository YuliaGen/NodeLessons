const express = require ('express'); //экспорт модуля express
const fs = require('fs'); //экспорт модуля fs для перезаписи файла в котором будет счетчик посещения страниц
const path = require('path'); // эспорт метода который будет помогать работыть с файлами для загрузки сохраненных данных

const app = express();

app.get('/',(req, res) => {
    const pathToFileHome = path.join(__dirname, 'CountMainPage.json');
        const CountMainData = JSON.parse(fs.readFileSync(pathToFileHome, 'utf-8'));
    
        CountMainData.count++;
    
        fs.writeFileSync(pathToFileHome, JSON.stringify(CountMainData));
    res.send(`<h1>Главная страница</h1><p>Просмотров: ${CountMainData.count}</p> <a href='/about'>Ссылка на 2ую страницу</a>`);
});

app.get('/about', (req, res) => {
    const pathToFileAbout = path.join(__dirname, 'CountAboutPage.json');
    const CountAboutData = JSON.parse(fs.readFileSync(pathToFileAbout, 'utf-8'));

    CountAboutData.count++;

    fs.writeFileSync(pathToFileAbout, JSON.stringify(CountAboutData));
    res.send(`<h1>2ая  страница</h1><p>Просмотров: ${CountAboutData.count}</p> <a href='/'>Ссылка на главную страницу</a>`);
});



const port = 3000;
app.listen(port, () => {
        console.log(`Сервер запущен на порту ${port}`);
    });