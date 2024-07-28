let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");
let messageEl = document.getElementById("message");

function createAndAppendSearchResults(search_results) {
    if (search_results.length < 1) {
        messageEl.textContent = "No Results Found";
        searchResultsEl.textContent = "";
    } else {
        searchResultsEl.textContent = "";
        messageEl.textContent = "";
        for (let result of search_results) {
            let title = result.title;
            let image = result.imageLink;
            let author = result.author;

            let bookcontainerEl = document.createElement("div");
            let imageEl = document.createElement("img");
            let authorEl = document.createElement("p");

            imageEl.setAttribute("src", image);
            imageEl.classList.add("images");
            imageEl.setAttribute('alt', author);
            bookcontainerEl.appendChild(imageEl);
            authorEl.textContent = author;
            bookcontainerEl.classList.add("dimensions");
            bookcontainerEl.appendChild(authorEl);
            searchResultsEl.appendChild(bookcontainerEl);
        }
    }
}

searchInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");

        let searchInputVal = event.target.value;
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputVal;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                createAndAppendSearchResults(search_results);
                spinnerEl.classList.toggle("d-none");
                console.log(jsonData);
            });

    }
})