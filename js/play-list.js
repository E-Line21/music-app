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
        <li class="list-group-item d-flex align-items-center track">
            <audio class="audio paused" src="${tracks[j].src}"></audio>
            <button class="button">
                <img src="assets/play-list/paused.svg" alt="Иконка начала воспроизведния музыки" class="icon playing me-2" height="30px">
            </button>
            <span>${tracks[j].name}</span>
            <span class="time ms-auto me-2 text-muted">${tracks[j].time}</span>
        </li>
        `;
}

setupAudio();



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
        function updateProgress() {
            // Нарисовать актуальное время
            time.innerHTML = getTime(audio.currentTime);
          
            // Нужно ли вызвать её ещё раз?
            if (audio.classList.contains(`playing`)) {
                requestAnimationFrame(updateProgress);
            } else {
                time.innerHTML = getTime(audio.duration);
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
    return `${min}:${sec}`
}