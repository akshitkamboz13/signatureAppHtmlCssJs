const canvas = document.getElementById('signatureCanvas');
        const bgColorInput = document.getElementById('bgColor');
        const penColorInput = document.getElementById('penColor');
        const penWidthInput = document.getElementById('penWidth');
        const clearButton = document.getElementById('clearButton');
        const downloadButton = document.getElementById('downloadButton');
        const lastSavedButton = document.getElementById('lastSavedButton');

        const context = canvas.getContext('2d');

        let isDrawing = false;




        bgColorInput.addEventListener('change', (e) => {
            canvas.style.backgroundColor = e.target.value;
        });
        penColorInput.addEventListener('change', (e) => {
            context.strokeStyle = e.target.value;
            context.fillStyle = e.target.value;
        });
        penWidthInput.addEventListener('change', (e) => {
            context.lineWidth = penWidthInput.value;
        });





        // Drawing
        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            lastX = event.offsetX;
            lastY = event.offsetY;
        });
        canvas.addEventListener('mousemove', (e) => {
            if (isDrawing) {
                context.beginPath();
                context.moveTo(lastX, lastY);
                context.lineTo(event.offsetX, event.offsetY);
                context.stroke();
                lastX = event.offsetX;
                lastY = event.offsetY;
            }
        });
        canvas.addEventListener('mouseup', () => {
            isDrawing = false;
            canvas.removeEventListener('mousemove', onMouseMove);
        });





        clearButton.addEventListener('click', () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        });

        downloadButton.addEventListener('click', () => {
            localStorage.setItem('signature', canvas.toDataURL());

            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = 'Systemmm Signature.png';
            link.click();
        });

        lastSavedButton.addEventListener('click', () => {
            const data = localStorage.getItem('signature');
            const img = new Image();
            img.src = data;
            img.onload = () => {
                context.drawImage(img, 0, 0);
            };
        });