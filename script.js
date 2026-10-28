const galleryImages = document.querySelectorAll("#gallery img");
const lightbox = document.getElementById("lightbox");
const previewImage = document.getElementById("previewImage");
const imageCaption = document.getElementById("imageCaption");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
let previousFocus = null;

function showImage(index) {
    currentIndex =
        (index + galleryImages.length) % galleryImages.length;

    const selectedImage = galleryImages[currentIndex];

    previewImage.src = selectedImage.src;
    previewImage.alt = selectedImage.alt;
    imageCaption.textContent =
        `${currentIndex + 1} / ${galleryImages.length} — ${selectedImage.alt}`;
}

function openLightbox(index) {
    previousFocus = document.activeElement;
    showImage(index);
    lightbox.hidden = false;
    closeBtn.focus();
}

function closeLightbox() {
    lightbox.hidden = true;
    previewImage.src = "";

    if (previousFocus) {
        previousFocus.focus();
    }
}

galleryImages.forEach((image, index) => {
    image.addEventListener("click", () => {
        openLightbox(index);
    });
});

closeBtn.addEventListener("click", closeLightbox);

prevBtn.addEventListener("click", () => {
    showImage(currentIndex - 1);
});

nextBtn.addEventListener("click", () => {
    showImage(currentIndex + 1);
});

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;

    if (event.key === "Escape") {
        closeLightbox();
    } else if (event.key === "ArrowRight") {
        showImage(currentIndex + 1);
    } else if (event.key === "ArrowLeft") {
        showImage(currentIndex - 1);
    }
});