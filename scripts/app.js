document.addEventListener("DOMContentLoaded", function() {
    let generateBtn = document.getElementById("generateBtn");

    if (generateBtn) {
        generateBtn.addEventListener("click", function() {
            let imageInput = document.getElementById("imageInput");
            let colorInput = document.getElementById("colorsInput");
            let outputArea = document.getElementById("outputArea");
            
            if (imageInput.files.length === 0) {
                alert("Please upload an image first!");
                return;
            }

            if (colorInput.value === "") {
                alert("Please specify the number of colors!");
                return;
            }

            let formData = new FormData();
            formData.append("image", imageInput.files[0]);
            formData.append("max_colors", colorInput.value);

            fetch("https://api.vectorizer.io/v1/image-to-svg", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${process.env.VECTORIZER_API_KEY}`
                },
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                outputArea.innerHTML = data;
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                alert("An error occurred. Please try again later.");
            });
        });
    }
});
