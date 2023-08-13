
document.getElementById('uploadButton').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        svgFile = event.target.result;
    };
    reader.readAsText(e.target.files[0]);
});

let svgFile;

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
