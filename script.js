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
//      Hollywood and Disney rows. The catalogue in TMDB_CATALOGUE
//      was baked in by Muse using the TMDB connector (free key
//      held securely, never in this file), so the rows work
//      with no key on the live site. TMDB_API_KEY below is only
//      for live TMDB search in the browser, if ever added.
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

// TMDB catalogue baked in by Muse via the TMDB connector on 2026-11-22.
// Posters/trailers from TMDB; no API key is exposed on the live site.
const TMDB_CATALOGUE = {"trending": [{"id": 1368337, "title": "The Odyssey", "year": "2026", "rating": 8.0, "overview": "Odysseus, the legendary King of Ithaca, embarks on a long and perilous journey home following the Trojan War. Throughout his voyage, he is f", "poster": "/5rhTDKUhPYvpdQIijFIs5VoWsON.jpg", "youtubeId": "AyIZ9tiiN8I"}, {"id": 1300968, "title": "The Hunger Games: Sunrise on the Reaping", "year": "2026", "rating": 7.6, "overview": "Return to the world of Panem 24 years before Katniss Everdeen volunteers in her sister's place, commencing on the morning of the reaping of ", "poster": "/jNcZH8yplxttRlf0wwqfGGMKHxX.jpg", "youtubeId": "Dr060OLTodE"}, {"id": 1003596, "title": "Avengers: Doomsday", "year": "2026", "rating": 0, "overview": "Beloved heroes from three distinct universes are set on a deadly collision course and face an existential threat unlike anything they've eve", "poster": "/cWXtJhrlruF8CeYuaBGE8vdj3Q9.jpg", "youtubeId": "X1aFkAkFASk"}, {"id": 1185344, "title": "The Beast", "year": "2026", "rating": 4.9, "overview": "When a militia of unidentified hostiles coordinates a coup against the United States, the president must fight back by utilizing the highly ", "poster": "/ocg5JfJP19fodcv5uQUApkmZMdI.jpg", "youtubeId": "5ckqV_uf8E0"}, {"id": 1595124, "title": "Steps", "year": "2026", "rating": 6.6, "overview": "After being blamed for disrupting the Royal Ball with a stolen magic wand, a misunderstood stepsister accidentally turns her sister into a f", "poster": "/jtfCcWZ3ZyKdgi0u7JVOxEOSSJP.jpg", "youtubeId": "tNV4i3BqUGY"}], "bollywood": [{"id": 656908, "title": "Ramayana: Rise of a Legend", "year": "2026", "rating": 7.4, "overview": "An ancient epic follows a young prince and princess whose marriage and subsequent exile mark the beginning of a legendary journey. Their sto", "poster": "/vBQ7wks68OhJKlb3RnXSl2yXBXK.jpg", "youtubeId": "AYkPRN874m8"}, {"id": 1453407, "title": "Gajab Raat", "year": "2026", "rating": 6.1, "overview": "A corrupt, troubled cop's night spirals out of control when a reluctant act of mercy toward an injured girl pulls him into a deadly web of c", "poster": "/e4N7M52cBbyi24xLga8yI6yt1u1.jpg", "youtubeId": "BwFuJbHNE4o"}, {"id": 1389172, "title": "Reporting Live", "year": "2026", "rating": 7.1, "overview": "A young reporter and her reluctant cameraman chase a story, only to get entangled in an illegal sand-mining racket run by a ruthless syndica", "poster": "/xVabS4lTi6IMscr2FOucxydE6ZD.jpg", "youtubeId": "GgGNG9XEJds"}, {"id": 1215889, "title": "Daayra", "year": "2026", "rating": 6.4, "overview": "Raman, who has had a shady record with staged encounters and police brutality, finds himself cornered as Ajooni challenges him on every step", "poster": "/eAsR8oCZGCOqaxDVt0c0WrRFjrn.jpg", "youtubeId": "nb4Qb89zgmU"}, {"id": 1291608, "title": "Dhurandhar", "year": "2025", "rating": 7.3, "overview": "In the early 2000s, an undercover operative infiltrates Karachi's underworld, breaking into its inner circle to dismantle a violent nexus fr", "poster": "/8FHOtUpNIk5ZPEay2N2EY5lrxkv.jpg", "youtubeId": "o--C7AH5SuI"}, {"id": 1493572, "title": "Parivarik ManuRanjan", "year": "2026", "rating": 5.3, "overview": "Ranjan Dubey, Lucknow's most eligible bachelor, finds his search for a bride taking an unexpected turn when Helen, his charming new househel", "poster": "/2gKGkD0pN2Ss9LrHA6tv5hEjHOs.jpg", "youtubeId": "ym4y_aPk0io"}], "hollywood": [{"id": 1726, "title": "Iron Man", "year": "2008", "rating": 7.7, "overview": "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.", "poster": "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg", "youtubeId": "8ugaeA-nMTc"}, {"id": 1368337, "title": "The Odyssey", "year": "2026", "rating": 8.0, "overview": "Odysseus, the legendary King of Ithaca, embarks on a long and perilous journey home following the Trojan War. Throughout his voyage, he is f", "poster": "/5rhTDKUhPYvpdQIijFIs5VoWsON.jpg", "youtubeId": "AyIZ9tiiN8I"}, {"id": 1263337, "title": "Heart of the Beast", "year": "2026", "rating": 7.8, "overview": "After a harrowing plane crash, Special Forces officer James Belmont and his combat dog, Odin, find themselves stranded deep in the Alaskan w", "poster": "/6sYemVUn79UPKz1ZsSG6kPU4RVy.jpg", "youtubeId": "UkMuGKqAux4"}, {"id": 1300968, "title": "The Hunger Games: Sunrise on the Reaping", "year": "2026", "rating": 7.7, "overview": "Return to the world of Panem 24 years before Katniss Everdeen volunteers in her sister's place, commencing on the morning of the reaping of ", "poster": "/jNcZH8yplxttRlf0wwqfGGMKHxX.jpg", "youtubeId": "Dr060OLTodE"}, {"id": 1400837, "title": "Other Mommy", "year": "2026", "rating": 6.5, "overview": "Young Bela forms a relationship with a sinister entity in her home that looks uncannily like her own mother, drawing her into a terrifying a", "poster": "/fGRNCssTRrhYZxNzykGGCoMsAVq.jpg", "youtubeId": "-mnTITqqiT0"}, {"id": 969681, "title": "Spider-Man: Brand New Day", "year": "2026", "rating": 8.5, "overview": "Fighting crime full-time as Spider-Man in a world that doesn't remember him—and the pressure of seeing his old friends move on without him—s", "poster": "/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg", "youtubeId": "P3uI5sLosKU"}], "disney": [{"id": 1108427, "title": "Moana", "year": "2026", "rating": 7.4, "overview": "Teenage Moana answers the Ocean's call and, for the first time, voyages beyond the reef of her island of Motunui with infamous demigod Maui ", "poster": "/gaet1xQ2nxrG0V1Ep9T20ZMNEIC.jpg", "youtubeId": "EEz5xbzYPKI"}, {"id": 8587, "title": "The Lion King", "year": "1994", "rating": 8.2, "overview": "Young lion prince Simba, eager to one day become king of the Pride Lands, grows up under the watchful eye of his father Mufasa; all the whil", "poster": "/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg", "youtubeId": "UgjEj5mXLlk"}, {"id": 22, "title": "Pirates of the Caribbean: The Curse of the Black Pearl", "year": "2003", "rating": 7.8, "overview": "When wily pirate Captain Barbossa seizes Jack Sparrow’s beloved ship, the Black Pearl, and kidnaps the governor’s daughter, Elizabeth Swann,", "poster": "/poHwCZeWzJCShH7tOjg8RIoyjcw.jpg", "youtubeId": "-9HT0l9HV4c"}, {"id": 411, "title": "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe", "year": "2005", "rating": 7.1, "overview": "Four kids travel through a wardrobe to the land of Narnia and learn of their destiny to free it with the guidance of a mystical lion.", "poster": "/iREd0rNCjYdf5Ar0vfaW32yrkm.jpg", "youtubeId": "3mKPrxjwF7A"}, {"id": 58, "title": "Pirates of the Caribbean: Dead Man's Chest", "year": "2006", "rating": 7.4, "overview": "Captain Jack Sparrow’s got a blood debt to pay: he owes his soul to the legendary Davy Jones, ghastly Ruler of the Ocean Depths. To escape e", "poster": "/uXEqmloGyP7UXAiphJUu2v2pcuE.jpg", "youtubeId": "9SFWn9taQTw"}, {"id": 38757, "title": "Tangled", "year": "2010", "rating": 7.6, "overview": "Feisty teenager Rapunzel, who has long and magical hair, wants to go and see sky lanterns on her eighteenth birthday, but she's bound to a t", "poster": "/ym7Kst6a4uodryxqbGOxmewF235.jpg", "youtubeId": "gsYKF8ecC8g"}]};

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
  const year = m.year || (m.release_date || "").slice(0, 4) || "—";
  const rating = typeof m.rating === "number" ? m.rating.toFixed(1) : (typeof m.vote_average === "number" ? m.vote_average.toFixed(1) : "—");
  const poster = m.poster
    ? TMDB_IMG + m.poster
    : (m.poster_path ? TMDB_IMG + m.poster_path : "https://i.ytimg.com/vi/O3GRxW9IkTg/hqdefault.jpg");
  const overview = (m.overview || "No description on TMDB yet.").slice(0, 140);
  const yt = m.youtubeId || "";
  return (
    '<article class="movie-card tmdb-card" data-tmdb-id="' + m.id + '" data-youtube-id="' + yt + '" tabindex="0" role="button" aria-label="Watch trailer for ' + esc(m.title) + '">' +
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

function loadTmdbRows() {
  if (!tmdbNotice || !tmdbRows) return;
  const cat = typeof TMDB_CATALOGUE !== "undefined" ? TMDB_CATALOGUE : null;
  if (cat && (cat.trending || []).length) {
    tmdbNotice.hidden = true;
    tmdbRows.hidden = false;
    renderRow("trendingGrid", cat.trending);
    renderRow("bollywoodGrid", cat.bollywood);
    renderRow("hollywoodGrid", cat.hollywood);
    renderRow("disneyGrid", cat.disney);
    return;
  }
  if (!TMDB_API_KEY) {
    tmdbNotice.hidden = false;
    tmdbRows.hidden = true;
    return;
  }
  tmdbNotice.hidden = true;
  tmdbRows.hidden = false;
  Promise.all([
    tmdbFetch("/trending/movie/week"),
    tmdbFetch("/discover/movie?with_original_language=hi&sort_by=popularity.desc"),
    tmdbFetch("/discover/movie?with_original_language=en&sort_by=popularity.desc"),
    tmdbFetch("/discover/movie?with_companies=2&sort_by=popularity.desc"),
  ]).then(([trending, bollywood, hollywood, disney]) => {
    renderRow("trendingGrid", trending && trending.results);
    renderRow("bollywoodGrid", bollywood && bollywood.results);
    renderRow("hollywoodGrid", hollywood && hollywood.results);
    renderRow("disneyGrid", disney && disney.results);
    if (!trending && !bollywood && !hollywood && !disney) {
      tmdbNotice.hidden = false;
      tmdbNotice.textContent = "TMDB did not answer — check the API key in script.js, then refresh.";
      tmdbRows.hidden = true;
    }
  });
}

function searchCatalogue(query) {
  const q = query.toLowerCase();
  const all = [];
  const cat = typeof TMDB_CATALOGUE !== "undefined" ? TMDB_CATALOGUE : null;
  if (cat) ["trending", "bollywood", "hollywood", "disney"].forEach((k) => (cat[k] || []).forEach((m) => all.push(m)));
  const seen = new Set();
  return all.filter((m) => {
    if (seen.has(m.id)) return false;
    seen.add(m.id);
    return (m.title + " " + (m.overview || "") + " " + (m.year || "")).toLowerCase().includes(q);
  });
}

async function searchTmdb(query) {
  const local = searchCatalogue(query);
  if (local.length) {
    if (!movieGrid) return false;
    movieGrid.innerHTML = local.slice(0, 12).map(tmdbCard).join("");
    if (movieResultsCount) movieResultsCount.textContent = "Showing " + Math.min(12, local.length) + " TMDB results for “" + query + "”";
    if (movieEmptyState) movieEmptyState.hidden = true;
    if (tmdbRows) tmdbRows.hidden = true;
    return true;
  }
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
  if (movieSearchText) {
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

function openTmdbPlayer(tmdbId, title, youtubeId) {
  if (youtubeId) { openPlayerByYoutubeId(title, youtubeId, "Watch trailer"); return; }
  tmdbFetch("/movie/" + tmdbId + "/videos").then((data) => {
    const videos = (data && data.results) || [];
    const trailer = videos.find((v) => v.site === "YouTube" && v.type === "Trailer")
      || videos.find((v) => v.site === "YouTube");
    if (!trailer) { showToast("No trailer on TMDB for this title yet"); return; }
    openPlayerByYoutubeId(title, trailer.key, "Watch trailer");
  });
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
    openTmdbPlayer(Number(card.dataset.tmdbId), titleEl ? titleEl.textContent : "Movie", card.dataset.youtubeId || "");
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
