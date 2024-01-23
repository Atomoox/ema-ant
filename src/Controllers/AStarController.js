export function astar(matrix, start, destination, allowedCoordinates) {
    console.log(matrix);
    console.log(start);
    console.log(destination);
    console.log(allowedCoordinates);
    class Node {
        constructor(x, y, g = 0, h = 0) {
            this.x = x;
            this.y = y;
            this.g = g; // Cost from start to current node
            this.h = h; // Heuristic (estimated cost from current node to destination)
            this.f = g + h; // Total cost
            this.parent = null;
        }
    }

    // Function to calculate the heuristic (Manhattan distance)
    function calculateHeuristic(node, destination) {
        return Math.abs(node.x - destination.x) + Math.abs(node.y - destination.y);
    }

    // Function to check if a given coordinate is within the matrix bounds and has an allowed type
    function isValid(x, y) {
        return (
            x >= 0 &&
            x < matrix.length &&
            y >= 0 &&
            y < matrix[0].length &&
            (allowedCoordinates.length === 0 || allowedCoordinates.some((coord) => coord.x === x && coord.y === y))
        );
    }

    // Initialize the start and destination nodes
    const startNode = new Node(start.x, start.y);
    const destinationNode = new Node(destination.x, destination.y);

    // Initialize the open and closed lists
    const openList = [startNode];
    const closedList = [];

    console.log(openList)

    while (openList.length > 0) {
        // Find the node with the lowest total cost in the open list
        const currentNode = openList.reduce((minNode, node) => (node.f < minNode.f ? node : minNode), openList[0]);

        // Remove the current node from the open list
        openList.splice(openList.indexOf(currentNode), 1);

        // Add the current node to the closed list
        closedList.push(currentNode);

        // Check if the current node is the destination
        if (currentNode.x === destinationNode.x && currentNode.y === destinationNode.y) {
            console.log('FOUND')
            const path = [];
            let current = currentNode;
            while (current !== null) {
                path.unshift({ x: current.x, y: current.y });
                current = current.parent;
            }
            return path;
        }

        const neighbors = [
            { x: currentNode.x - 1, y: currentNode.y },
            { x: currentNode.x + 1, y: currentNode.y },
            { x: currentNode.x, y: currentNode.y - 1 },
            { x: currentNode.x, y: currentNode.y + 1 },
        ];

        // Filter out invalid neighbors
        const validNeighbors = neighbors.filter((neighbor) => isValid(neighbor.x, neighbor.y));

        // Process each valid neighbor
        for (const neighbor of validNeighbors) {
            // Skip neighbors already in the closed list
            if (closedList.some((node) => node.x === neighbor.x && node.y === neighbor.y)) {
                continue;
            }

            // Calculate tentative g score
            const tentativeG = currentNode.g + 1;

            // Check if the neighbor is not in the open list or has a lower g score
            const existingNode = openList.find((node) => node.x === neighbor.x && node.y === neighbor.y);
            if (!existingNode || tentativeG < existingNode.g) {
                if (!existingNode) {
                    // Add the neighbor to the open list
                    const newNode = new Node(neighbor.x, neighbor.y, tentativeG, calculateHeuristic(neighbor, destination));
                    newNode.parent = currentNode;
                    openList.push(newNode);
                } else {
                    // Update the existing neighbor's g score and parent
                    existingNode.g = tentativeG;
                    existingNode.parent = currentNode;
                }
            }
        }
    }
    console.log('RETURNING NULL :D')
    return null;
}