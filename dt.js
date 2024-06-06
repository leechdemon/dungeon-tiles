const version = '';
const dungeon = { 'tiles' : [] };
const dungeonWindow = document.getElementById('dungeonWindow');

const displayTileLabels = document.getElementById('displayTileLabels')
displayTileLabels.addEventListener('change', (event) => {
	var tileLabels = document.getElementsByClassName('tileLabel');
	
	for(var x in tileLabels) {
		if( tileLabels[x].style ) {
			if (event.currentTarget.checked) {
				tileLabels[x].style.display = 'block';
			} else {
				tileLabels[x].style.display = 'none';
			}
		}
	}
})

var gridWidth = 0;
var gridHeight = 0;

var startCol = 0;
var startRow = 0;
var drawList = [];


/* Jason */
/* Instead of using a complicated "serial-if" argument... */
	/* ...What if we combine the Neighbor arrays to create a single array for "Do I get to draw something here?" */
	/* Then, each Tile Assignment is a single-dimensional array. */


function DrawList_AddNeighbors( id  ) {
	var paths = GetNeighborByTileset( id );
	
	if( paths.left && !drawList.includes( paths.left ) ) { drawList.push( paths.left ); }
	if( paths.right && !drawList.includes( paths.right ) ) { drawList.push( paths.right ); }
	if( paths.top && !drawList.includes( paths.top ) ) { drawList.push( paths.top); }
	if( paths.bottom && !drawList.includes( paths.bottom ) ) { drawList.push( paths.bottom ); }
}
function DrawList_AddNeighbors2( id  ) {
	var paths = GetNeighborByTileset( id );

	if( paths.left && document.getElementById('tile_'+paths.left).classList.contains('tile-blank') ) { document.getElementById( 'tile_'+paths.left ).classList.add( 'move-available' ); }
	if( paths.right && document.getElementById('tile_'+paths.right).classList.contains('tile-blank') ) { document.getElementById( 'tile_'+paths.right ).classList.add( 'move-available' ); }
	if( paths.top && document.getElementById('tile_'+paths.top).classList.contains('tile-blank') ) { document.getElementById( 'tile_'+paths.top ).classList.add( 'move-available'); }
	if( paths.bottom && document.getElementById('tile_'+paths.bottom).classList.contains('tile-blank') ) { document.getElementById( 'tile_'+paths.bottom ).classList.add( 'move-available' ); }
}
function AssignTile( id ) {
	document.getElementById('tile_' + id).classList.remove('move-available');
	drawList.push( id );
	
	var tiles = { 'X' : false, 'T1' : false, 'T2' : false, 'T3' : false, 'T4' : false, 'hallway1' : false, 'hallway2' : false, 'cap1' : false, 'cap2' : false, 'cap3' : false, 'cap4' : false };
	var paths = GetNeighborArray( id );
	var neighborTilesetArray = GetNeighborTilesetArray( paths );

	
//	console.log(id, 'paths', paths );
//	console.log(id, 'neighborTilesetArray', neighborTilesetArray );
//	console.log( 'neighborTilesetArray', neighborTilesetArray );
	
	/* First-card Force */
	if( drawList.length == 1 ) {
		tiles.X = true;
	}
	else {
		
//		console.log( id, 'neighborTilesetArray', neighborTilesetArray );

		if( neighborTilesetArray.left.right == id ) {
			if( !neighborTilesetArray.top.bottom && !neighborTilesetArray.right.left && !neighborTilesetArray.bottom.top ) {
//				tiles.cap1 = true;
			}

			if( neighborTilesetArray.right ) {
				if ( neighborTilesetArray.right.left == 'blank' || !neighborTilesetArray.right.left ) {
					if( !neighborTilesetArray.bottom.top && !neighborTilesetArray.top.bottom ) {
						tiles.hallway1 = true;
					}

//					if (neighborTilesetArray.top == 'blank' || !neighborTilesetArray.top.bottom ) {
//						tiles.T1 = true;
//					} else if (neighborTilesetArray.bottom == 'blank' || !neighborTilesetArray.bottom.top ) {
//						tiles.T3 = true;
//					}
				}
			}
		}
		if( neighborTilesetArray.top.bottom == id ) {
			if( !neighborTilesetArray.right.left && !neighborTilesetArray.bottom.top && !neighborTilesetArray.left.right ) {
//				tiles.cap2 = true;
			}

			if( neighborTilesetArray.bottom ) {
				if ( neighborTilesetArray.bottom.top == 'blank' || !neighborTilesetArray.bottom.top ) {
					if( !neighborTilesetArray.left.right && !neighborTilesetArray.right.left ) {
						tiles.hallway2 = true;
					}

//					if (neighborTilesetArray.right == 'blank' || !neighborTilesetArray.right.left ) {
//						tiles.T4 = true;
//					} else if (neighborTilesetArray.left == 'blank' || !neighborTilesetArray.left.right ) {
//						tiles.T2 = true;
//					}
				}
			}
		}
		if( neighborTilesetArray.right.left == id ) {
			if( !neighborTilesetArray.bottom.top && !neighborTilesetArray.left.right && !neighborTilesetArray.top.bottom ) {
//				tiles.cap3 = true;
			}

			if( neighborTilesetArray.left ) {
				if ( neighborTilesetArray.left.right == 'blank' || !neighborTilesetArray.left.right ) {
					if( !neighborTilesetArray.top.bottom && !neighborTilesetArray.bottom.top ) {
						tiles.hallway1 = true;
					}

//					if ( neighborTilesetArray.bottom == 'blank' || !neighborTilesetArray.bottom.top ) {
//						tiles.T3 = true;
//					} else if ( neighborTilesetArray.top == 'blank' || !neighborTilesetArray.top.bottom ) {
//						tiles.T1 = true;
//					}
				}
			}
		}
		if( neighborTilesetArray.bottom.top == id ) {
			if( !neighborTilesetArray.left.right && !neighborTilesetArray.right.left && !neighborTilesetArray.bottom.top ) {
//				tiles.cap4 = true;
			}

			if( neighborTilesetArray.top ) {
				if ( neighborTilesetArray.top.bottom == 'blank' || !neighborTilesetArray.top.bottom ) {
					if( !neighborTilesetArray.right.left && !neighborTilesetArray.left.right ) {
						tiles.hallway2 = true;
					}

//					if (neighborTilesetArray.left == 'blank' || !neighborTilesetArray.left.right ) {
//						tiles.T2 = true;
//					} else if (neighborTilesetArray.right == 'blank' || !neighborTilesetArray.right.left ) {
//						tiles.T4 = true;
//					}
				}
			}
		}
		
		/* Should 'X' be added? */
//		if( neighborTilesetArray.left && neighborTilesetArray.top && neighborTilesetArray.right && neighborTilesetArray.bottom ) {
//			if( ( neighborTilesetArray.left == 'blank' || neighborTilesetArray.left.right == id ) &&
//				( neighborTilesetArray.top == 'blank' || neighborTilesetArray.top.bottom == id ) &&
//				( neighborTilesetArray.right == 'blank' || neighborTilesetArray.right.left == id ) &&
//				( neighborTilesetArray.bottom == 'blank' || neighborTilesetArray.bottom.top == id ) ) {
//				tiles.X = true;
//			}
//		}
		
	}

	for(var key in tiles) { if(!tiles[key]) delete tiles[key]; }

	/* Assign random tile from list */
	var div = document.getElementById( 'tile_' + id );
	const randomObjectValue = tiles => Object.keys(tiles)[(Math.random() * Object.keys(tiles).length) | 0];
	var randomProp = randomObjectValue( tiles );
	
	var neighborIsHallway = false;
//	if( neighborTilesetArray.left != 'blank' && neighborTilesetArray.left ) { neighborIsHallway = true; } 

	if( neighborIsHallway ) {
		var hallwayLength = document.getElementById( 'hallwayLength' ).value;
		for( var x = 0; x <= hallwayLength; x++ ) {
			if( randomProp != 'hallway1' && randomProp != 'hallway2' ) {
				randomProp = randomObjectValue( tiles );
			} else {
				break;
			}
		}
	}
	
	
	dungeon.tiles[id].type = randomProp;
	dungeon.tiles[id].type_options = tiles;
	div.classList.add( 'tile-' + randomProp );
	div.classList.replace('tile-blank', 'hiddenTile');
//	div.classList.remove('tile-blank');
	
	DrawList_AddNeighbors2( id );
	AutoDrawHallwayTiles( id );
//	console.log( 'dungeon.tiles['+id+']', dungeon.tiles[id].type, dungeon.tiles[id].type_options);
}
function AutoDrawHallwayTiles( id ) {
	var paths = GetNeighborArray( id );
	var tileType = GetTileTypeFromId( id );
	
	if( tileType == 'hallway1' && GetTileTypeFromId(paths.left) == 'blank' ) { AssignTile( paths.left ); }
	if( tileType == 'hallway1' && GetTileTypeFromId(paths.right) == 'blank' ) { AssignTile( paths.right ); }
	if( tileType == 'hallway2' && GetTileTypeFromId(paths.top) == 'blank' ) { AssignTile( paths.top ); }
	if( tileType == 'hallway2' && GetTileTypeFromId(paths.bottom) == 'blank' ) { AssignTile( paths.bottom ); }
}
function GetTileTypeFromId( id ) {
	var tileType = dungeon.tiles[id].type;
	
	return tileType;
}


