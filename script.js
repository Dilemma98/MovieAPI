let movieList = document.getElementById("movieList");
let movieInfo = document.getElementById("movieInfo");
let imgDiv = document.getElementById("imgDiv");

const options = {
  method: "GET",
  headers: {
    //accept: "application/json",

    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGQ2ZjkwNmIzODZhYzQ3YzAwNDcwMWQ4ZjU0NWRmOCIsIm5iZiI6MTcwNDM2MjAwNC4zODksInN1YiI6IjY1OTY4MDE0ZWEzN2UwMDZmYTRjYWQ4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fAIGy5BaC3YiG8Y8WMLb3GSnG9eSm4h4OKMbQHC-pu0",
  },
};

getMovieList();

function getCredits(id) {
  fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.cast);

      printCreditsList(data.cast);
    });
}

function getMovieList() {
  fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",

    options
  )
    .then((res) => res.json())
    .then((data) => {
      printMovieList(data.results);
    });
}
function printCreditsList(id) {
  let actors = document.createElement("h3");
  actors.innerText = "Actors";
  movieInfo.append(actors);
  id.map((name) => {
    let li = document.createElement("p");
    li.innerText = name.name;
    movieInfo.append(li);
  });
}
function printMovieList(movies) {
  movies.map((movie) => {
    let li = document.createElement("li");
    li.innerText = movie.original_title;

    li.addEventListener("click", () => {
      console.log("click på film", movie.original_title);
      printMovieDetails(movie);
    });
  });
}
function getSimilar(movie_id) {
  fetch(`https://api.themoviedb.org/3/movie/${movie_id}/similar`, options).then(
    (res) =>
      res.json().then((data) => {
        printSimilarMovies(data);
      })
  );
}

function printSimilarMovies(movie_id) {
  let similar = document.createElement("h3");
  similar.innerText = "Similar Movies";
  imgDiv.append(similar);
  movie_id.results.map((movie) => {
    let p = document.createElement("p");
    p.innerText = movie.original_title;

    imgDiv.appendChild(p);
  });
}

function printMovieList(movies) {
  movies.map((movie) => {
    let li = document.createElement("li");
    li.innerText = movie.original_title;

    li.addEventListener("click", () => {
      printMovieDetails(movie);
      getSimilar(movie.id);
    });

    movieList.appendChild(li);
  });
}

function printMovieDetails(movie) {
  movieInfo.innerText = "";
  imgDiv.innerText = "";
  let h1 = document.createElement("h1");
  h1.innerText = "Details";
  let h3 = document.createElement("h3");
  h3.innerText = movie.original_title;

  let p = document.createElement("p");
  p.innerText = movie.overview;

  let img = document.createElement("img");
  img.src = "http://image.tmdb.org/t/p/w500" + movie.poster_path;

  let b = document.createElement("b");
  b.innerText =
    "Rating: " + movie.vote_average + " \n" + "Votes: " + movie.vote_count;

  getCredits(movie.id);

  movieInfo.append(h1, h3, p, b);
  imgDiv.append(img);
}
