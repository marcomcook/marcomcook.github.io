document.addEventListener("DOMContentLoaded", function () {

    fetch("data/news.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load news.json");
            }

            return response.json();
        })

        .then(news => {

            const container = document.getElementById("news");

            if (!container) {
                console.error("Element with id='news' not found.");
                return;
            }

            container.innerHTML = "";

            news.forEach(item => {

                const newsEntry = document.createElement("div");
                newsEntry.className = "news-entry";

                const date = document.createElement("div");
                date.className = "news-date";
                date.textContent = item.date;

                const text = document.createElement("div");
                text.className = "news-text";
                text.textContent = item.text;

                newsEntry.appendChild(date);
                newsEntry.appendChild(text);

                container.appendChild(newsEntry);
            });

        })

        .catch(error => {
            console.error("Error loading news:", error);
        });

});