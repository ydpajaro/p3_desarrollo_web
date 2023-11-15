document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'd3c39f57206d5904890771c822ffaac3';
    const inputCity = document.querySelector('.search input');
    const searchButton = document.querySelector('.search button');
    const errorDiv = document.querySelector('.error');
    const weatherDiv = document.querySelector('.weather');
    const weatherIcon = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temp');
    const city = document.querySelector('.city');
    const humidity = document.querySelector('.humidity');
    const windSpeed = document.querySelector('.wind');
    const imageBaseUrl = 'images/';  // Ruta base de las imágenes

    searchButton.addEventListener('click', function () {
        // .trim borramos los espacios en la busqueda
        const cityName = inputCity.value.trim();

        if (cityName !== '') {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apiKey}`;

           
            axios.get(apiUrl)
                .then(response => {
                    if (response.status === 200) {
                        const weatherData = response.data;
                        console.log('La petición a la api se completo correctamente con status:',response.status);
                        console.log('Datos de la API:', weatherData);

                        // Obtener el nombre de la condición climática desde la API
                        const weatherConditionName = weatherData.weather[0].main;

                        // Validar si hay una ruta de imagen asociada en el mapeo
                        const weatherImage = weatherImageMapping[weatherConditionName];
                        console.log('Clima: ', weatherConditionName)
                        console.log('weatherImage: ', weatherImage)

                        //Le concatemos la imagen a nuestra carpeta
                        if (weatherImage) {
                            weatherIcon.src = imageBaseUrl + weatherImage;
                        }

                        // Actualizar la interfaz de usuario con los datos del clima
                        temperature.textContent = `${Math.round(weatherData.main.temp)} °C`;
                        city.textContent = weatherData.name;
                        humidity.textContent = `${weatherData.main.humidity}%`;
                        windSpeed.textContent = `${weatherData.wind.speed} Km/h`;

                        // Ocultar mensaje de error y mostrar la sección del clima
                        errorDiv.style.display = 'none';
                        weatherDiv.style.display = 'block';
                    } else {
                        // Mostrar mensaje de error si la solicitud no tiene éxito
                        showError('Búsqueda no encontrada');
                    }
                })
                .catch(error => {
                    // Mostrar mensaje de error en caso de error en la solicitud
                    showError('Búsqueda no encontrada');
                });
        } else {
            // Mostrar mensaje de error si el nombre de la ciudad está vacío
            showError('Por favor, ingrese el nombre de la ciudad');
        }
    });

    // Función para mostrar mensajes de error
    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        weatherDiv.style.display = 'none';
    }

    // Objeto de mapeo de nombres de condiciones climáticas a rutas locales de imágenes
    const weatherImageMapping = {
        Clear: 'clear.png',
        Clouds: 'clouds.png',
        Drizzle: 'drizzle.png',
        Mist: 'mist.png',
        Rain: 'rain.png',
        Snow: 'snow.png',
    };
});
