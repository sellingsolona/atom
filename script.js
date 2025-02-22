document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const enterButton = document.getElementById("enter-button");
    const contentContainer = document.getElementById("content-container");
    const copyAddressButton = document.getElementById("copy-address");
    const depositAddress = document.getElementById("deposit-address").textContent;
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");
    let currentSlide = 0;

    enterButton.addEventListener("click", () => {
        // Apply glitch-out animation
        overlay.classList.add("glitch-out");
        setTimeout(() => {
            overlay.style.display = "none"; // Hide overlay after animation
            contentContainer.style.display = "flex"; // Show content container
            contentContainer.classList.add("fade-in");
        }, 1000); // Duration of glitch-out animation
    });

    copyAddressButton.addEventListener("click", () => {
        navigator.clipboard.writeText(depositAddress).then(() => {
            copyAddressButton.textContent = "Copied!";
            setTimeout(() => {
                copyAddressButton.textContent = "Copy Address";
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });

    nextBtn.addEventListener("click", () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    });

    prevBtn.addEventListener("click", () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    });
});
