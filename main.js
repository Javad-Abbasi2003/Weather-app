// `http://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`
const apiKeys = '880604a6e8b7ed7a3553e1f965fa14ee';

const input = document.querySelector('input');
const form = document.querySelector('form');
const list = document.querySelector('.cities');
document.querySelector('.clear').addEventListener('click', () => {
    list.innerHTML = '';
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let inputVal = input.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&units=metric&appid=880604a6e8b7ed7a3553e1f965fa14ee`;
    fetch(url)
    .then((response) => response.json())
    .then(async (data) => {
        const {main, name, sys, weather} = await data;
        const div = document.createElement('div');
        div.classList.add('city');
        const temp = Math.round(main.temp);
        const innerHtml = `
        <div class="cityName">
                <h2>${name}</h2>
                <h4>${sys.country}</h4>
            </div>
            <span class="temp">${temp}°c</span>
            <span class="humid">Humidity: ${main.humidity}%</span>
            <br>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg" alt='${weather[0].description}'>
            <p>${weather[0].main}</p>
        `;
        div.innerHTML = innerHtml;
        list.appendChild(div);
    })
    .catch(() => {
        input.placeholder = 'choose a valid city';
        setTimeout(() =>{input.placeholder= 'Search city'}, 2000);
    });

    input.value = '';
});