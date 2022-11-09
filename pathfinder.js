window.addEventListener('load', () => {
    setup();
    const graph = buildAdList(39, 15);
    const playBfs  = document.getElementById("play BFS");
    const playDfs  = document.getElementById("play DFS");
    const resetAll = document.getElementById("reset all");
    const reset = document.getElementById("reset");
    const startNode = document.getElementById('start');
    const endNode = document.getElementById('end');
    resetAll.addEventListener('click', () => resetTable(graph, true))
    reset.addEventListener('click', () => resetTable(graph));
    playBfs.addEventListener('click', () => breadthFirstSearch(graph, startNode.parentElement.id, endNode.parentElement.id));
    playDfs.addEventListener('click', () => depthFirstSearch(graph, startNode.parentElement.id, endNode.parentElement.id));
    startNode.addEventListener('dragstart', (ev) => dragStartEv_handler(ev));
    endNode.addEventListener('dragstart', (ev) => dragStartEv_handler(ev));
});


function dragStartEv_handler(ev) {
    ev.dataTransfer.setData('text/html', ev.target.id);
}

function dragOverEv_handler(ev) {
    ev.preventDefault();

    ev.dataTransfer.dropEffect = "move";
}

function dropEvent(ev) {
    ev.preventDefault();

    const data = ev.dataTransfer.getData('text/html');
    ev.target.appendChild(document.getElementById(data))
}

async function depthFirstSearch(graph, start, end) {
  let stack = [];
  stack.push(start);
  let visited = new Set();

  while(stack.length != 0) {
    let current = stack.pop();
    if (current == undefined) return
    const cell = document.getElementById(current);
    cell.classList.replace('table-cell', 'dfs');
    if (cell.classList.contains('wall')) continue;
    for (let node in graph[current]) {
      if (current == end) {return}
        if (!visited.has(graph[current][node])) {
        stack.push(graph[current][node]);
        visited.add(current);
      }
    }
    await sleep(1);
  }
 
}

async function breadthFirstSearch (graph, start, end) {
    let queue = [];
    queue.push(start);

    let visited = new Set();

    while (queue.lastIndexOf != undefined) {

        let current = queue.shift();
        if (current == undefined) return
        let tile = document.getElementById(current);
        tile.classList.replace('table-cell', 'bfs');
        if (tile.classList.contains('wall')) continue;
        for (let x in graph[current]) {
            if (current == end) {return}
            if(!visited.has(graph[current][x])) {
                queue.push(graph[current][x]);
                visited.add(graph[current][x]);
            }
            
        }
        await sleep(1);
    }
}

function resetTable(graph, all) {
    let queue = [];
    queue.push('0,0');

    let visited = new Set();

    while (queue.lastIndexOf != undefined) {

        let current = queue.shift();
        if (current == undefined) return
        let tile = document.getElementById(current);
        if (tile.classList.contains('dfs')) tile.classList.replace('dfs', 'table-cell');
        else if (tile.classList.contains('wall') && all) tile.classList.replace('wall', 'table-cell');
        else tile.classList.replace('bfs', 'table-cell');
        
            
        for (let x in graph[current]) {
            
            if(!visited.has(graph[current][x])) {
                queue.push(graph[current][x]);
                visited.add(graph[current][x]);
            }
            
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function setup() {    
    const container = document.getElementById("titleContainer");

    for (let j=0; j<39; j++) {
        
        let column = document.createElement("div");
        
        column.classList.add("table-cell");
        column.classList.add("width-1-3");
        column.classList.add("table-nest");
        
        let tableColum = document.createElement("div");
        
        tableColum.classList.add("table");
        
        for (let i=0; i<15; i++) {
            let tr = document.createElement("div");
            tr.classList.add("table-row");
            
            let td = document.createElement("div");
            td.classList.add("table-cell");
            td.id = j + ',' + i;
            td.addEventListener('dragover', (ev) => dragOverEv_handler(ev));
            td.addEventListener('drop', (ev) => dropEvent(ev));
            td.addEventListener('click', (ev) => {
                if (ev.target.classList.contains('table-cell')) ev.target.classList.replace('table-cell', 'wall');
                
            });
            tr.appendChild(td);
            tableColum.append(tr);
        }
        column.append(tableColum);
        container.append(column);
    }

    return container;
}

function buildAdList(height, width) {
    let adjacencyList = {};

    for (let j=0; j<height; j++) {
        for (let i=0; i<width; i++) {
            let ajKey = j + "," + i;
            adjacencyList[ajKey] = [];
            if (j>0) adjacencyList[ajKey].push((j-1) + "," + i);
            if (j<(height-1)) adjacencyList[ajKey].push((j+1) + "," + i);
            if (i>0) adjacencyList[ajKey].push(j + "," + (i-1));
            if (i<(width-1)) adjacencyList[ajKey].push(j + "," + (i+1));
        }
    }

    return adjacencyList;
}
