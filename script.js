// ============================================================
// THE COZY REEL — script.js  (v3 — clean format)
// No movies or TV shows are added yet, on purpose.
// This file is the clean structure, ready to fill later.
//
// WHERE TITLES WILL GO LATER:
//   Add them to the TITLES list below, one entry per title.
//   An example is shown in the comment — it is commented out,
//   so it does not appear on the site yet.
//
//   /*
//   {
//     id: 1,
//     title: "Example Movie",
//     type: "movie",          // "movie" or "tv"
//     genre: "Comedy",
//     channel: "Cinema",      // for TV: "NTV", "Kantipur TV", ...
//     year: 2024,
//     minutes: 120,
//     rating: 4.5,
//     desc: "One line about this title."
//   },
//   */
//
// Until then, search, tabs, filters and sorting are all ready —
// they simply show "nothing added yet".
// ============================================================

// ---------- 1. THE CATALOGUE — EMPTY FOR NOW ----------
const TITLES = [];

// Channels are only names for now — no shows attached yet.
const CHANNELS = ["NTV", "Kantipur TV", "Himalaya TV", "AP1 TV", "Image Channel"];

// ---------- 2. STATE ----------
let activeType = "all";       // all | movie | tv | watchlist
let activeGenre = "all";
let activeChannel = "all";
let searchText = "";
let searchType = "all";       // all | movie | tv — from the search box
let sortBy = "recommended";

// ---------- 3. FIND THE PARTS OF THE PAGE ----------
const grid = document.getElementById("cardGrid");
const resultsTitle = document.getElementById("resultsTitle");
const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const searchTypeSelect = document.getElementById("searchType");
const sortSelect = document.getElementById("sortSelect");
const toast = document.getElementById("toast");

// ---------- 4. HELPERS ----------
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ---------- 5. FILTER + SORT (ready, waiting for data) ----------
function getVisibleTitles() {
  let list = TITLES.filter((item) => {
    // Search-type option: All / Movies / TV Shows
    const typeToMatch = searchType !== "all" ? searchType : activeType;
    if (typeToMatch === "movie" && item.type !== "movie") return false;
    if (typeToMatch === "tv" && item.type !== "tv") return false;
    if (activeType === "movie" && item.type !== "movie") return false;
    if (activeType === "tv" && item.type !== "tv") return false;
    if (activeGenre !== "all" && item.genre !== activeGenre) return false;
    if (activeChannel !== "all" && item.channel !== activeChannel) return false;
    if (searchText) {
      const haystack = [item.title, item.genre, item.channel, item.desc].join(" ").toLowerCase();
      if (!haystack.includes(searchText)) return false;
    }
    return true;
  });

  if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
  if (sortBy === "newest") list = [...list].sort((a, b) => b.year - a.year);
  if (sortBy === "az") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
  return list;
}

// ---------- 6. DRAW THE RESULTS ----------
// With TITLES empty, this shows the clean "nothing yet" message.
// As soon as we add titles, the same code will draw their cards.
function renderCards() {
  const list = getVisibleTitles();

  const titles = { all: "Search results", movie: "Movies", tv: "TV Shows", watchlist: "My List" };
  resultsTitle.textContent = titles[activeType] || "Search results";
  resultsCount.textContent = TITLES.length === 0
    ? "0 titles added yet"
    : "Showing " + list.length + " of " + TITLES.length + " titles";

  emptyState.hidden = list.length !== 0;
  if (TITLES.length === 0) {
    emptyState.textContent = searchText
      ? "Nothing added yet, so there is nothing to match “" + searchText + "” — we will add titles together later."
      : "Nothing added yet. Use the search above, or go to the Movies or TV Shows section below.";
  }

  // No card HTML here yet — cards are created only when TITLES has entries.
  // When we add titles later, this is where each card will be built.
  grid.innerHTML = "";
}

// ---------- 7. SEARCH ----------
// The search option (All / Movies / TV Shows) + the search box.
function setSearch(value) {
  searchText = value.trim().toLowerCase();
  renderCards();
}
searchInput.addEventListener("input", () => setSearch(searchInput.value));
searchTypeSelect.addEventListener("change", () => {
  searchType = searchTypeSelect.value;
  renderCards();
  showToast(
    searchType === "all" ? "Searching everything" :
    searchType === "movie" ? "Searching Movies only" :
    "Searching TV Shows only"
  );
});
document.getElementById("bigSearchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  setSearch(searchInput.value);
  document.getElementById("cardGrid").scrollIntoView({ behavior: "smooth" });
});

// ---------- 8. NAV TABS: Home / Movies / TV Shows / My List ----------
document.querySelectorAll(".nav-btn[data-type]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn[data-type]").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeType = btn.dataset.type;
    // Keep the search-type in sync with the tab, so they never fight.
    searchType = activeType === "watchlist" ? "all" : activeType;
    searchTypeSelect.value = searchType;
    renderCards();
    const target = activeType === "movie" ? "moviesSection" : activeType === "tv" ? "tvSection" : "cardGrid";
    document.getElementById(target).scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
document.querySelectorAll(".nav-btn[data-scroll]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.scroll).scrollIntoView({ behavior: "smooth" });
  });
});

// ---------- 9. GENRE + CHANNEL FILTERS (ready, no data yet) ----------
document.querySelectorAll("#genreChips .chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll("#genreChips .chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    activeGenre = chip.dataset.genre;
    renderCards();
  });
});
document.querySelectorAll("#channelChips .chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll("#channelChips .chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    activeChannel = chip.dataset.channel;
    renderCards();
  });
});

// ---------- 10. SORT ----------
sortSelect.addEventListener("change", () => {
  sortBy = sortSelect.value;
  renderCards();
});

// ---------- 11. HERO BUTTONS ----------
document.getElementById("heroMoviesBtn").addEventListener("click", () => {
  document.getElementById("moviesSection").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("heroTvBtn").addEventListener("click", () => {
  document.getElementById("tvSection").scrollIntoView({ behavior: "smooth" });
});

// ---------- 12. FIRST DRAW ----------
renderCards();
