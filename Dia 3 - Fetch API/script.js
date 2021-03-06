document.querySelector(".busca").addEventListener("submit", async (event) => {
    event.preventDefault();

    let input = document.querySelector("#searchInput").value;

    if (input !== '') {
        clearInfo();
        showWarning("Carregando...");

        // openweathermap.org
        // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units={Unidade de medida}&lang={Idioma}
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=958f10c4b9f2f66abea5ba75a7f5d530&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windDeg: json.wind.deg
            })
        } else {
            clearInfo();
            showWarning("Cidade não localizada.");
        }
    } else {
        clearInfo();
    }
})

function clearInfo() {
    showWarning('');
    document.querySelector(".resultado").style.display = "none";
}

function showInfo(json) {
    showWarning('');
    document.querySelector(".titulo").innerHTML = `${json.name}, ${json.country}`;
    document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector(".ventoInfo").innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector(".temp img").setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector(".ventoPonto").style.transform = `rotate(${json.windDeg - 90}deg)`;
    
    document.querySelector(".resultado").style.display = "block";
}

function showWarning(msg) {
    document.querySelector(".aviso").innerHTML = msg;
}