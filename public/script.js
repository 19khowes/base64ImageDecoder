const decodeButton = document.getElementById('decode');
const base64Image = document.getElementById('base64-image');
const stringInput = document.getElementById('string-input');

decodeButton.addEventListener('click', () => {
    console.log('decoding');

    let canString = stringInput.value;

    let file = dataURItoBlob(canString, 'image/png');

    console.log(file);

    // take file (blob) and add into image src
    let urlCreator = window.URL || window.webkitURL;

    let imageURL = urlCreator.createObjectURL(file);

    base64Image.src = imageURL;
});

function dataURItoBlob(dataURI, type) {
    // convert base64 to raw binary data held in a string
    let byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    let bb = new Blob([ab], {
        type: type
    });
    return bb;
}