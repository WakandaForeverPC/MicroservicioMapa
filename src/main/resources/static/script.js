const board = document.getElementById('board');
const gridWidth = 9; // columnas
const gridHeight = 7; // filas

// tablero vacio columnas y filas
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

// Fetch buildings from the server and place them on the board
fetch('/ciudad/edificios')
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