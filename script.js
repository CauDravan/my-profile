document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVBAR
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle(
                "scrolled",
                window.scrollY > 10
            );
        });
    }


    /* =====================================================
       PROJECTS
    ===================================================== */

    loadProjects();


    /* =====================================================
       ART
    ===================================================== */

    loadArt();

});


/* =========================================================
   LOAD PROJECTS
========================================================= */

async function loadProjects() {

    const grid = document.getElementById("projectGrid");

    if (!grid) return;

    try {

        const response = await fetch("data/projects.json");

        if (!response.ok) {
            throw new Error("Failed to load projects.json");
        }

        const projects = await response.json();

        projects.forEach((project, index) => {

            const number = String(index + 1).padStart(2, "0");

            const card = document.createElement("a");

            card.href = project.url;
            card.className = "project-card";

            card.style.setProperty(
                "--project-color",
                project.color || "#ff7fa8"
            );

            card.dataset.search = [
                project.title,
                project.description,
                project.tags,
                project.status
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();


            card.innerHTML = `
                <div class="card-image">
                    <img
                        src="${project.image}"
                        alt="${project.title}"
                        loading="lazy"
                    >
                </div>

                <div class="card-info">

                    <div class="card-topline">

                        <span class="card-number">
                            ${number}
                        </span>

                        ${
                            project.status
                                ? `<span class="card-status">
                                    ${project.status}
                                   </span>`
                                : ""
                        }

                    </div>

                    <h2>
                        ${project.title}
                    </h2>

                    <p>
                        ${project.description || ""}
                    </p>

                    ${
                        project.tags
                            ? `<div class="card-tags">
                                ${project.tags}
                               </div>`
                            : ""
                    }

                </div>
            `;

            grid.appendChild(card);

        });


        setupProjectSearch();

    } catch (error) {

        console.error("Project loading error:", error);

    }
}


/* =========================================================
   PROJECT SEARCH
========================================================= */

function setupProjectSearch() {

    const search = document.getElementById("projectSearch");
    const grid = document.getElementById("projectGrid");
    const noResults = document.getElementById("noProjects");

    if (!search || !grid) return;

    const cards = grid.querySelectorAll(".project-card");

    search.addEventListener("input", () => {

        const query = search.value
            .toLowerCase()
            .trim();

        let visible = 0;

        cards.forEach(card => {

            const data = card.dataset.search || "";

            const match = data.includes(query);

            card.style.display = match ? "" : "none";

            if (match) {
                visible++;
            }

        });

        if (noResults) {
            noResults.classList.toggle(
                "show",
                visible === 0
            );
        }

    });

}


/* =========================================================
   LOAD ART
========================================================= */

async function loadArt() {

    const grid = document.getElementById("artGrid");

    if (!grid) return;

    try {

        const response = await fetch("data/arts.json");

        if (!response.ok) {
            throw new Error("Failed to load arts.json");
        }

        const artworks = await response.json();

        artworks.forEach((art, index) => {

            const number = String(index + 1).padStart(2, "0");

            const item = document.createElement("a");

            item.href = art.url;
            item.className = "art-item";

            item.dataset.search = [
                art.title,
                art.tags
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();


            item.innerHTML = `
                <img
                    src="${art.image}"
                    alt="${art.title}"
                    loading="lazy"
                >

                <div class="art-overlay">

                    <span>
                        ${number}
                    </span>

                    <div>
                        <strong>
                            ${art.title}
                        </strong>

                        <small>
                            Artwork
                        </small>
                    </div>

                    <span>
                        ↗
                    </span>

                </div>
            `;

            grid.appendChild(item);

        });


        setupArtSearch();

    } catch (error) {

        console.error("Art loading error:", error);

    }
}


/* =========================================================
   ART SEARCH
========================================================= */

function setupArtSearch() {

    const search = document.getElementById("artSearch");
    const grid = document.getElementById("artGrid");
    const noResults = document.getElementById("noArt");

    if (!search || !grid) return;

    const items = grid.querySelectorAll(".art-item");

    search.addEventListener("input", () => {

        const query = search.value
            .toLowerCase()
            .trim();

        let visible = 0;

        items.forEach(item => {

            const data = item.dataset.search || "";

            const match = data.includes(query);

            item.style.display = match ? "" : "none";

            if (match) {
                visible++;
            }

        });

        if (noResults) {
            noResults.classList.toggle(
                "show",
                visible === 0
            );
        }

    });

}