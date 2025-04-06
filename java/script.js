const images = document.querySelectorAll("#slider-container img");
const sliderContainer = document.getElementById("slider-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let current = 1; // 0 emas, chunki oldinga clone qo‘shilgan
let paused = false;

// Slider o'lchami
const totalSlides = images.length;
const slideWidth = 100 / totalSlides;

// Dastlabki pozitsiyani o'rnatish
sliderContainer.style.transform = `translateX(-${current * 100}%)`;

const updateSlider = () => {
    sliderContainer.style.transition = "transform 0.5s ease-in-out";
    sliderContainer.style.transform = `translateX(-${current * 100}%)`;
};

// Infinite loop ta'minlash
const checkLoop = () => {
    setTimeout(() => {
        if (current == totalSlides - 1) {
            sliderContainer.style.transition = "none";
            current = 1;
            sliderContainer.style.transform = `translateX(-${current * 100}%)`;
        }
        if (current === 0) {
            sliderContainer.style.transition = "none";
            current = totalSlides - 2;
            sliderContainer.style.transform = `translateX(-${current * 100}%)`;
        }
    }, 500);
};

const nextSlide = () => {
    if (!paused) {
        current++;
        updateSlider();
        checkLoop();
    }
};

const prevSlide = () => {
    current--;
    updateSlider();
    checkLoop();
    pauseSlider();
};

const pauseSlider = () => {
    paused = true;
    setTimeout(() => paused = false, 4000);
};

// Avtomatik aylanish
setInterval(nextSlide, 3000);

// Tugmalar bosilganda
nextBtn.addEventListener("click", () => {
    nextSlide();
    pauseSlider();
});

prevBtn.addEventListener("click", () => {
    prevSlide();
    pauseSlider();
});





const sliders = document.querySelectorAll('[id^="slider"]');
const nextButtons = document.querySelectorAll('[id^="next"]');
const prevButtons = document.querySelectorAll('[id^="prev"]');

const itemWidth = 208 + 26; // Element kengligi + bo‘sh joy
const scrollAmount = itemWidth * 1; // Nechta element siljitish kerak

sliders.forEach((elSlider, index) => {
    const elNext = nextButtons[index];
    const elPrev = prevButtons[index];

    elNext.addEventListener("click", function () {
        if (elSlider.scrollLeft + elSlider.clientWidth >= elSlider.scrollWidth) {
            // Agar oxiriga yetgan bo'lsa, boshiga qaytar
            elSlider.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            elSlider.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    });

    elPrev.addEventListener("click", function () {
        if (elSlider.scrollLeft <= 0) {
            // Agar boshida bo'lsa, oxiriga qaytar
            elSlider.scrollTo({ left: elSlider.scrollWidth, behavior: "smooth" });
        } else {
            elSlider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
    });
});
