let album = getAlbum();

if (!album) {
    renderError();
} else {
    renderAlbumInfo(album);
    renderTracks(album);
    setupAudio();
}

/*Функции*/
function pauseAll() {
    let tracksNode = document.querySelectorAll(`.track`)
    for (let i = 0; i < tracksNode.length; i++) {
        tracksNode[i]
            .querySelector(`.audio`)
            .pause();
        tracksNode[i]
            .querySelector(`.audio`)
            .classList
            .remove(`playing`);
        tracksNode[i]
            .querySelector(`.audio`)
            .classList
            .add(`paused`);
        tracksNode[i]
            .querySelector(`.icon`)
            .src = `assets/play-list/paused.svg`;
    }
}

function setupAudio() {
    let tracksNode = document.querySelectorAll(`.track`);
    for (let j = 0; j < tracksNode.length; j++) {
        let btn = tracksNode[j].querySelector(`.button`);
        let audio = tracksNode[j].querySelector(`.audio`);
        let img = tracksNode[j].querySelector(`.icon`);
        let time = tracksNode[j].querySelector(`.time`);
        let progress = tracksNode[j].querySelector(`.progress-bar`);
        function updateProgress() {
            if (time.innerHTML != getTime(audio.currentTime)) {
                time.innerHTML = getTime(audio.currentTime);
                progress.style.width = audio.currentTime/audio.duration*100 + `%`;
            }
            if (audio.classList.contains(`playing`)) {
                requestAnimationFrame(updateProgress);
            } else {
                time.innerHTML = getTime(audio.duration);
                progress.style.width = `0%`;
            }
            
        }
        
        btn.addEventListener(`click`, function() {
            if (audio.classList.contains(`paused`)) {
                pauseAll();
                audio.classList.remove(`paused`);
                audio.classList.add(`playing`);
                audio.play();
                updateProgress();
                img.src = `assets/play-list/plaing.svg`
            } else {
                audio.classList.add(`paused`);
                audio.classList.remove(`playing`);
                audio.pause();
                img.src = `assets/play-list/paused.svg`;
            }
        });
    }
}

function getTime(time) {
    let min = Math.floor(time/60);
    let sec = Math.floor(time)%60;
    if (min < 10) {
        min = `0` + min;
    }
    if (sec < 10) {
        sec = '0' + sec
    }
    return `${min}:${sec}`
}

function getAlbum() {
    let search = new URLSearchParams(window.location.search);
     i = search.get(`i`);
     return albums[i];
}

function renderAlbumInfo(album) {
    document
    .querySelector(`.album`)
    .innerHTML = `
    <div class="row align-items-center">
        <div class="col-12 col-lg-5">
            <img src="${album.img}" alt="" class="card-img rounded-start img-fluid">
        </div>
        <div class="col-12 col-lg-7">
            <div class="card-body">
                <h1 class="card-title">${album.name}</h1>
                <p class="card-text mb-0">
                    Исполнитель: ${album.author}
                </p>
                <p class="card-text">
                    Жанр: ${album.style}
                </p>
                <div class="signature">
                    <p class="card-text text-secondary">${album.date} • ${album.type}</p>
                </div>
            </div>
        </div>
    </div>
    `;
}

function renderTracks(album) {
    let tracks = album.tracks;
    for (let j = 0; j < tracks.length; j++) {
        document
            .querySelector(`.tracks`)
            .innerHTML += `
            <li class="list-group-item d-flex align-items-center track">
                <audio class="audio paused" src="${tracks[j].src}"></audio>
                <button class="button">
                    <img src="assets/play-list/paused.svg" alt="Иконка начала воспроизведния музыки" class="icon playing me-2" height="30px">
                </button>
                <span>${tracks[j].name}</span>
                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style="width: 0%"></div>
                </div>
                <span class="time ms-auto me-2 text-muted">${getTime(tracks[j].time)}</span>
            </li>
            `;
    }
}

function renderError() {
    document
    .querySelector(`.album`)
    .innerHTML = `ОШИБКА!!! Данный альбом не обнаружен!`;
}