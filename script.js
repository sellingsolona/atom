document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const enterButton = document.getElementById("enter-button");
    const contentBox = document.getElementById("content-box");
    const copyAddressButton = document.getElementById("copy-address");
    const depositAddress = document.getElementById("deposit-address").textContent;

    enterButton.addEventListener("click", () => {
        // Apply glitch-out animation
        overlay.classList.add("glitch-out");
        setTimeout(() => {
            overlay.style.display = "none"; // Hide overlay after animation
            contentBox.style.display = "block"; // Show content box
            contentBox.classList.add("fade-in");
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
});
