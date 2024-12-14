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
        buildings.forEach(building => {
            if (building.x >= 0 && building.x < gridWidth && building.y >= 0 && building.y < gridHeight) {
                const index = building.y * gridWidth + building.x;
                const cell = board.children[index];

                const buildingDiv = document.createElement('div');
                buildingDiv.classList.add('building');
                buildingDiv.style.width = `${building.width}px`;
                buildingDiv.style.height = `${building.height}px`;
                buildingDiv.textContent = `Building ${building.id}`;

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
            cars.forEach(car => {
                if (car.x >= 0 && car.x < gridWidth && car.y >= 0 && car.y < gridHeight) {
                    const index = car.y * gridWidth + car.x;
                    const cell = board.children[index];

                    const carDiv = document.createElement('div');
                    carDiv.classList.add('car');
                    carDiv.textContent = `Car ${car.id}`;
                    carDiv.setAttribute('data-id', car.id);
                    cell.appendChild(carDiv);
                }
            });
        })
        .catch(error => console.error('Error fetching cars:', error));

    // Obtener y mostrar semáforos
    fetch('/traffic/traffic-lights')
        .then(response => response.json())
        .then(trafficLights => {
            trafficLights.forEach(light => {
                if (light.x >= 0 && light.x < gridWidth && light.y >= 0 && light.y < gridHeight) {
                    const index = light.y * gridWidth + light.x;
                    const cell = board.children[index];

                    const lightDiv = document.createElement('div');
                    lightDiv.classList.add('traffic-light', light.state.toLowerCase());
                    lightDiv.textContent = `Light ${light.id}`;
                    cell.appendChild(lightDiv);
                }
            });
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
const socket = new SockJS('/traffic-websocket');
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
