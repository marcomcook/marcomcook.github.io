document.addEventListener("DOMContentLoaded", function () {

    fetch("data/publications.json")

        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load publications.json");
            }

            return response.json();
        })

        .then(data => {

            const container =
                document.getElementById("publications");

            container.innerHTML = "";

            // Create one continuous list of publications
            data.publications.forEach((publication, index) => {

                const publicationElement =
                    createPublication(
                        publication,
                        index
                    );

                container.appendChild(
                    publicationElement
                );

            });

        })

        .catch(error => {

            console.error(error);

            document.getElementById("publications").innerHTML = `
                <p class="error">
                    Unable to load publications.
                </p>
            `;

        });

});


function createPublication(publication, index) {

    const article =
        document.createElement("article");

    article.className = "publication";

    // Convert authors array into text
    const authors =
        publication.authors.join(", ");


    // Create the publication
    article.innerHTML = `

        <div class="publication-number">
            ${index + 1}
        </div>

        <div class="publication-content">

            <h3>
                ${publication.title}
            </h3>

            <p class="authors">
                ${authors}
            </p>

            <p class="venue">
                ${publication.venue}, ${publication.year}
            </p>


            <div class="publication-links">

                <button
                    onclick="toggleElement('abstract-${index}')">
                    Abstract
                </button>

                ${
        publication.doi
            ?
            `<a href="${publication.doi}"
                            target="_blank">
                            DOI
                        </a>`
            :
            ""
    }

                <button
                    onclick="toggleElement('bibtex-${index}')">
                    Bib
                </button>

                ${
        publication.pdf
            ?
            `<a href="${publication.pdf}"
                            target="_blank">
                            PDF
                        </a>`
            :
            ""
    }

                ${
        publication.code
            ?
            `<a href="${publication.code}"
                            target="_blank">
                            Code
                        </a>`
            :
            ""
    }

            </div>


            <!-- Abstract -->

            <div
                id="abstract-${index}"
                class="publication-extra">

                <p>
                    ${publication.abstract || ""}
                </p>

            </div>


            <!-- BibTeX -->

            <div
                id="bibtex-${index}"
                class="publication-extra">

                <pre><code>${escapeHTML(
        publication.bibtex || ""
    )}</code></pre>

            </div>

        </div>
    `;

    return article;
}


function toggleElement(id) {

    const element =
        document.getElementById(id);

    if (!element) return;

    if (element.classList.contains("show")) {

        element.classList.remove("show");

    } else {

        element.classList.add("show");

    }

}


function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}