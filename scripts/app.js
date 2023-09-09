document.addEventListener("DOMContentLoaded", function() {
    console.log("Script Loaded");

    const generateBtn = document.getElementById("generateBtn");

    if (!generateBtn) {
        console.log("Button Not Found");
        return;
    }

    generateBtn.addEventListener("click", async () => {
        console.log("Button Clicked");

        const imageUrl = document.getElementById("imageUrl").value;
        const colors = document.getElementById("colors").value;

        if (!imageUrl) {
            alert("Please provide an image URL.");
            return;
        }

        if (!colors || isNaN(colors) || colors <= 0) {
            alert("Please provide a valid number of colors.");
            return;
        }

        const response = await fetch('https://api.vectorizer.io/v1/vectorize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.VECTORIZER_API_KEY}`
            },
            body: JSON.stringify({
                url: imageUrl,
                max_colors: colors
            })
        });

        if (response.status !== 200) {
            alert("Error vectorizing the image.");
            return;
        }

        const data = await response.json();
        const svgContainer = document.getElementById("svgContainer");
        svgContainer.innerHTML = data.svg;
    });
});
