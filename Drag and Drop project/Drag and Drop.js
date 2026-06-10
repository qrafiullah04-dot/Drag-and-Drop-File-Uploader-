const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("img-view");
const browseBtn = document.getElementById("browse-btn");
const submitBtn = document.getElementById("submit-btn");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const errorMsg = document.getElementById("error-msg");

let selectedFile = null; 

browseBtn.addEventListener("click", () => {
    inputFile.click();
});

inputFile.addEventListener("change", () => {
    selectedFile = inputFile.files[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
        errorMsg.textContent = "Only image files allowed!";
        selectedFile = null;
        return;
    }

    errorMsg.textContent = "";

    const imgURL = URL.createObjectURL(selectedFile);

    imageView.style.backgroundImage = `url(${imgURL})`;
    imageView.style.backgroundSize = "cover";
    imageView.style.backgroundPosition = "center";
    imageView.innerHTML = "";
});

submitBtn.addEventListener("click", () => {

    if (!selectedFile) {
        errorMsg.textContent = "Please select an image first!";
        return;
    }

    startUpload(selectedFile);
});

function startUpload(file) {

    let progress = 0;

    submitBtn.disabled = true;
    errorMsg.textContent = "";

    progressBar.style.width = "0%";
    progressText.textContent = "0%";

    const interval = setInterval(() => {

        progress += 5;

        progressBar.style.width = progress + "%";
        progressText.textContent = progress + "%";

        if (progress >= 100) {

            clearInterval(interval);

            submitBtn.disabled = false;

            const finalURL = URL.createObjectURL(file);

            imageView.style.backgroundImage = `url(${finalURL})`;
            imageView.style.backgroundSize = "cover";
            imageView.style.backgroundPosition = "center";
            imageView.innerHTML = "";

        }

    }, 80);
}