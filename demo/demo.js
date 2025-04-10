import {EXIF} from "../dist/exif-esm.js";

function initTestUploadFile() {
    const fileSelect = document.getElementById("fileSelect");
    const fileElem = document.getElementById("fileElem");
    fileSelect.addEventListener("click", (e) => {
            if (fileElem) { fileElem.click(); }
            e.preventDefault(); // prevent navigating to href-address
        }
    );
    const createImgElement = (file) => {
        const img = document.createElement("img");
        img.classList.add("menu-image");
        img.src = URL.createObjectURL(file);
        return img;
    }
    fileElem.addEventListener("change", async (event) => {
        const files = event.target.files;
        if(files.length === 1) {
            const img = createImgElement(files[0]);
            const imageInfo = await EXIF.getData(img);
            console.log(EXIF.getAllTags(imageInfo));
            document.getElementById('demo4-container').prepend(img);
            document.getElementById('demo4-exif').textContent = EXIF.pretty(imageInfo)
        }
    });
}

async function testNormalImageElement() {
    const img = document.getElementById("demo1");
    const imageInfo = await EXIF.getData(img);
    console.log('testNormalImageElement', EXIF.getAllTags(imageInfo));
    document.getElementById("demo1-exif").textContent = EXIF.pretty(imageInfo);
}

async function testBase64Image() {
    const img = document.getElementById("demo2");
    const imageInfo = await EXIF.getData(img);
    console.log('testBase64Image', EXIF.getAllTags(imageInfo));
    document.getElementById("demo2-exif").textContent = EXIF.pretty(imageInfo);
}

async function testObjectUrl() {
    const src = 'dsc_09827.jpg';
    const response = await fetch(src, {method: "GET"});
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const testImage = new Image();
    testImage.src = objectUrl;
    const imageInfo = await EXIF.getData(testImage);
    console.log("testObjectUrl", EXIF.getAllTags(imageInfo) );
    document.getElementById("demo3-container").prepend(testImage);
    document.getElementById("demo3-exif").textContent = EXIF.pretty(imageInfo);
    URL.revokeObjectURL(objectUrl); // if we don't need objectUrl anymore, we can free memory from it
}


window.addEventListener("load", async () => {
    initTestUploadFile();
    await testNormalImageElement(); // work
    await testBase64Image(); // work
    await testObjectUrl();
});
