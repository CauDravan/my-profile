document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVBAR
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    if (navbar) {
        window.addEventListener("scroll", () => {

            if (window.scrollY > 10) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        });
    }


    /* =====================================================
       PROJECT SEARCH
    ===================================================== */

    const projectSearch = document.getElementById("projectSearch");

    if (projectSearch) {

        const cards = document.querySelectorAll(".project-card");
        const noProjects = document.getElementById("noProjects");

        projectSearch.addEventListener("input", () => {

            const query = projectSearch.value
                .toLowerCase()
                .trim();

            let visibleCards = 0;

            cards.forEach(card => {

                const searchData =
                    card.dataset.search.toLowerCase();

                if (searchData.includes(query)) {

                    card.style.display = "";

                    visibleCards++;

                } else {

                    card.style.display = "none";

                }

            });


            if (visibleCards === 0) {
                noProjects.classList.add("show");
            } else {
                noProjects.classList.remove("show");
            }

        });

    }


    /* =====================================================
       ART SEARCH
    ===================================================== */

    const artSearch = document.getElementById("artSearch");

    if (artSearch) {

        const cards = document.querySelectorAll(".art-card");
        const noArt = document.getElementById("noArt");

        artSearch.addEventListener("input", () => {

            const query = artSearch.value
                .toLowerCase()
                .trim();

            let visibleCards = 0;

            cards.forEach(card => {

                const searchData =
                    card.dataset.search.toLowerCase();

                if (searchData.includes(query)) {

                    card.style.display = "";

                    visibleCards++;

                } else {

                    card.style.display = "none";

                }

            });


            if (visibleCards === 0) {
                noArt.classList.add("show");
            } else {
                noArt.classList.remove("show");
            }

        });

    }

});