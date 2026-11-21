// ============================================================
// THE COZY REEL — script.js  (v5 — separate pages)
// Home is index.html — a welcoming page only.
// Movies is movies.html — movies only, with a movies-only search.
// TV Shows is shows.html — shows only, empty for now.
// This script runs on all three pages, so it only touches
// the movies search when that search is on the page.
//
// WHERE MOVIES WILL GO LATER:
//   Add them to the TITLES list below, one entry per movie.
//   An example is shown in the comment — it is commented out,
//   so it does not appear on the site yet.
//
//   /*
//   {
//     id: 1,
//     title: "Example Movie",
//     type: "movie",
//     genre: "Comedy",
//     year: 2024,
//     minutes: 120,
//     rating: 4.5,
//     desc: "One line about this movie."
//   },
//   */
//
// Until then, the movies search simply shows "no movies added yet".
// ============================================================

// ---------- 1. THE CATALOGUE — EMPTY FOR NOW ----------
const TITLES = [];

// ---------- 2. MOVIES SEARCH — ONLY ON movies.html ----------
const movieGrid = document.getElementById("movieGrid");
const movieResultsCount = document.getElementById("movieResultsCount");
const movieEmptyState = document.getElementById("movieEmptyState");
const movieSearchInput = document.getElementById("movieSearchInput");
const movieSearchForm = document.getElementById("movieSearchForm");
const toast = document.getElementById("toast");

let movieSearchText = "";

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function getVisibleMovies() {
  return TITLES.filter((item) => {
    if (item.type !== "movie") return false;
    if (movieSearchText) {
      const haystack = [item.title, item.genre, item.desc].join(" ").toLowerCase();
      if (!haystack.includes(movieSearchText)) return false;
    }
    return true;
  });
}

function renderMovies() {
  if (!movieGrid || !movieResultsCount || !movieEmptyState) return;
  const movies = TITLES.filter((item) => item.type === "movie");
  const list = getVisibleMovies();

  movieResultsCount.textContent = movies.length === 0
    ? "0 movies added yet"
    : "Showing " + list.length + " of " + movies.length + " movies";

  movieEmptyState.hidden = list.length !== 0;
  if (movies.length === 0) {
    movieEmptyState.textContent = movieSearchText
      ? "No movies added yet, so there is nothing to match “" + movieSearchText + "” — we will add movies together later."
      : "No movies added yet. We will add movies together later.";
  }

  // No card HTML here yet — cards are created only when TITLES has entries.
  movieGrid.innerHTML = "";
}

if (movieSearchInput) {
  movieSearchInput.addEventListener("input", () => {
    movieSearchText = movieSearchInput.value.trim().toLowerCase();
    renderMovies();
  });
}

if (movieSearchForm) {
  movieSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    movieSearchText = movieSearchInput.value.trim().toLowerCase();
    renderMovies();
    showToast(movieSearchText ? "Searching movies" : "Showing all movies");
  });
}

// ---------- 3. FIRST DRAW (movies page only) ----------
renderMovies();
