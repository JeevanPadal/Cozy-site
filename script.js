// ============================================================
// THE COZY REEL — script.js  (v9 — TMDB big catalogue)
// Home is index.html — a welcoming page only.
// Movies is movies.html — movies only, with a movies-only search.
// TV Shows is shows.html — shows only, empty for now.
// This script runs on all three pages, so it only touches
// the movies search when that search is on the page.
//
// HOW IT WORKS:
//   1. Baked-in Nepali picks (TITLES) always work — official
//      YouTube videos from the makers, no key needed.
//   2. TMDB is the big catalogue: search, Trending, Bollywood,
//      Hollywood and Disney rows. It needs a FREE TMDB API key.
//      Get one at https://www.themoviedb.org/settings/api
//      (free account, Settings > API), then paste it in
//      TMDB_API_KEY below. Until then the TMDB rows show a
//      note instead of titles — the 4 Nepali movies still play.
//   3. Clicking a TMDB movie fetches its official trailer from
//      TMDB and plays it in the on-site YouTube player.
//      TMDB gives catalogue data / posters / trailers, NOT
//      full movies to stream. Full movies only play where
//      they are officially on YouTube, as in TITLES.
// ============================================================

// ---------- 0. TMDB SETTINGS — PASTE YOUR FREE KEY HERE ----------
const TMDB_API_KEY = ""; // <-- free key from themoviedb.org/settings/api
const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMG = "https://image.tmdb.org/t/p/w500";
const TMDB_IMG_SMALL = "https://image.tmdb.org/t/p/w342";

// ---------- 1. THE CATALOGUE — BAKED-IN NEPALI PICKS ----------
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
const tmdbNotice = document.getElementById("tmdbNotice");
const tmdbRows = document.getElementById("tmdbRows");

let movieSearchText = "";

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function esc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
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
    '<article class="movie-card" data-id="' + item.id + '" tabindex="0" role="button" aria-label="Watch ' + esc(item.title) + '">' +
      '<div class="movie-poster"><img src="' + thumb + '" alt="Poster for ' + esc(item.title) + '" loading="lazy">' +
      '<span class="play-badge" aria-hidden="true">▶</span></div>' +
      '<div class="movie-body">' +
        '<h3>' + esc(item.title) + '</h3>' +
        '<p class="movie-meta">' + item.year + ' · ' + esc(item.genre) + ' · ★ ' + item.rating.toFixed(1) + '</p>' +
        '<p class="movie-desc">' + esc(item.desc) + '</p>' +
        '<button class="btn btn-primary watch-btn" type="button" data-id="' + item.id + '">' + esc(item.youtubeLabel) + '</button>' +
        '<p class="movie-note">' + esc(item.youtubeNote) + '</p>' +
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
    : "Showing " + list.length + " of " + movies.length + " Nepali picks";

  movieEmptyState.hidden = list.length !== 0;
  if (list.length === 0) {
    movieEmptyState.textContent = movieSearchText
      ? 'No Nepali pick matches “' + movieSearchText + '” — try the big TMDB search above once a key is added, or try Pashupati, Kabaddi, Loot or Chhakka.'
      : "No movies added yet. We will add movies together later.";
  }

  movieGrid.innerHTML = list.map(movieCard).join("");
}

