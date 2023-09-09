document.addEventListener("DOMContentLoaded", function() {
    const generateBtn = document.getElementById("generateBtn");
    const svgResult = document.getElementById("svgResult");
    const uploadInput = document.getElementById("uploadInput");
    const colorInput = document.getElementById("colorInput");

    generateBtn.addEventListener('click', function() {
        const file = uploadInput.files[0];
        const colors = colorInput.value;

        if (!file || !colors) {
            alert("Please select an image and specify the number of colors.");
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        fetch('https://api.vectorizer.io/image-vectorize/v1/vectors', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.VECTORIZER_API_KEY}`
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            svgResult.innerHTML = data.svg;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