function CreateDungeonGrid() {
	var tileCount = 1;
	dungeon.tiles = [];
	dungeonWindow.innerHTML = '';

	var tileWidth = Math.floor(dungeonWindow.offsetWidth / gridWidth ) +'px'; 

	for(var x = 1; x <= gridHeight; x++) {
		for(var y = 1; y <= gridWidth; y++) {
			var newDiv = document.createElement('div');
			newDiv.id = 'tile_' + tileCount;
			dungeon.tiles[ tileCount ] = { 'id' : tileCount, 'type' : 'blank' };
			dungeon.tiles[ tileCount ].neighbors = [];
			dungeon.tiles[ tileCount ].coordinates = { 'x' : y, 'y': x };
			tileCount++;
			
			newDiv.classList.add( 'row_' + x );
			newDiv.classList.add( 'col_' + y );
			newDiv.classList.add( 'tile-blank' );
			newDiv.style.width = tileWidth;
			newDiv.style.height = tileWidth;
			dungeonWindow.appendChild(newDiv);

			if(y == 1) { newDiv.classList.add('clear'); }
		}
	}
}
function GetNeighborArray( id ) {
	var edgePaths = { 'left' : false, 'top' : false, 'right' : false, 'bottom' : false };

	var coordinates = dungeon.tiles[id].coordinates;
	/* Force us to stay on the grid */
	if( coordinates.x != 1 ) { edgePaths.left = GetTileIdFromCoordinates( [ coordinates.x - 1, coordinates.y ] ); }
	if( coordinates.x != gridWidth ) { edgePaths.right = GetTileIdFromCoordinates( [ coordinates.x + 1, coordinates.y ] ); }
	if( coordinates.y != 1 ) { edgePaths.top = GetTileIdFromCoordinates( [ coordinates.x, coordinates.y - 1 ] ); }
	if( coordinates.y != gridHeight ) { edgePaths.bottom = GetTileIdFromCoordinates( [ coordinates.x, coordinates.y + 1 ] ); }

	
	/* Check for tile assignments */
	var tilesetPaths = GetNeighborByTileset( id );
	
	var neighbors = { 'left' : false, 'top' : false, 'right' : false, 'bottom' : false };
	if( edgePaths.left && tilesetPaths.left ) { neighbors.left = edgePaths.left; }
	if( edgePaths.right && tilesetPaths.right ) { neighbors.right = edgePaths.right; }
	if( edgePaths.top && tilesetPaths.top ) { neighbors.top = edgePaths.top; }
	if( edgePaths.bottom && tilesetPaths.bottom ) { neighbors.bottom = edgePaths.bottom; }
	
	console.log( 'edgePaths', edgePaths );
	console.log( 'tilesetPaths', tilesetPaths );
	console.log( 'neighbors', neighbors );

	dungeon.tiles[id].neighbors = neighbors;
//	dungeon.tiles[id].edgePaths = edgePaths;
	return neighbors;
}
function GetNeighborByTileset( id ) {	
	var coordinates = dungeon.tiles[id].coordinates;
	var tilesetPaths = [];

	switch ( dungeon.tiles[id].type ) {
		case 'blank' :
			tilesetPaths = { 'left' : true, 'top' : true, 'right' : true, 'bottom' : true };
			break;
		case 'blocked' :
			tilesetPaths = { 'left' : false, 'top' : false, 'right' : false, 'bottom' : false };
			break;
		case 'X' :
			tilesetPaths = { 'left' : true, 'top' : true, 'right' : true, 'bottom' : true };
			break;
		case 'T1' : 
			tilesetPaths = { 'left' : true, 'top' : false, 'right' : true, 'bottom' : true };
			break;
		case 'T2' : 
			tilesetPaths = { 'left' : true, 'top' : true, 'right' : false, 'bottom' : true };
			break;
		case 'T3' : 
			tilesetPaths = { 'left' : true, 'top' : true, 'right' : true, 'bottom' : false };
			break;
		case 'T4' : 
			tilesetPaths = { 'left' : false, 'top' : true, 'right' : true, 'bottom' : true };
			break;
		case 'hallway1' : 
			tilesetPaths = { 'left' : true, 'top' : false, 'right' : true, 'bottom' : false };
			break;
		case 'hallway2' : 
			tilesetPaths = { 'left' : false, 'top' : true, 'right' : false, 'bottom' : true };
			break;
		case 'cap1' : 
			tilesetPaths = { 'left' : true, 'top' : false, 'right' : false, 'bottom' : false };
			break;
		case 'cap2' : 
			tilesetPaths = { 'left' : false, 'top' : true, 'right' : false, 'bottom' : false };
			break;
		case 'cap3' : 
			tilesetPaths = { 'left' : false, 'top' : false, 'right' : true, 'bottom' : false };
			break;
		case 'cap4' : 
			tilesetPaths = { 'left' : false, 'top' : false, 'right' : false, 'bottom' : true };
			break;
	}
	
	if( tilesetPaths.left ) { tilesetPaths.left = ( GetTileIdFromCoordinates( [ coordinates.x - 1, coordinates.y ] ) ); }
	if( tilesetPaths.right ) { tilesetPaths.right = ( GetTileIdFromCoordinates( [ coordinates.x + 1, coordinates.y ] ) ); }
	if( tilesetPaths.top ) { tilesetPaths.top = ( GetTileIdFromCoordinates( [ coordinates.x, coordinates.y - 1 ] ) ); }
	if( tilesetPaths.bottom ) { tilesetPaths.bottom = ( GetTileIdFromCoordinates( [ coordinates.x, coordinates.y + 1 ] ) ); }
	
	return tilesetPaths;
}
function GetNeighborTilesetArray( paths ) {
	var tilesetArray = { 'left' : false, 'top' : false, 'right' : false, 'bottom' : false };
	
	if( paths.left ) { tilesetArray.left = GetNeighborByTileset( paths.left ); }
	if( paths.right ) { tilesetArray.right = GetNeighborByTileset( paths.right ); }
	if( paths.top ) { tilesetArray.top = GetNeighborByTileset( paths.top ); }
	if( paths.bottom ) { tilesetArray.bottom = GetNeighborByTileset( paths.bottom ); }
	
	return tilesetArray;
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


	AssignTile( GetTileIdFromCoordinates( [ startRow, startCol ] ) );
}
function DisplayTileLabels( drawList_x, id ) {
	var display = 'display: none; ';
	if( displayTileLabels.checked ) { display = 'display: flex; '; }

	var thisLabel = document.getElementById(id);
	thisLabel.innerHTML = '<div class="tileLabel" style="'+display+'"><div>#' +drawList_x+'</div><div style="clear: both;">Tile_'+id+'</div></div>';
}
function TileReveal( x ) {
	setTimeout( function() {
		var thisDiv = document.getElementById( 'tile_' + drawList[x] );
		if( thisDiv ) { thisDiv.classList.replace('hiddenTile', 'tile'); }
	}, 0050 * x );
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