document.getElementById("generateBtn").addEventListener("click", async function() {
    const fileInput = document.getElementById("logo");
    const colorsInput = document.getElementById("colors");
    const uploadedImg = document.getElementById("uploadedImg");
    const svgOutput = document.getElementById("svgOutput");

    if (fileInput.files.length === 0) {
        alert("Please upload an image.");
        return;
    }

    if (!colorsInput.value) {
        alert("Please specify the number of colors.");
        return;
    }

    const image = fileInput.files[0];
    const formData = new FormData();
    formData.append("image", image);
    formData.append("max_colors", colorsInput.value);

    const response = await fetch("https://api.vectorizer.io/v1/images", {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${process.env.VECTORIZER_API_KEY}`
        },
        body: formData
    });

    const data = await response.json();

    if (data.success) {
        uploadedImg.src = URL.createObjectURL(image);
        svgOutput.innerHTML = data.svg;
    } else {
        alert("Error vectorizing the logo. Please try again.");
    }
});
