document.body.addEventListener('keyup', (event) => {
    playSound( event.code.toLowerCase() );
})

document.querySelector('.composer button').addEventListener('click', (event) => {
    let song = document.querySelector('#input').value;
    if (song !== '') {
        let songArray = song.split('');
        playComposition(songArray);
    }
})

document.querySelector("#input").addEventListener('input', (element) => {
    element.target.value = filterComposition(element);
})

const playSound = (sound) => {
    let audioElement = document.querySelector(`#s_${sound}`);
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);

    if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    }

    if (keyElement) {
        keyElement.classList.add("active");
        setTimeout( () => {
            keyElement.classList.remove("active");
        }, 250 );
    }
}

const playComposition = (songArray) => {
    let wait = 0;
    for (let songItem of songArray) {
        setTimeout( () => {
            playSound(`key${songItem}`);
        }, wait );
        wait += 250;
    }
}

const filterComposition = (element) => {
    let compose = element.target.value.replace(/([^qweasdzxc ])/, '');
    return compose;
}