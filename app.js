
let svgFile;

function previewSVG() {
    const fileInput = document.getElementById('uploadButton');
    const reader = new FileReader();
    reader.onload = function(event) {
        svgFile = event.target.result;
        const canvas = new fabric.Canvas('preview');
        fabric.loadSVGFromString(svgFile, function(objects, options) {
            const obj = fabric.util.groupSVGElements(objects, options);
            canvas.add(obj).renderAll();
        });
    };
    reader.readAsText(fileInput.files[0]);
}

function convertSvgToPng() {
    if (!svgFile) {
        alert('Please upload an SVG file first.');
        return;
    }

    const canvas = new fabric.Canvas('preview');
    fabric.loadSVGFromString(svgFile, function(objects, options) {
        const obj = fabric.util.groupSVGElements(objects, options);
        canvas.add(obj).renderAll();
        const pngData = canvas.toDataURL('image/png');
        document.getElementById('downloadButton').href = pngData;
        document.getElementById('downloadButton').style.display = 'block';
    });
}