// ---------- 3. TMDB — BIG CATALOGUE (NEEDS A FREE KEY) ----------
async function tmdbFetch(path) {
  if (!TMDB_API_KEY) return null;
  try {
    const sep = path.includes("?") ? "&" : "?";
    const res = await fetch(TMDB_BASE + path + sep + "api_key=" + encodeURIComponent(TMDB_API_KEY));
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

function tmdbCard(m) {
  const year = (m.release_date || "").slice(0, 4) || "—";
  const rating = typeof m.vote_average === "number" ? m.vote_average.toFixed(1) : "—";
  const poster = m.poster_path
    ? TMDB_IMG + m.poster_path
    : "https://i.ytimg.com/vi/O3GRxW9IkTg/hqdefault.jpg";
  const overview = (m.overview || "No description on TMDB yet.").slice(0, 140);
  return (
    '<article class="movie-card tmdb-card" data-tmdb-id="' + m.id + '" tabindex="0" role="button" aria-label="Watch trailer for ' + esc(m.title) + '">' +
      '<div class="movie-poster"><img src="' + poster + '" alt="Poster for ' + esc(m.title) + '" loading="lazy">' +
      '<span class="play-badge" aria-hidden="true">▶</span></div>' +
      '<div class="movie-body">' +
        '<h3>' + esc(m.title) + '</h3>' +
        '<p class="movie-meta">' + year + ' · ★ ' + rating + ' · TMDB</p>' +
        '<p class="movie-desc">' + esc(overview) + '</p>' +
        '<button class="btn btn-primary watch-btn" type="button" data-tmdb-id="' + m.id + '">Watch trailer</button>' +
        '<p class="movie-note">Trailer from TMDB — full movie only where officially free</p>' +
      '</div>' +
    '</article>'
  );
}

function renderRow(gridId, movies) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = (movies || []).slice(0, 6).map(tmdbCard).join("");
}

async function loadTmdbRows() {
  if (!tmdbNotice || !tmdbRows) return;
  if (!TMDB_API_KEY) {
    tmdbNotice.hidden = false;
    tmdbRows.hidden = true;
    return;
  }
  tmdbNotice.hidden = true;
  tmdbRows.hidden = false;
  const [trending, bollywood, hollywood, disney] = await Promise.all([
    tmdbFetch("/trending/movie/week"),
    tmdbFetch("/discover/movie?with_original_language=hi&sort_by=popularity.desc"),
    tmdbFetch("/discover/movie?with_original_language=en&sort_by=popularity.desc"),
    tmdbFetch("/discover/movie?with_companies=2&sort_by=popularity.desc"),
  ]);
  renderRow("trendingGrid", trending && trending.results);
  renderRow("bollywoodGrid", bollywood && bollywood.results);
  renderRow("hollywoodGrid", hollywood && hollywood.results);
  renderRow("disneyGrid", disney && disney.results);
  if (!trending && !bollywood && !hollywood && !disney) {
    tmdbNotice.hidden = false;
    tmdbNotice.textContent = "TMDB did not answer — check the API key in script.js, then refresh.";
    tmdbRows.hidden = true;
  }
}

async function searchTmdb(query) {
  const data = await tmdbFetch("/search/movie?query=" + encodeURIComponent(query));
  if (!data || !data.results) return false;
  if (!movieGrid) return false;
  movieGrid.innerHTML = data.results.slice(0, 12).map(tmdbCard).join("");
  if (movieResultsCount) movieResultsCount.textContent = "Showing " + Math.min(12, data.results.length) + " TMDB results for “" + query + "”";
  if (movieEmptyState) movieEmptyState.hidden = data.results.length !== 0;
  if (tmdbRows) tmdbRows.hidden = true;
  return true;
}

async function runSearch() {
  movieSearchText = movieSearchInput ? movieSearchInput.value.trim().toLowerCase() : "";
  if (movieSearchText && TMDB_API_KEY) {
    const found = await searchTmdb(movieSearchText);
    if (found) { showToast("Searching TMDB"); return; }
  }
  renderMovies();
  if (tmdbRows && TMDB_API_KEY) tmdbRows.hidden = !!movieSearchText;
  showToast(movieSearchText ? "Searching movies" : "Showing all movies");
}

if (movieSearchInput) {
  movieSearchInput.addEventListener("input", () => {
    if (!TMDB_API_KEY) { movieSearchText = movieSearchInput.value.trim().toLowerCase(); renderMovies(); }
  });
}

if (movieSearchForm) {
  movieSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    runSearch();
  });
}

// ---------- 4. PLAYER — CLICK A CARD TO WATCH ON THE SITE ----------
const playerModal = document.getElementById("playerModal");
const playerFrame = document.getElementById("playerFrame");
const playerTitle = document.getElementById("playerTitle");
const playerClose = document.getElementById("playerClose");

function openPlayerByYoutubeId(title, youtubeId, label) {
  if (!playerModal || !playerFrame || !youtubeId) return;
  playerTitle.textContent = title + " — " + label;
  playerFrame.src = "https://www.youtube.com/embed/" + youtubeId + "?autoplay=1&rel=0";
  playerModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function openPlayer(item) {
  if (!item.youtubeId) return;
  openPlayerByYoutubeId(item.title + " (" + item.year + ")", item.youtubeId, item.youtubeLabel);
}

async function openTmdbPlayer(tmdbId, title) {
  const data = await tmdbFetch("/movie/" + tmdbId + "/videos");
  const videos = (data && data.results) || [];
  const trailer = videos.find((v) => v.site === "YouTube" && v.type === "Trailer")
    || videos.find((v) => v.site === "YouTube");
  if (!trailer) { showToast("No trailer on TMDB for this title yet"); return; }
  openPlayerByYoutubeId(title, trailer.key, "Watch trailer");
}

function closePlayer() {
  if (!playerModal || !playerFrame) return;
  playerFrame.src = "";
  playerModal.hidden = true;
  document.body.style.overflow = "";
}

function handleCardClick(card) {
  if (!card) return;
  if (card.dataset.tmdbId) {
    const titleEl = card.querySelector("h3");
    openTmdbPlayer(Number(card.dataset.tmdbId), titleEl ? titleEl.textContent : "Movie");
    return;
  }
  const item = TITLES.find((m) => m.id === Number(card.dataset.id));
  if (item) openPlayer(item);
}

if (movieGrid) {
  movieGrid.addEventListener("click", (event) => handleCardClick(event.target.closest(".movie-card")));
  movieGrid.addEventListener("keydown", (event) => {
    if (event.key === "Enter") handleCardClick(event.target.closest(".movie-card"));
  });
}

if (tmdbRows) {
  tmdbRows.addEventListener("click", (event) => handleCardClick(event.target.closest(".movie-card")));
  tmdbRows.addEventListener("keydown", (event) => {
    if (event.key === "Enter") handleCardClick(event.target.closest(".movie-card"));
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

// ---------- 5. FIRST DRAW (movies page only) ----------
renderMovies();
loadTmdbRows();
