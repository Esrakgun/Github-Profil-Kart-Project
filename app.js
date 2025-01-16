// API link Bağlantı Noktası:
// const {default:axios}=require ('axios')
const API_URL = "https://api.github.com/users/";

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')
// getUser(ESRAAKGUNDOĞDU)
async function getUser(username) {
    try{
        const {data} =await axios(API_URL + username)
        // console.log(data);
        creatUserCard(data) 
        getRepos(username)
    }catch(err){
        creatErrorCard(` Üzgünüm Aradığın Kullanıcıyı Bulamadım:(`)
        //  console.log(err);
    }
}

form.addEventListener(`submit`, (e) => {
  e.preventDefault();
  const user = search.value;

  if (user) {
    getUser(user);
    search.value = ``;
  }
});

function creatUserCard(user){
    const userName = user.name || user.login
    const userBio = user.bio ?`<p>${user.bio}</p>`:""

    const cardHTML = `
     <div class="card">
            <img 
            class="user-image" 
            src=${user.avatar_url} 
            alt=${user.name}>

            <div class="user-info">
                <div class="user-name">
                    <h2>${userName}</h2>
                    <small>@${user.login}</small>
                </div>
            </div>
            🌟<b>
                Creative Frontend Developer ||<br>Code Meets Art
            </b>
             <div class="user-info">
                <div class="user-name">
                    <small></small>
                </div>
            </div>
            <p>
             ${userBio}
            </p>
           
          <ul>
                <li><i class="fa-solid fa-user-group">
                </i> 1542 <strong>Followers</strong></li>
                <li> 400 <strong>Following</strong></li>
                <li><i class="fa-solid fa-bookmark"></i> 36 <strong>Repository</strong></li>
                <li></li>
            </ul>
            <div class="repos" id="repos">
                <a href="#"><i class="fa-solid fa-book-bookmark"><small>Tic Tac Toe Game</small>
                    </i></a>
                <a href="#"><i class="fa-solid fa-book-bookmark"><small>Weather App</small></i></a>
                <a href="#"><i class="fa-solid fa-book-bookmark"><small>Movie Ticket Reservation System App</small></i></a>
            </div>
        </div>
     `;
     main.innerHTML = cardHTML
}

function  creatErrorCard(msg){
    const cardErrorHTML = `
    <div class="card">
    <h2>  ${msg}</h2>
    </div>`;
    main.innerHTML = cardErrorHTML
}

async function getRepos(username) {
  try {
    const { data } = await axios(API_URL + username + '/repos')

    addReposToCard(data)
  } catch (err) {
    createErrorCard('Repoları çekerken hata oluştu.')
  }
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos.slice(0, 3).forEach((repo) => {
    const reposLink = document.createElement("a");
    reposLink.href = repo.html_url;
    reposLink.target = "_blank";
    reposLink.innerHTML = ` <i class="fa-solid fa-book-bookmark"></i> ${repo.name} `;

    reposEl.appendChild(reposLink);
  });
}