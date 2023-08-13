
let svgFile;

function previewSVG() {
    const fileInput = document.getElementById('uploadButton');
    const reader = new FileReader();
    reader.onload = function(event) {
        svgFile = event.target.result;
        document.getElementById('preview').innerHTML = svgFile; // Displaying the SVG
    };
    reader.readAsText(fileInput.files[0]);
}

function convertSvgToPng() {
    if (!svgFile) {
        alert('Please upload an SVG file first.');
        return;
    }

    const canvas = document.createElement('canvas');
    canvg.default(canvas, svgFile);

    const pngData = canvas.toDataURL('image/png');
    document.getElementById('downloadButton').href = pngData;
    document.getElementById('downloadButton').style.display = 'block';
}
