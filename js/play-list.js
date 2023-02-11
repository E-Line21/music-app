let search = new URLSearchParams(window.location.search);
let i = search.get(`i`);

document
    .querySelector(`.album`)
    .innerHTML = `
    <div class="row align-items-center">
        <div class="col-12 col-lg-5">
            <img src="${albums[i].img}" alt="" class="card-img rounded-start img-fluid">
        </div>
        <div class="col-12 col-lg-7">
            <div class="card-body">
                <h1 class="card-title">${albums[i].name}</h1>
                <p class="card-text mb-0">
                    Исполнитель: ${albums[i].author}
                </p>
                <p class="card-text">
                    Жанр: ${albums[i].style}
                </p>
                <div class="signature">
                    <p class="card-text text-secondary">${albums[i].date} • ${albums[i].type}</p>
                </div>
            </div>
        </div>
    </div>
    `;

let tracks = albums[i].tracks;
for (let j = 0; j < tracks.length; j++) {
    document
        .querySelector(`.tracks`)
        .innerHTML += `
        <li class="list-group-item d-flex align-items-center">
            <img src="assets/play-list/paused.svg" alt="Иконка начала воспроизведния музыки" class="playing me-2" height="30px">
            <span>${tracks[j].name}</span>
            <span class="time ms-auto me-2 text-muted">${tracks[j].time}</span>
        </li>
        `;
}