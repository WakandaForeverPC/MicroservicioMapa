const board = document.getElementById('board');
const gridWidth = 9; // columnas
const gridHeight = 7; // filas

// Crear el tablero con carreteras y celdas
for (let i = 0; i < gridWidth * gridHeight; i++) {
    const cell = document.createElement('div');
    const row = Math.floor(i / gridWidth); // Fila actual
    const col = i % gridWidth;            // Columna actual

    if (row === 3 && (col === 1 || col === 3 || col === 5 || col === 7)) {
        // Intersección de carreteras horizontal y vertical
        cell.classList.add('cell', 'intersection-road');
    } else if (row === 3) {
        // Carretera horizontal
        cell.classList.add('cell', 'horizontal-road');
    } else if (col === 1 || col === 3 || col === 5 || col === 7) {
        // Carreteras verticales
        cell.classList.add('cell', 'vertical-road');
    } else {
        // Celda normal
        cell.classList.add('cell');
    }

    board.appendChild(cell);
}

// Fetch y render estático de edificios
fetch('/mapa/edificios')
    .then(response => response.json())
    .then(buildings => {
        console.log('Buildings data:', buildings); // Log the buildings data
        buildings.forEach(building => {
            if (building.x >= 0 && building.x < gridWidth && building.y >= 0 && building.y < gridHeight) {
                const index = building.y * gridWidth + building.x;
                const cell = board.children[index];

                const buildingDiv = document.createElement('div');
                buildingDiv.classList.add('building');
                buildingDiv.style.width = `${building.width}px`;
                buildingDiv.style.height = `${building.height}px`;
                buildingDiv.style.backgroundColor = building.color; // Asignar el color del edificio

                cell.appendChild(buildingDiv);
            }
        });
    })
    .catch(error => console.error('Error fetching buildings:', error));
// Actualización dinámica de coches y semáforos
function fetchAndUpdateTraffic() {
    // Limpiar elementos dinámicos
    document.querySelectorAll('.car, .traffic-light').forEach(element => element.remove());

    // Obtener y mostrar coches
    fetch('/traffic/cars')
        .then(response => response.json())
        .then(cars => {
            if (Array.isArray(cars)) {
                cars.forEach(car => {
                    if (car.x >= 0 && car.x < gridWidth && car.y >= 0 && car.y < gridHeight) {
                        const index = car.y * gridWidth + car.x;
                        const cell = board.children[index];

                        const carDiv = document.createElement('div');
                        carDiv.classList.add('car');
                        carDiv.style.backgroundColor = car.color; // Asignar el color del coche
                        // No agregar texto al coche
                        cell.appendChild(carDiv);
                    }
                });
            } else {
                console.error('Invalid cars response:', cars);
            }
        })
        .catch(error => console.error('Error fetching cars:', error));

    // Obtener y mostrar semáforos
    fetch('/traffic/traffic-lights')
        .then(response => response.json())
        .then(trafficLights => {
            if (Array.isArray(trafficLights)) {
                trafficLights.forEach(light => {
                    if (light.x >= 0 && light.x < gridWidth && light.y >= 0 && light.y < gridHeight) {
                        const index = light.y * gridWidth + light.x;
                        const cell = board.children[index];

                        const lightDiv = document.createElement('div');
                        lightDiv.classList.add('traffic-light', light.state.toLowerCase());
                        // No agregar texto al semáforo
                        cell.appendChild(lightDiv);
                    }
                });
            } else {
                console.error('Invalid traffic lights response:', trafficLights);
            }
        })
        .catch(error => console.error('Error fetching traffic lights:', error));
}

// Cambiar estado de semáforos cada 4 segundos
function toggleTrafficLights() {
    document.querySelectorAll('.traffic-light').forEach(light => {
        if (light.classList.contains('red')) {
            light.classList.remove('red');
            light.classList.add('green');
            light.textContent = light.textContent.replace('Red', 'Green');
        } else if (light.classList.contains('green')) {
            light.classList.remove('green');
            light.classList.add('yellow');
            light.textContent = light.textContent.replace('Green', 'Yellow');
        } else if (light.classList.contains('yellow')) {
            light.classList.remove('yellow');
            light.classList.add('red');
            light.textContent = light.textContent.replace('Yellow', 'Red');
        }
    });
}

setInterval(toggleTrafficLights, 4000);

// Actualizar tráfico dinámico cada 2 segundos
setInterval(fetchAndUpdateTraffic, 2000);

// WebSocket para actualizaciones en tiempo real
const socket = new SockJS('/mapa/traffic-websocket');
const stompClient = Stomp.over(socket);

stompClient.connect({}, () => {
    stompClient.subscribe('/topic/traffic-cars', message => {
        const cars = JSON.parse(message.body);
        fetchAndUpdateTraffic(cars);
    });

    stompClient.subscribe('/topic/traffic-lights', message => {
        const lights = JSON.parse(message.body);
        toggleTrafficLights(lights);
    });
});

fetch('/mapa/residuos')
    .then(response => response.json())
    .then(recyclingPoints => {
        if (Array.isArray(recyclingPoints)) {
            recyclingPoints.forEach(point => {
                if (point.x >= 0 && point.x < gridWidth && point.y >= 0 && point.y < gridHeight) {
                    const index = point.y * gridWidth + point.x;
                    const cell = board.children[index];

                    const container1 = document.createElement('div');
                    container1.classList.add('recycling-container');
                    container1.style.width = `${point.width / 3}px`;
                    container1.style.height = `${point.height / 3}px`;
                    container1.style.backgroundColor = point.color1;

                    const container2 = document.createElement('div');
                    container2.classList.add('recycling-container');
                    container2.style.width = `${point.width / 3}px`;
                    container2.style.height = `${point.height / 3}px`;
                    container2.style.backgroundColor = point.color2;

                    const container3 = document.createElement('div');
                    container3.classList.add('recycling-container');
                    container3.style.width = `${point.width / 3}px`;
                    container3.style.height = `${point.height / 3}px`;
                    container3.style.backgroundColor = point.color3;

                    cell.appendChild(container1);
                    cell.appendChild(container2);
                    cell.appendChild(container3);
                }
            });
        } else {
            console.error('Invalid recycling points response:', recyclingPoints);
        }
    })
    .catch(error => console.error('Error fetching recycling points:', error));