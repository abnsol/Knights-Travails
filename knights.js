// must be inbound of chess board
const inbound = ([i,j]) => 0 <= i && i < 8 && 0 <= j && j < 8;
// knight can only move in this directions
const dirs = [[-1,2],[-2,1],[-2,-1],[-1,-2],[1,-2],[2,-1],[2,1],[1,2]];

const knightMoves = (start,end) => {
    if (!inbound(start) || !inbound(end)) return 'invalid input';
    const parent = bfs(start); 
    return reConstructPath(end,parent);
}

//return parents of each of the 64 board square uses short path
const bfs = ([r,c]) => {
    const queue = [];
    queue.push([r,c])

    //visited nodes (shortest paths already visited)
    const visited = new Array(8);
    // stores the parent current square (matrix)
    const parents = new Array(8);
    for (let i = 0; i < 8; i++) {
        let rows = new Array(8).fill(false);    
        let parentsRows = new Array(8).fill(null);  
        visited[i] = rows;     
        parents[i] = parentsRows; 
    }

    visited[r][c] = true;

    while (queue.length > 0) {
        let [currentRow,currentColumn] = queue.shift();
        
        for (let [nxtRowIndex,nxtColumnIndex] of dirs) {
            let newRow = currentRow + nxtRowIndex;
            let newColumn = currentColumn + nxtColumnIndex;

            if (inbound([newRow,newColumn]) && !visited[newRow][newColumn]) {
                //parent current row and column
                parents[newRow][newColumn] = [currentRow,currentColumn]; 
                visited[newRow][newColumn] = true;
                queue.push([newRow,newColumn]);
            }
        }
    }return parents;
}

//reconstructs path from parents array 
const reConstructPath = (end,parents) => {
    const path = []
    let currentSquare = end;

    //iterate backwards from end assuming we would find start
    //start will be null since it has no parents
    while (currentSquare !== null) {
        path.push(currentSquare);
        currentSquare = parents[currentSquare[0]][currentSquare[1]];
    }

    return path.reverse();
}

//display as needed
const display = (path) => {
    if (path == 'invalid input'){
        console.log(path);
        return;
    };
    console.log(`You made it in ${path.length - 1} moves! Here is your path`);
    path.forEach(item => console.log(item))
}

// TESTING
const path = knightMoves([0,0],[7,7]);
display(path);