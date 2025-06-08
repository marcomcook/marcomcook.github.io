// Dark Mode Toggle
document.getElementById('toggle-mode').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Load and parse BibTeX file
fetch('publications.bib')
  .then(response => response.text())
  .then(bibtexText => {
    const entries = bibtexParse.toJSON(bibtexText);
    window.publications = entries.map(entry => ({
      title: entry.entryTags.title || 'Untitled',
      authors: entry.entryTags.author || 'Unknown Author',
      journal: entry.entryTags.journal || entry.entryTags.booktitle || '',
      year: entry.entryTags.year || '',
      links: {
        doi: entry.entryTags.doi ? `https://doi.org/${entry.entryTags.doi}` : null,
        pdf: entry.entryTags.url || null
      }
    }));
    renderPublications();
  })
  .catch(error => {
    console.error("Failed to load BibTeX:", error);
  });

// Render function
function renderPublications(filter = "") {
  const list = document.getElementById("pub-list");
  list.innerHTML = "";

  window.publications
    .filter(pub => {
      const text = `${pub.title} ${pub.authors} ${pub.journal} ${pub.year}`.toLowerCase();
      return text.includes(filter.toLowerCase());
    })
    .forEach(pub => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${pub.authors}</strong>. "<em>${pub.title}</em>."
        ${pub.journal}, ${pub.year}.
        ${pub.links.pdf ? `[<a href="${pub.links.pdf}">PDF</a>]` : ""}
        ${pub.links.doi ? `[<a href="${pub.links.doi}">DOI</a>]` : ""}
      `;
      list.appendChild(li);
    });
}

// Search handler
document.getElementById("pub-search").addEventListener("input", e => {
  renderPublications(e.target.value);
});
