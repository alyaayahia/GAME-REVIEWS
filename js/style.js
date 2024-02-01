let image = $("#image").offset().top;
$(window).scroll(function () {
  //console.log($(window).scrollTop());
  if ($(window).scrollTop() > image) {
    $("#navbar").addClass("fixed-top");
  } else {
    $("#navbar").removeClass("fixed-top");
  }
});
let active = document.querySelector(".active");
let details = document.getElementById("details");
let Game = document.querySelector("#Game");
let gameBody = document.querySelector(".Game");
let links = document.querySelectorAll(".nav-link");
/* *************************** Navbar*************************** */
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (e) {
    getGames(e.target.getAttribute("category"));
    document.querySelector(".active")?.classList.remove("active");
    e.target.classList.add("active");
    console.log(document.querySelector(".active"));
  });
}
/* *************************** getGames*************************** */
let Data = [];
/* ***********************function to get API of Game************ */
async function getGames(category) {
  const loading = document.querySelector(".conatin");
  loading.classList.remove("d-none");
  /*  document.body.style.background = "#272b30e3"; */
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1e6850aee6msh19a4a1c37425f10p1afde6jsnba148bb8b441",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.${category}.fantasy.pvp&platform=pc`,
    options
  );
  const response = await api.json();
  Data = response;
  loading.classList.add("d-none");
  /* document.body.style.background = ""; */
  displayGames();
  getId(Data);
}
/* ***********************function to get id of Game************ */
function getId(Data) {
  let elements = document.querySelectorAll(".elements");
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function () {
      /* console.log(this);
      console.log(Data[i].id); */
      getDetails(Data[i].id);
    });
  }
}
/* ***********************function to display  of Game************ */
function displayGames() {
  let box = ``;
  for (let i = 0; i < Data.length; i++) {
    box += ` <div class="col-md-3 elements" id="item" ">
    <div class="item border border-black">
      <div class="card" style="">
        <img
          src="${Data[i].thumbnail}"
          class="card-img-top object-fit-cover p-md-2"
          alt="..."
        />
        <div class="card-body">
          <div
            class="Game-caption d-flex justify-content-between align-items-center"
          >
            <h3 class="gameTitle">${Data[i].title}</h3>
            <span class="free rounded-1">free</span>
          </div>
          <p class="dec">${Data[i].short_description}</p>
        </div>
        <footer
          class="d-flex justify-content-between border border-black mt-2 p-1"
        >
          <span class="rounded-2">${Data[i].genre} </span>
          <span class="rounded-2">${Data[i].platform} </span>
        </footer>
      </div>
    </div>
  </div>`;
  }

  Game.innerHTML = box;
}
getGames();
/* *************************** Details**************************** */
let dataDetails;
/*********function to get API of Details*********************** */
async function getDetails(id) {
  const loading = document.querySelector(".conatin");
  loading.classList.remove("d-none");
  /*  document.body.style.background = "#272b30e3"; */
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1e6850aee6msh19a4a1c37425f10p1afde6jsnba148bb8b441",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const detailsApi = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );
  const response = await detailsApi.json();
  dataDetails = response;
  loading.classList.add("d-none");
  /* document.body.style.background = ""; */
  displayDetails(dataDetails);
  close();
}
/*********function to display API of Details********************* */
function displayDetails(data) {
  let box = `
  
   <header class="d-flex justify-content-between align-items-center my-4">
  <h2 class="text-white">Details Game</h2>
  <button class="btn-close btn-close-white" id="btnClose"></button>
 </header>
<div class="row">
  <div class="col-md-4">
    <div class="details-img">
      <img src="${data.thumbnail}" class="w-100" />
    </div>
  </div>
  <div class="col-md-8">
    <div class="caption text-white">
      <h3 class="my-3">Title: ${data.title}</h3>
      <h6>
        Category : <span class="badge bg-secondary"> ${data.genre}</span>
      </h6>
      <h6 class="my-3">
        Platform : <span class="badge bg-secondary">${data.platform} </span>
      </h6>
      <h6 class="mb-3">
        Status : <span class="badge bg-secondary">${data.Status}</span>
      </h6>

      <p class="small">
      ${data.description}
      </p>
      <button type="button" class="btn btn-outline-warning"target="_blank" >
       <a target="_blank" class="text-decoration-none" href="${data.game_url}">Show Game</a> 
      </button>
    </div>
  </div>
  `;
  gameBody.classList.add("d-none");
  details.innerHTML = box;
}
/*********function to close Details Game*********************** */
function close() {
  let btnClose = document.querySelector(".btn-close");
  btnClose.addEventListener("click", function () {
    details.innerHTML = "";
    gameBody.classList.remove("d-none");
  });
}
