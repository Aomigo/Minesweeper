const bombNb = document.querySelector('.nb')
const difficultyTextappender = document.querySelector('.nb-bomb')
const GameOverText = document.querySelector('.game-over')
const youWinText = document.querySelector('.you-win')
const preventRightClickPage = document.querySelector('body')
const easyGameBtn = document.querySelector('.easy')

//Utiliser les boutons 1/4 pour selectionner la difficulté de la grille

let grid = [];
let rows = 8;
let columns = 8;
let minesLocation = [];
let tilesClick = 0;
let easyTiles = 64;
let tile = document.createElement("div");
let difficultyText = document.createElement("div")
let gridDifficulty = "Easy"
difficultyText.innerHTML = gridDifficulty + " grid"
difficultyTextappender.appendChild(difficultyText)


preventRightClickPage.addEventListener('contextmenu', function (e) {
    e.preventDefault()
})

easyGameBtn.addEventListener('click', function() {
    location.reload()
})
easyGame()

function easyGame() {
    setMines()
    //populacer notre grille  
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let l = 0; l < columns; l++) {
            let tile = document.createElement("div");
            tile.classList.add('tiles')
            tile.id = i.toString() + "-" + l.toString();
            tile.addEventListener('click', clickTile)
            tile.addEventListener('contextmenu', flagClick)
            document.getElementById("grid").append(tile);
            row.push(tile)
        }
        grid.push(row)
    }
    console.log(grid)
    //faire le nombre de bombe en texte
    bombNb.innerHTML = minesLocation.length
}

function flagClick(event) {
    let tile = this
    if (tile.classList.contains('clicked')) {
        return
    }
    tile.classList.toggle('flag')
    event.preventDefault()
    return
}

function setMines() {
    minesLocation.push(Math.floor(Math.random() * 8) + "-" + Math.floor(Math.random() * 8))
    minesLocation.push(Math.floor(Math.random() * 8) + "-" + Math.floor(Math.random() * 8))
    minesLocation.push(Math.floor(Math.random() * 8) + "-" + Math.floor(Math.random() * 8))
    minesLocation.push(Math.floor(Math.random() * 8) + "-" + Math.floor(Math.random() * 8))
    minesLocation.push(Math.floor(Math.random() * 8) + "-" + Math.floor(Math.random() * 8))

    console.log(minesLocation)
}






function clickTile(clicking) {
    let tile = this
    if (tile.classList.contains('flag')) {
        return
    }
    if (minesLocation.includes(tile.id)) {
        console.log("you clicked on a mine, game over <3")
        mineReveal()
        clicking.preventDefault()
    } else{
        console.log("Good tile, keep it up ")
    }
    
    
    let coords = tile.id.split("-"); // "0-0" -> ["0", "0"]
    let i = parseInt(coords[0])
    let l = parseInt(coords[1])
    checkMines(i, l)
}

function mineReveal() {
    GameOverText.classList.remove('hidden')
    for (i = 0; i < rows; i++) {
        for (l = 0; l < columns; l++) {
            let tile = grid[i][l];
            if (minesLocation.includes(tile.id)) {
                tile.classList.remove('flag')
                tile.classList.add('bomb')
            }
        }
    }
}

function checkMines(i, l) {
    if (i < 0 || i >= rows || l < 0 || l >= columns) {
        return
    }
    if(grid[i][l].classList.contains('clicked')) {
        return
    }

    grid[i][l].classList.add('clicked')
    tilesClick += 1
        console.log(tilesClick)
        //verifer si on gagne
        if (tilesClick === 59) {
            youWinText.classList.remove('hidden')
            
        }

    let minesFound = 0

    //top 3
    minesFound += checkTiles(i - 1, l - 1)      //checking top left
    minesFound += checkTiles(i - 1, l)        //checking top 
    minesFound += checkTiles(i - 1, l + 1)      //checking top right

    //left and right
    minesFound += checkTiles(i, l - 1)        //checking left
    minesFound += checkTiles(i, l + 1)      //checking right

    //bottom 3 
    minesFound += checkTiles(i + 1, l - 1)      //checking bottom left
    minesFound += checkTiles(i + 1, l)        //checking bottom
    minesFound += checkTiles(i + 1, l + 1)      //checking bottom right

    if (minesFound > 0) {
        if (grid[i][l].classList.contains('bomb')) {
            return
        }
        grid[i][l].innerHTML = minesFound
        grid[i][l].classList.add("x" + minesFound.toString())
    } else {
        //top 3
        checkMines(i - 1, l - 1)      //checking top left
        checkMines(i - 1, l)        //checking top 
        checkMines(i - 1, l + 1)      //checking top right

        //left and right
        checkMines(i, l - 1)        //checking left
        checkMines(i, l + 1)      //checking right

        //bottom 3 
        checkMines(i + 1, l - 1)      //checking bottom left
        checkMines(i + 1, l)        //checking bottom
        checkMines(i + 1, l + 1)      //checking bottom right
    }
}

function checkTiles(i, l) {
    if (i < 0 || i >= rows || l < 0 || l >= columns) {
        return 0
    }
    if (minesLocation.includes(i.toString() + "-" + l.toString())) {
        return 1
    }
    return 0
}

//TODO LIST :

