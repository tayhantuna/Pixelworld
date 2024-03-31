document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    
    const socket = io();

    // Mouse tıklama event'i
    canvas.addEventListener('mousedown', (e) => {
        const pixelData = {
            x: e.offsetX,
            y: e.offsetY,
            color: colorPicker.value
        };
        drawPixel(pixelData);
        sendPixel(pixelData);
    });

    // Sunucudan gelen güncelleme
    socket.on('updateCanvas', (pixelData) => {
        drawPixel(pixelData);
    });

    // Sunucudan gelen ilk pikselleri çiz
    socket.on('initialPixels', (initialPixelDataList) => {
        initialPixelDataList.forEach((pixelData) => {
            drawPixel(pixelData);
        });
    });

    // Pixeli çiz
    function drawPixel(pixelData) {
        ctx.fillStyle = pixelData.color;
        ctx.fillRect(pixelData.x, pixelData.y, 5, 5);
    }

    // Sunucuya pixel gönder
    function sendPixel(pixelData) {
        socket.emit('pixel', pixelData);
    }
});