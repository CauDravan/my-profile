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

async function loadProjects() {

    const response = await fetch("data/projects.json");
    const projects = await response.json();

    const grid = document.getElementById("projectGrid");

    if (!grid) return;

    projects.forEach((project, index) => {

        const number = String(index + 1).padStart(2, "0");

        const card = document.createElement("a");

        card.href = project.url;

        card.className = "project-card";

        card.style.setProperty(
            "--project-color",
            project.color
        );

        card.dataset.search = project.tags;

        card.innerHTML = `
            <div class="card-image">
                <img
                    src="${project.image}"
                    alt="${project.title}"
                    loading="lazy"
                >
            </div>

            <div class="card-info">

                <span class="card-number">
                    ${number}
                </span>

                <h2>
                    ${project.title}
                </h2>

                <p>
                    ${project.description}
                </p>

            </div>
        `;

        grid.appendChild(card);

    });
}

async function loadArt() {

    const response = await fetch("data/art.json");
    const artworks = await response.json();

    const grid = document.getElementById("artGrid");

    if (!grid) return;

    artworks.forEach((art, index) => {

        const number = String(index + 1).padStart(2, "0");

        const item = document.createElement("a");

        item.href = art.url;

        item.className = "art-item";

        item.dataset.search = art.tags;

        item.innerHTML = `
            <img
                src="${art.image}"
                alt="${art.title}"
                loading="lazy"
            >

            <div class="art-overlay">

                <span>${number}</span>

                <div>
                    <strong>
                        ${art.title}
                    </strong>

                    <small>
                        Artwork
                    </small>
                </div>

                <span>↗</span>

            </div>
        `;

        grid.appendChild(item);

    });
}