document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const enterButton = document.getElementById("enter-button");
    const contentBox = document.getElementById("content-box");

    enterButton.addEventListener("click", () => {
        // Apply glitch-out animation
        overlay.classList.add("glitch-out");
        setTimeout(() => {
            overlay.style.display = "none"; // Hide overlay after animation
            contentBox.style.display = "block"; // Show content box
            contentBox.classList.add("fade-in");
        }, 1000); // Duration of glitch-out animation
    });
});
