// ============================================================
// THE COZY REEL — script.js  (v4 — separate spaces)
// Home is clean: no movies, no shows, no search on the home page.
// Movies has its own space, with a movies-only search.
// TV Shows has its own space, and it is empty for now.
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

// ---------- 2. STATE ----------
let activeView = "home";   // home | movies | shows
let movieSearchText = "";

// ---------- 3. FIND THE PARTS OF THE PAGE ----------
const movieGrid = document.getElementById("movieGrid");
const movieResultsCount = document.getElementById("movieResultsCount");
const movieEmptyState = document.getElementById("movieEmptyState");
const movieSearchInput = document.getElementById("movieSearchInput");
const toast = document.getElementById("toast");

// ---------- 4. HELPERS ----------
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ---------- 5. SWITCH SPACE: HOME / MOVIES / TV SHOWS ----------
// Only one space is shown at a time.
function showView(view) {
  activeView = view;
  document.querySelectorAll(".view").forEach((section) => {
    section.classList.toggle("active", section.id === "view-" + view);
  });
  document.querySelectorAll(".nav-btn[data-view]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === view);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (view === "movies") renderMovies();
}

document.querySelectorAll("[data-view]").forEach((el) => {
  el.addEventListener("click", (event) => {
    event.preventDefault();
    showView(el.dataset.view);
  });
});

// ---------- 6. MOVIES — SEARCH MOVIES ONLY ----------
// With TITLES empty, this shows the clean "no movies added yet" message.
// As soon as we add movies, the same code will draw their cards.
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

movieSearchInput.addEventListener("input", () => {
  movieSearchText = movieSearchInput.value.trim().toLowerCase();
  renderMovies();
});

document.getElementById("movieSearchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  movieSearchText = movieSearchInput.value.trim().toLowerCase();
  renderMovies();
  showToast(movieSearchText ? "Searching movies" : "Showing all movies");
});

// ---------- 7. FIRST DRAW ----------
renderMovies();
