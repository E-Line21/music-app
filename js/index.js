let container = document.querySelector(`.albums`);

renderAlbums();

function renderAlbums() {
  for(let i = 0; i < albums.length; i++) {
    container
        .innerHTML += `
        <div class="col-12 col-sm-6 col-lg-3">
          <a href="play-list.html?i=${i}" class="text-decoration-none">
            <div class="card h-100">
              <img src="${albums[i].img}" class="card-img-top" alt="...">
              <div class="card-body position-relative">
                <h2 class="card-title">${albums[i].name}</h2>
                <div class="signature">
                  <p class="card-text text-secondary">${albums[i].date} • ${albums[i].type}</p>
                </div>
              </div>
            </div>
          </a>
        </div>
        `;
  } 
}
