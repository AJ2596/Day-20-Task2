document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const resultsContainer = document.getElementById("results");

  searchButton.addEventListener("click", function () {
    const query = searchInput.value.trim();
    if (query !== "") {
      searchBooks(query);
    }
  });

  function searchBooks(query) {
    const apiUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(
      query
    )}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => displayResults(data))
      .catch((error) => console.error("Error:", error));
  }

  function displayResults(data) {
    resultsContainer.innerHTML = "";

    if (data && data.docs && data.docs.length > 0) {
      data.docs.forEach((book) => {
        const title = book.title || "Untitled";
        const authors = book.author_name
          ? book.author_name.join(", ")
          : "Unknown";
        const editionCount = book.edition_count || 0;
        const coverId = book.cover_i || null;

        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
                  <h2>${title}</h2>
                  <p><strong>Authors:</strong> ${authors}</p>
                  <p><strong>Edition Count:</strong> ${editionCount}</p>
              `;

        if (coverId) {
          const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
          const coverImg = document.createElement("img");
          coverImg.src = coverUrl;
          coverImg.alt = title;
          bookDiv.appendChild(coverImg);
        }

        resultsContainer.appendChild(bookDiv);
      });
    } else {
      resultsContainer.innerHTML = "<p>No results found.</p>";
    }
  }
});
