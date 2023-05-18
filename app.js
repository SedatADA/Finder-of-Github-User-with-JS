// HTML den çekilen sabitler
const API_URL = "https://api.github.com/users/";
const form = document.getElementById("userForm");
const search = document.getElementById("search");
const main = document.getElementById("main");
//Axios ile veri çekme

async function getUser(username) {
  try {
    const { data } = await axios(API_URL + username);
    //console.log(data);
    createUserCard(data);
    getRepos(username);
  } catch (err) {
    //console.log(err);
    createErrorCard("Üzgünüz Aradığınız Kullanıcı Bulunamadı(:");
  }
}
//inputtan değer eşleme
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
    search.value = "";
  }
});

function createUserCard(user) {
  const userName = user.name || user.login;
  const bioName = user.bio ? `<p> ${user.bio} </p>` : " ";

  const cardHTML = `
    <div class="user-cards">
        <img
          src=${user.avatar_url}
          alt=${user.name}
          class="user-image"
        />
        <div class="user-info">
          <div class="user-name">
            <h2>${userName}</h2>
            <small>@${user.login}</small>
          </div>
        </div>
          <p>
            ${bioName}
          </p>
          <ul>
            <li>
              <i class="fa-solid fa-user-group"></i> ${user.followers}
              <strong>Followers</strong>
            </li>

            <li> ${user.following} <strong> Following</strong></li>
            <li>
              <i class="fa-solid fa-bookmark"></i>  ${user.public_repos}<strong> Repository</strong>
            </li>
          </ul>
          <div class="repos" id ="repos"></div>
       
    </div>
    
    
    `;
  main.innerHTML = cardHTML;
}

function createErrorCard(msg) {
  const cardErrorHTML = `
    <div class="user-card">
    <h2>${msg}</h2>
    </div>
    `;
  main.innerHTML = cardErrorHTML;
}
async function getRepos(username) {
  try {
    const { data } = await axios(API_URL + username + "/repos");
    //console.log(data);
    addReposToCard(data);
  } catch (err) {
    cardErrorHTML("üzgünüz aradığinız  repo bulunamadı");
  }
}
function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");
  repos.slice(0, 3).forEach((repos) => {
    const reposLink = document.createElement("a");
    reposLink.href = repos.html_url;
    reposLink.target = "_blank";
    reposLink.innerHTML = ` <i class="fa-solid fa-bookmark"></i> ${repos.name}`;
    reposEl.appendChild(reposLink);
  });
}
