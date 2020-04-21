var columns = 10;
var rows = 10;    
var timer;
var grid = [];

$(document).ready(function() {    
    grid = create2DArray();
    createLayout();    
    cellClicked();
    $("#start").click(function(){
        play();
        timer = setInterval(play, 500);
    });
    $("#reset").click(resetLayout);
    $("#pause").click(function(){
        clearInterval(timer);
    })
});

var create2DArray = function() {
    var array2D = new Array(rows);
    for (var a=0; a<rows; a++) {
        array2D[a] = new Array(columns);
    }
    return array2D;
}

var createLayout = function() {
    for ( i=0; i<rows; i++) {
        for ( j=0; j<columns; j++) {
            var cell = document.createElement("div");
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute("class", "dead");
            $(".grid-container").append(cell);
            grid[i][j] = 0; // 0 means the cell is dead
        }
    }
}

var cellClicked = function () {
    $(".dead").click(function(){
        var cellId = $(this).attr("id");
        var rowcol = cellId.split("_");
        var row = rowcol[0];
        var col = rowcol[1];
        if ( $(this).attr("class").indexOf("live") > -1 ) {
            $(this).attr("class", "dead");
            grid[row][col] = 0; 
        }
        else {
            $(this).attr("class", "live");
            grid[row][col] = 1 
        }     
    })   
}

var play = function() {
    var i, j;
    var neibourSumArray = create2DArray();
    var nextGrid = create2DArray();
    for (  i=0; i<rows; i++) {
        for ( j=0; j<columns; j++) {
            caculateNeiboursLives(i, j, neibourSumArray);
            applyRules(i, j, neibourSumArray, nextGrid);
        }
    }
    grid = nextGrid;
}

var caculateNeiboursLives = function(i,j, neibourSumArray) {
    var neibourSum = 0
    if ( i>0 && j>0 ) {
        neibourSum += grid[i-1][j-1];
    }
    if ( i>0 ) {
        neibourSum += grid[i-1][j];
    }
    if ( i>0 && j<9) {
        neibourSum += grid[i-1][j+1];
    }
    if ( j>0 ) {
        neibourSum += grid[i][j-1];
    }
    if ( j<9 ){
        neibourSum += grid[i][j+1];
    }
    if ( i<9 && j>0 ) {
        neibourSum += grid[i+1][j-1];
    }
    if ( i<9 ) {
        neibourSum += grid[i+1][j];
    }
    if ( i<9 && j<9 ) {
        neibourSum += grid[i+1][j+1];
    }
    neibourSumArray[i][j] = neibourSum;
    return neibourSumArray;
}

var applyRules = function(i, j, neibourSumArray, nextGrid) {
    var cellId = i + "_" + j;
    // when the cell is live and need to die
    if ( grid[i][j] == 1) {
        if ( neibourSumArray[i][j] < 2) {
            $("#" + cellId).attr("class", "dead");
            nextGrid[i][j] = 0;
        }
        else if ( neibourSumArray[i][j] > 3) {
            $("#" + cellId).attr("class", "dead");
            nextGrid[i][j] = 0;
        }
        else {
            nextGrid[i][j] = 1;
        }
    }
    // when the cell is dead and want to live again
    if ( grid[i][j] == 0 ) {
        if ( neibourSumArray[i][j] == 3 ) {
            $("#" + cellId).attr("class", "live");
            nextGrid[i][j] = 1;
        }
        else {
            nextGrid[i][j] = 0;
        }
    }
}

var resetLayout = function() {
    $(".grid-container div").attr("class", "dead");
    grid.fill(0);
}


// for i, j
  // sum the values (0/1) of every cell's neibours i, j, grid; neibourSums
  // apply the rules --  i,j, neibourSums; add class, next_grid[i][j]
    // live to live -- no upadate
    // live to dead -- add class dead 
    // dead to live -- add class live
    // dead to dead -- no update

// update grid   
// update the cells -- 
    // class dead : remove live and dead 


