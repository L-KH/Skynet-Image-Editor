const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');

let img = new Image();
let filename = '';

const downloadBtn = document.getElementById('download-btn');
const uploadFile = document.getElementById('upload-file');
const revertBtn = document.getElementById('revert-btn');

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        if (e.target.classList.contains('brightness-add')) {
            Caman('#canvas', img, function () {
                this.brightness(5).render();
            });
        } else if (e.target.classList.contains('brightness-remove')) {
            Caman('#canvas', img, function () {
                this.brightness(-5).render();
            });
        } else if (e.target.classList.contains('contrast-add')) {
            Caman('#canvas', img, function () {
                this.contrast(5).render();
            });
        } else if (e.target.classList.contains('contrast-remove')) {
            Caman('#canvas', img, function () {
                this.contrast(-5).render();
            });
        } else if (e.target.classList.contains('saturation-add')) {
            Caman('#canvas', img, function () {
                this.saturation(5).render();
            });
        } else if (e.target.classList.contains('saturation-remove')) {
            Caman('#canvas', img, function () {
                this.saturation(-5).render();
            });
        } else if (e.target.classList.contains('vibrance-add')) {
            Caman('#canvas', img, function () {
                this.vibrance(5).render();
            });
        } else if (e.target.classList.contains('vibrance-remove')) {
            Caman('#canvas', img, function () {
                this.vibrance(-5).render();
            });
        }
    }
});

revertBtn.addEventListener('click', (e) => {
    Caman('#canvas', img, function () {
        this.revert();
    });
});

downloadBtn.addEventListener('click', (e) => {
    const fileExtention = filename.slice(-4);
    let newFileName;
    if (fileExtention == '.jpg' || fileExtention == '.png') {
        newFileName = filename.substr(0, filename.length - 4) + '-edited.jpg';
    }
    downloadFn(canvas, newFileName);
});
function downloadFn(canvas, fileName) {
    let e;
    const link = document.createElement('a');
    link.download = fileName;
    link.href = canvas.toDataURL('image/jpeg', 0.8);
    e = new MouseEvent('click');
    link.dispatchEvent(e);
}

uploadFile.addEventListener('change', (e) => {
    const file = document.getElementById('upload-file').files[0];
    const reader = new FileReader();
    if (file) {
        filename = file.name;
        reader.readAsDataURL(file)
    }
    reader.addEventListener('load', () => {
        img = new Image()
        img.src = reader.result
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            canvas.removeAttribute('data-caman-id')
        }
    }, false)
})