document.addEventListener("DOMContentLoaded", () => {

    /*
     * Smooth navigation
     *
     * The website is intentionally kept simple.
     * Most navigation is handled directly by HTML anchors.
     */

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {

            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");
        });
    });

});