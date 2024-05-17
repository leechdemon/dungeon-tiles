const dungeon = document.getElementById('dungeon');
var gridWidth = 0;
var gridHeight = 0;

var startCol = 0;
var startRow = 0;
var drawList = [];


function DrawList_AddNeighbors( id  ) {
	var paths = GetNeighborByTileset( id );
//	console.log('PATHS', paths);
	
	if( paths.left ) { console.log(); drawList.push( paths.left ); }
	if( paths.right ) { console.log(); drawList.push( paths.right ); }
	if( paths.top ) { console.log(); drawList.push( paths.top); }
	if( paths.bottom ) { console.log(); drawList.push( paths.bottom ); }
}
function AssignTile( id ) {
	var tiles = [];
	var paths = GetNeighborArray( id );

//	console.log( paths );
	
	console.log('ID', id);
	console.log('PATHS', paths);
	
	/* Jason */
	/* Redo this part */
	/* Currently, it's set to add items additively, based on it's own neighbors. BUT, not based on neighborcards. Either create multiplicitive array logic based on neighbor pairs, or add items to Tiles, then go back and remove conditionally. */
	
	/* Add tile options */
	if( paths.left ) {
		tiles.push( 'cap1' );
	}
	if( paths.top ) {
		tiles.push( 'cap2' );
	}
	if( paths.right ) {
		tiles.push( 'cap3' );
	}
	if( paths.bottom ) {
		tiles.push( 'cap4' );
	}
	
//	if( paths.left && paths.right ) { tiles.push( 'hallway1' ); }
//	if( paths.top && paths.bottom ) { tiles.push( 'hallway2' ); }

//	if( paths.left && paths.bottom && paths.right ) { tiles.push( 'T1' ); }
//	if( paths.top && paths.left && paths.bottom ) { tiles.push( 'T2' ); }
//	if( paths.left && paths.top && paths.right ) { tiles.push( 'T3' ); }
//	if( paths.top && paths.right && paths.bottom ) { tiles.push( 'T4' ); }

	if( paths.top && paths.bottom && paths.left && paths.right ) { tiles.push( 'X' ); }
	console.log(tiles);

	/* First-card Force */
	if( drawList.length == 1 ) { tiles = ['X']; }

	/* Assign random tile from list */
	var randInt = Math.floor( Math.random() * tiles.length);

	var div = document.getElementById( 'tile_' + id );
	div.classList.add( 'tile-' + tiles[randInt] );
	div.classList.replace('tile-blank', 'tile');
}
function CreateDungeonGrid() {
	var tileCount = 1;
	dungeon.innerHTML = '';

	var tileWidth = Math.floor(dungeon.offsetWidth / gridWidth ) +'px'; 

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
function GetNeighborArray( id ) {
	var edgePaths = { 'left' : false, 'top' : false, 'right' : false, 'bottom' : false };

	var coordinates = GetCoordinatesFromId( id );
	/* Force us to stay on the grid */
	if( coordinates[0] != 1 ) { edgePaths.left = GetTileIdFromCoordinates( [ coordinates[0] - 1, coordinates[1] ] ); }
	if( coordinates[0] != gridWidth ) { edgePaths.right = GetTileIdFromCoordinates( [ coordinates[0] + 1, coordinates[1] ] ); }
	if( coordinates[1] != 1 ) { edgePaths.top = GetTileIdFromCoordinates( [ coordinates[0], coordinates[1] - 1 ] ); }
	if( coordinates[1] != gridHeight ) { edgePaths.bottom = GetTileIdFromCoordinates( [ coordinates[0], coordinates[1] + 1 ] ); }

	
	/* Check for tile assignments */
	var tilesetPaths = GetNeighborByTileset( id );
	
	var neighbors = { 'left' : false, 'top' : false, 'right' : false, 'bottom' : false };
	if( edgePaths.left && tilesetPaths.left ) { neighbors.left = edgePaths.left; }
	if( edgePaths.right && tilesetPaths.right ) { neighbors.right = edgePaths.right; }
	if( edgePaths.top && tilesetPaths.top ) { neighbors.top = edgePaths.top; }
	if( edgePaths.bottom && tilesetPaths.bottom ) { neighbors.bottom = edgePaths.bottom; }
	
	return neighbors;
}
function GetNeighborByTileset( id ) {	
	var coordinates = GetCoordinatesFromId ( id );
	var queryString = '.col_'+coordinates[0]+'.row_'+coordinates[1];
	var targetTile = document.querySelectorAll( queryString )[0];
	var tilesetPaths = { 'left' : false, 'top' : false, 'right' : false, 'bottom' : false };

	for( var c in targetTile.classList ) {
		if( c >= 0 ) {
			switch ( targetTile.classList[c] ) {
				case 'tile-blank' :
					tilesetPaths = { 'left' : true, 'top' : true, 'right' : true, 'bottom' : true };
					break;
				case 'tile-X' :
					tilesetPaths = { 'left' : true, 'top' : true, 'right' : true, 'bottom' : true };
					break;
				case 'tile-T1' : 
					tilesetPaths = { 'left' : true, 'top' : false, 'right' : true, 'bottom' : true };
					break;
				case 'tile-T2' : 
					tilesetPaths = { 'left' : true, 'top' : true, 'right' : false, 'bottom' : true };
					break;
				case 'tile-T3' : 
					tilesetPaths = { 'left' : true, 'top' : true, 'right' : true, 'bottom' : false };
					break;
				case 'tile-T4' : 
					tilesetPaths = { 'left' : false, 'top' : true, 'right' : true, 'bottom' : true };
					break;
				case 'tile-hallway1' : 
					tilesetPaths = { 'left' : true, 'top' : false, 'right' : true, 'bottom' : false };
					break;
				case 'tile-hallway2' : 
					tilesetPaths = { 'left' : false, 'top' : true, 'right' : false, 'bottom' : true };
					break;
				case 'tile-cap1' : 
					tilesetPaths = { 'left' : true, 'top' : false, 'right' : false, 'bottom' : false };
					break;
				case 'tile-cap2' : 
					tilesetPaths = { 'left' : false, 'top' : true, 'right' : false, 'bottom' : false };
					break;
				case 'tile-cap3' : 
					tilesetPaths = { 'left' : false, 'top' : false, 'right' : true, 'bottom' : false };
					break;
				case 'tile-cap4' : 
					tilesetPaths = { 'left' : false, 'top' : false, 'right' : false, 'bottom' : true };
					break;
			}
		}
	}
	
	if( tilesetPaths.left ) { tilesetPaths.left = ( GetTileIdFromCoordinates( [ coordinates[0] - 1, coordinates[1] ] ) ); }
	if( tilesetPaths.right ) { tilesetPaths.right = ( GetTileIdFromCoordinates( [ coordinates[0] + 1, coordinates[1] ] ) ); }
	if( tilesetPaths.top ) { tilesetPaths.top = ( GetTileIdFromCoordinates( [ coordinates[0], coordinates[1] - 1 ] ) ); }
	if( tilesetPaths.bottom ) { tilesetPaths.bottom = ( GetTileIdFromCoordinates( [ coordinates[0], coordinates[1] + 1 ] ) ); }
	
	return tilesetPaths;
}
function ResetDungeon() {
	startCol = parseInt( document.getElementById('dungeon_startingCol').value );
	startRow = parseInt( document.getElementById('dungeon_startingRow').value );
	gridWidth = parseInt( document.getElementById('dungeon_width').value );
	gridHeight = parseInt( document.getElementById('dungeon_height').value );

	/* Force startCol/Row to stay on the grid. */
	if( Number(startCol) > Number(gridWidth) ) { startCol = gridWidth; document.getElementById('dungeon_startingCol').value = startCol; }
	if( Number(startRow) > Number(gridHeight) ) { startRow = gridHeight; document.getElementById('dungeon_startingRow').value = startRow; }

	CreateDungeonGrid();


	drawList = [ GetTileIdFromCoordinates( [ startRow, startCol ] ) ];
	DrawDungeon();
}
function DrawDungeon() {
	var drawLimit = document.getElementById( 'tool_limit' ).value;
	for( var x = 0; x < drawLimit; x++ ) {		
		if( drawList[x] ) {
//			console.log('DRAWLIST', x);
			
			AssignTile( drawList[x] );
			DrawList_AddNeighbors( drawList[x] );
		}
	}
}
function GetCoordinatesFromId( id ) {
	var tile = document.getElementById( 'tile_'+id );
	var x = 0;
	var y = 0;

	for( var c = 0; c < tile.classList.length; c++ ) {
		if( tile.classList[c].includes('col') ) {
			x = tile.classList[c].replace('col_', '');
		}
		if( tile.classList[c] && tile.classList[c].includes('row') ) {
			y = tile.classList[c].replace('row_', '');
		}
	}
	
	return [ parseInt(x),  parseInt(y) ];
}
function GetTileFromCoordinates( coordinates ) {
	var queryString = '.col_'+coordinates[0]+'.row_'+coordinates[1];
	var targetTile = document.querySelectorAll( queryString )[0];

	return targetTile;
}
function GetTileIdFromCoordinates( coordinates ) {
	var targetTileId = false;
	
	if( ValidateCoordinates( coordinates ) ) {
		var queryString = '.col_'+coordinates[0]+'.row_'+coordinates[1];
		targetTileId = document.querySelectorAll( queryString )[0].id.replace('tile_','');
	}
	
	return targetTileId;
}
function ValidateCoordinates( coordinates ) {
	var status = false;
	
	if( coordinates[0] >= 1 && coordinates[0] <= gridWidth) {
		if( coordinates[1] >= 1 && coordinates[1] <= gridHeight) { status = true; }
	}
	
	return status;
}

ResetDungeon();