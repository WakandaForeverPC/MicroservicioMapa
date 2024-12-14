const board = document.getElementById('board');
const gridWidth = 7; // Increase width to 8 to include road cells
const gridHeight = 6;

// Create an empty board with road cells
for (let i = 0; i < gridWidth * gridHeight; i++) {
    const cell = document.createElement('div');
    if ((i % gridWidth === 1) || (i % gridWidth === 3) || (i % gridWidth === 5)) {
        cell.classList.add('cell', 'road'); // Add road class to simulate road
    } else {
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