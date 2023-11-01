document.addEventListener('DOMContentLoaded', function () {
    const dropArea = document.getElementById('drop-area');
    const imageContainer = document.getElementById('image-container');
    const dragImage = document.getElementById('drag-image');
    const fileInput = document.getElementById('file-input');
    const classifyButton = document.getElementById('classify-button');
    const resultDiv = document.getElementById('result');

    fileInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (event) {
                dragImage.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    classifyButton.addEventListener('click', function () {
        if (dragImage.src !== 'placeholder.jpg') {
            
            const formData = new FormData();
            formData.append('image', fileInput.files[0]);

            fetch('http://127.0.0.1:9000', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                resultDiv.innerText = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                resultDiv.innerText = 'API request failed: ' + error;
            });
        }
    });
});
