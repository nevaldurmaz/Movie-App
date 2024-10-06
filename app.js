const API_URL =
"https://api.themoviedb.org/3/movie/popular?api_key=a073e0a2000c91fe2ac37b04fd193338";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
"https://api.themoviedb.org/3/search/movie?api_key=a073e0a2000c91fe2ac37b04fd193338&query=";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    // console.log(data);
    showMovies(data.results || data);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value.trim();
    if (searchTerm && searchTerm !== "") {
        const searchUrl = SEARCH_API + encodeURIComponent(searchTerm);
        getMovies(searchUrl);
        search.value = "";
    } else {
        window.location.reload();
    }
});


function showMovies(movies) {
    main.innerHTML = "";

    if (movies.length === 0) {
        const noResultsMessage = document.createElement("div");
        noResultsMessage.classList.add("no-results");
        noResultsMessage.innerHTML = "<h3>No movies found with that search term!</h3>";
        main.appendChild(noResultsMessage);
        return;
    }

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");

        movieElement.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                  vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
            `;

        main.appendChild(movieElement);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}