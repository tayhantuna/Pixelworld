const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Depolamak için bir dizi oluştur
let pixelDataList = [];

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Bir kullanıcı bağlandı');

    // Yeni kullanıcıya mevcut pikselleri gönder
    socket.emit('initialPixels', pixelDataList);

    // Kullanıcıdan gelen pixel bilgilerini al ve diğer istemcilere gönder
    socket.on('pixel', (pixelData) => {
        pixelDataList.push(pixelData); // Veriyi depola
        io.emit('updateCanvas', pixelData); // Diğer istemcilere güncellemeyi gönder
    });

    // Bağlantı kesildiğinde
    socket.on('disconnect', () => {
        console.log('Bir kullanıcı ayrıldı');
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});