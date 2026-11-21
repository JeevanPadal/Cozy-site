// ============================================================
// THE COZY REEL — script.js  (v8 — watch movies)
// Home is index.html — a welcoming page only.
// Movies is movies.html — movies only, with a movies-only search.
// TV Shows is shows.html — shows only, empty for now.
// This script runs on all three pages, so it only touches
// the movies search when that search is on the page.
//
// HOW MOVIES PLAY HERE:
//   Each movie has a youtubeId — the official YouTube video
//   from the makers / their official channel (Highlights Nepal,
//   Baasuri Films, etc.). Clicking a card opens a player on
//   the site and plays that YouTube video. No download links,
//   no pirated copies. Only videos the makers put on YouTube.
// ============================================================

// ---------- 1. THE CATALOGUE ----------
const TITLES = [
  {
    id: 1,
    title: "Pashupati Prasad",
    type: "movie",
    genre: "Drama, Comedy",
    year: 2016,
    minutes: 138,
    rating: 8.6,
    desc: "Pashu comes to Kathmandu to earn money and repay his late father's debt, and finds the city is not what he hoped.",
    youtubeId: "O3GRxW9IkTg",
    youtubeLabel: "Watch trailer",
    youtubeNote: "Official trailer — Highlights Nepal",
  },
  {
    id: 2,
    title: "Kabaddi Kabaddi",
    type: "movie",
    genre: "Romantic Comedy",
    year: 2015,
    minutes: 138,
    rating: 8.0,
    desc: "Kaji's unrequited love for Maiya continues, with a rival and his two friends along for the ride.",
    youtubeId: "fGtgVwNLpKo",
    youtubeLabel: "Watch full movie",
    youtubeNote: "Full movie, officially uploaded — Baasuri Films",
  },
  {
    id: 3,
    title: "Loot",
    type: "movie",
    genre: "Crime, Thriller",
    year: 2012,
    minutes: 121,
    rating: 7.8,
    desc: "Haku Kale and four frustrated men in Kathmandu hatch a plan to rob a bank for quick money.",
    youtubeId: "QUsgST4Zj5Y",
    youtubeLabel: "Watch trailer",
    youtubeNote: "Official trailer — Loot Nepali Film",
  },
  {
    id: 4,
    title: "Chhakka Panja 2",
    type: "movie",
    genre: "Comedy",
    year: 2017,
    minutes: 136,
    rating: 7.5,
    desc: "Raja and his friends are back in this blockbuster Nepali comedy from Deepa Shree Niraula.",
    youtubeId: "I8qrKa5uOOg",
    youtubeLabel: "Watch trailer",
    youtubeNote: "Official trailer — Highlights Nepal (embedding allowed)",
  },
];

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
      const haystack = [item.title, item.genre, item.desc, String(item.year)].join(" ").toLowerCase();
      if (!haystack.includes(movieSearchText)) return false;
    }
    return true;
  });
}

function movieCard(item) {
  const thumb = "https://i.ytimg.com/vi/" + item.youtubeId + "/hqdefault.jpg";
  return (
    '<article class="movie-card" data-id="' + item.id + '" tabindex="0" role="button" aria-label="Watch ' + item.title + '">' +
      '<div class="movie-poster"><img src="' + thumb + '" alt="Poster for ' + item.title + '" loading="lazy">' +
      '<span class="play-badge" aria-hidden="true">▶</span></div>' +
      '<div class="movie-body">' +
        '<h3>' + item.title + '</h3>' +
        '<p class="movie-meta">' + item.year + ' · ' + item.genre + ' · ★ ' + item.rating.toFixed(1) + '</p>' +
        '<p class="movie-desc">' + item.desc + '</p>' +
        '<button class="btn btn-primary watch-btn" type="button" data-id="' + item.id + '">' + item.youtubeLabel + '</button>' +
        '<p class="movie-note">' + item.youtubeNote + '</p>' +
      '</div>' +
    '</article>'
  );
}

function renderMovies() {
  if (!movieGrid || !movieResultsCount || !movieEmptyState) return;
  const movies = TITLES.filter((item) => item.type === "movie");
  const list = getVisibleMovies();

  movieResultsCount.textContent = movies.length === 0
    ? "0 movies added yet"
    : "Showing " + list.length + " of " + movies.length + " movies";

  movieEmptyState.hidden = list.length !== 0;
  if (list.length === 0) {
    movieEmptyState.textContent = movieSearchText
      ? 'No movie matches “' + movieSearchText + '” — try another title, like Pashupati, Kabaddi, Loot or Chhakka.'
      : "No movies added yet. We will add movies together later.";
  }

  movieGrid.innerHTML = list.map(movieCard).join("");
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

// ---------- 3. PLAYER — CLICK A CARD TO WATCH ON THE SITE ----------
const playerModal = document.getElementById("playerModal");
const playerFrame = document.getElementById("playerFrame");
const playerTitle = document.getElementById("playerTitle");
const playerClose = document.getElementById("playerClose");

function openPlayer(item) {
  if (!playerModal || !playerFrame || !item.youtubeId) return;
  playerTitle.textContent = item.title + " (" + item.year + ") — " + item.youtubeLabel;
  playerFrame.src = "https://www.youtube.com/embed/" + item.youtubeId + "?autoplay=1&rel=0";
  playerModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closePlayer() {
  if (!playerModal || !playerFrame) return;
  playerFrame.src = "";
  playerModal.hidden = true;
  document.body.style.overflow = "";
}

if (movieGrid) {
  movieGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".movie-card");
    if (!card) return;
    const item = TITLES.find((m) => m.id === Number(card.dataset.id));
    if (item) openPlayer(item);
  });
  movieGrid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const card = event.target.closest(".movie-card");
    if (!card) return;
    const item = TITLES.find((m) => m.id === Number(card.dataset.id));
    if (item) openPlayer(item);
  });
}

if (playerClose) playerClose.addEventListener("click", closePlayer);
if (playerModal) {
  playerModal.addEventListener("click", (event) => {
    if (event.target === playerModal) closePlayer();
  });
}
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePlayer();
});

// ---------- 4. FIRST DRAW (movies page only) ----------
renderMovies();
