# The Cozy Reel

A clean, dark, premium home for movies and TV shows, with a separate page for each. Dark theme, Netflix-like: deep black, cinematic red, clean white type.

- `index.html` — Home, a welcoming page only. No movies, no shows, no search here.
- `movies.html` — Movies only, with a movies-only search and Netflix-style cards. Click a card to watch it in a player on the site. Now with TMDB rows: Trending, Bollywood, Hollywood and Disney, once a free TMDB API key is added.
- `shows.html` — TV Shows only, empty for now. No movies on this page.

Movies play from the makers' official YouTube channels only — no download links, no pirated copies. Four Nepali movies so far: Pashupati Prasad (trailer), Kabaddi Kabaddi (full movie), Loot (trailer), Chhakka Panja 2 (trailer). TMDB adds catalogue data, posters and trailers for thousands of titles — not full movies to stream.

## How to use

Open `index.html` in a browser, or view the site on GitHub Pages. Use the menu at the top to go between Home, Movies and TV Shows.

## Files

- `index.html` — the home page
- `movies.html` — the movies page
- `shows.html` — the TV shows page
- `logo.svg` — the JEEVAN logo: red rounded square with a white J, JEEVAN in bold white, THE COZY REEL below. Used in the header of every page and as the site favicon.
- `script.js` — the movies-only search, Netflix-style movie cards, and the watch player. Each movie in `TITLES` has an official YouTube video id (`youtubeId`). TMDB: paste a free key in `TMDB_API_KEY` at the top to load Trending / Bollywood / Hollywood / Disney rows and TMDB search.
