const dungeon = document.getElementById('dungeon');
var gridWidth = 0;
var gridHeight = 0;

var startCol = 0;
var startRow = 0;
var startingCoordinates = [0, 0];
var tileWidth = 0;

function BuildTileList(id, neighbors) {
	var tiles = [];

//							for( n in neighbors ) {
//								if( neighbors[n] ) {
			var tileId = id - 1; 
			var paths = DetermineTileWalls( id );
//								}
//							}
}
function CreateDungeon() {
	var tileCount = 1;
	dungeon.innerHTML = '';

	startingCoordinates = [startCol, startRow];
	tileWidth = Math.floor(dungeon.offsetWidth / gridWidth ) +'px'; 

	for(var x = 1; x <= gridHeight; x++) {
		for(var y = 1; y <= gridWidth; y++) {
			var newDiv = document.createElement('div');
			newDiv.id = 'tile_' + tileCount;
			tileCount++;
			newDiv.classList.add( 'row_' + x );
			newDiv.classList.add( 'col_' + y );
			newDiv.classList.add( 'tile-blank' );
			newDiv.style.width = tileWidth;
			newDiv.style.height = tileWidth;
			dungeon.appendChild(newDiv);

			if(y == 1) { newDiv.classList.add('clear'); }

		}
	}
}
function DetermineNeighborPaths(coordinates) {
	var neighbors = { 'left' : false, 'top' : false, 'right' : false, 'bottom' : false };

	if( coordinates[0] != 1 ) { neighbors.left = true; }
	if( coordinates[0] != gridWidth ) { neighbors.right = true; }
	if( coordinates[1] != 1 ) { neighbors.top = true; }
	if( coordinates[1] != gridHeight ) { neighbors.bottom = true; }

	return neighbors;
}
function DeterminePathsFromCoordinates( coordinates ) {
	var queryString = '.col_'+coordinates[0]+'.row_'+coordinates[1];
	var targetTile = document.querySelectorAll( queryString )[0];
	var paths = '';

	for( var c in targetTile.classList ) {
		if( c >= 0 ) {
			switch ( targetTile.classList[c] ) {
				case 'tile-X' :
					paths = { 'left' : true, 'top' : true, 'right' : true, 'bottom' : true };
					break;
				case 'tile-T1' : 
					paths = { 'left' : true, 'top' : false, 'right' : true, 'bottom' : true };
					break;
				case 'tile-T2' : 
					paths = { 'left' : true, 'top' : true, 'right' : false, 'bottom' : true };
					break;
				case 'tile-T3' : 
					paths = { 'left' : true, 'top' : true, 'right' : true, 'bottom' : false };
					break;
				case 'tile-T4' : 
					paths = { 'left' : false, 'top' : true, 'right' : true, 'bottom' : true };
					break;
				case 'tile-hallway1' : 
					paths = { 'left' : true, 'top' : false, 'right' : true, 'bottom' : false };
					break;
				case 'tile-hallway2' : 
					paths = { 'left' : false, 'top' : true, 'right' : false, 'bottom' : true };
					break;
				case 'tile-cap1' : 
					paths = { 'left' : true, 'top' : false, 'right' : false, 'bottom' : false };
					break;
				case 'tile-cap2' : 
					paths = { 'left' : false, 'top' : true, 'right' : false, 'bottom' : false };
					break;
				case 'tile-cap3' : 
					paths = { 'left' : false, 'top' : false, 'right' : true, 'bottom' : false };
					break;
				case 'tile-cap4' : 
					paths = { 'left' : false, 'top' : false, 'right' : false, 'bottom' : true };
					break;
			}
		}
	}

	return paths;
}
function DrawDungeon() {
	startCol = document.getElementById('dungeon_startingCol').value;
	startRow = document.getElementById('dungeon_startingRow').value;
	gridWidth = document.getElementById('dungeon_width').value;
	gridHeight = document.getElementById('dungeon_height').value;

	if( Number(startCol) > Number(gridWidth) ) { startCol = gridWidth; document.getElementById('dungeon_startingCol').value = startCol; }
	if( Number(startRow) > Number(gridHeight) ) { startRow = gridHeight; document.getElementById('dungeon_startingRow').value = startRow; }


	CreateDungeon();

	var drawList = [];
	var referenceList = [];
	drawList.push( startingCoordinates );
	referenceList.push( startingCoordinates );

	var limit = document.getElementById( 'tool_limit' ).value;
	for( var x = 0; x < limit; x++ ) {
		if( drawList[x] ) {
//									console.log("x - " +x);
			var div = DrawTile( drawList[x], referenceList[x] );

//									console.log(drawList[x]);
//									console.log( JSON.stringify(drawList) );

			var paths = DeterminePathsFromCoordinates( drawList[x] );
			if( paths.left ) {
				var col = drawList[x][0];
				var row = drawList[x][1];
				col--;
				if( col == 0 ) { col = 1; }

				var thisDiv = GetTileFromCoordinates([col, row]);
				if( thisDiv.classList.contains('tile-blank')) { 
					drawList.push( [col, row] );
					referenceList.push( drawList[x] );
				}
			}
			if( paths.right ) {
				var col = drawList[x][0];
				var row = drawList[x][1];
				col++;
				if( col > gridWidth ) { col = gridWidth; }

				var thisDiv = GetTileFromCoordinates([col, row]);
				if( thisDiv.classList.contains('tile-blank')) { 
					drawList.push( [col, row] );
					referenceList.push( drawList[x] );
				}

			}
			if( paths.top ) {
				var col = drawList[x][0];
				var row = drawList[x][1];
				row--;
				if( row == 0 ) { row = 1; }

				var thisDiv = GetTileFromCoordinates([col, row]);
				if( thisDiv.classList.contains('tile-blank')) { 
					drawList.push( [col, row] );
					referenceList.push( drawList[x] );
				}
			}
			if( paths.bottom ) {
				var col = drawList[x][0];
				var row = drawList[x][1];
				row++;
				if( row > gridHeight ) { row = gridHeight; }		

				var thisDiv = GetTileFromCoordinates([col, row]);
				if( thisDiv.classList.contains('tile-blank')) { 
					drawList.push( [col, row] );
					referenceList.push( drawList[x] );
				}
			}
		}
	}

}
function DrawTile( coordinates, referenceCoordinates ) {
	var queryString = '.col_x.row_y'.replace('x', coordinates[0]).replace('y', coordinates[1]);
	var div = document.querySelectorAll( queryString )[0];

	var tiles = ['X', 'T1', 'T2', 'T3', 'T4', 'hallway1', 'hallway2', 'hallway1', 'hallway2',  'hallway1', 'hallway2', 'hallway1', 'hallway2',  'hallway1', 'hallway2', 'hallway1', 'hallway2', 'cap1', 'cap2', 'cap3',  'cap4', 'cap1', 'cap2', 'cap3',  'cap4'];
	if( coordinates == startingCoordinates ) {
		div.classList.add( 'tile-X' );
		console.log('(force X)');
	} else {
		console.log( coordinates, referenceCoordinates );
//								console.log( referenceCoordinates );
//								console.log( row - 1 );

		if( coordinates[0] + 1 == referenceCoordinates[0] ) {
			/* Border is to the right */
			tiles = ['X', 'T1', 'T3', 'T4', 'hallway1', 'hallway1', 'hallway1', 'hallway1', 'hallway1', 'hallway1', 'cap3', 'cap3'];
			console.log('a');
		} else if( coordinates[0] - 1 == referenceCoordinates[0] ) {
			/* Border is to the left */
			tiles = ['X', 'T1', 'T2', 'T3', 'hallway1', 'hallway1', 'hallway1', 'hallway1', 'hallway1', 'hallway1', 'cap1', 'cap1'];
			console.log('b');
		} else if( coordinates[1] + 1 == referenceCoordinates[1] ) {
			/* Border is to the bottom */
			tiles = ['X', 'T1', 'T2', 'T4', 'hallway2', 'hallway2', 'hallway2', 'hallway2', 'hallway2', 'hallway2', 'cap4', 'cap4'];
			console.log('c');
		} else if( coordinates[1] - 1 == referenceCoordinates[1] ) {
			/* Border is to the top */
			tiles = ['X', 'T2', 'T3', 'T4', 'hallway2',  'hallway2',  'hallway2',  'hallway2',  'hallway2',  'hallway2',  'cap2',  'cap2'];
			console.log('d');
		} else { console.log('else'); }

		randInt = Math.floor( Math.random() * tiles.length);
//								console.log( JSON.stringify(coordinates) );
//								console.log( JSON.stringify(referenceCoordinates) );
//								console.log( tiles );
		div.classList.add( 'tile-' + tiles[randInt] );
	}
	div.classList.replace('tile-blank', 'tile');

	return div;
}
function GetTileCoordinates( tile ) {
	var tile = document.getElementById( tile );
	var x = 0;
	var y = 0;

	for( var c in tile.classList ) {
		if( tile.classList[c].contains('col') ) {
			x = tile.classList[c].replace('col_', '');
		}
		if( tile.classList[c].contains('row') ) {
			y = tile.classList[c].replace('row_', '');
		}
	}

	return [x, y];
}
function GetTileFromCoordinates( coordinates ) {
	var queryString = '.col_'+coordinates[0]+'.row_'+coordinates[1];
	var targetTile = document.querySelectorAll( queryString )[0];

	return targetTile;
}

DrawDungeon();