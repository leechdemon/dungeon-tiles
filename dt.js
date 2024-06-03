const version = '';
const dungeon = document.getElementById('dungeon');

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
	
	if( paths.left ) { drawList.push( paths.left ); }
	if( paths.right ) { drawList.push( paths.right ); }
	if( paths.top ) { drawList.push( paths.top); }
	if( paths.bottom ) { drawList.push( paths.bottom ); }
}
function AssignTile( id ) {
	var tiles = { 'X' : false, 'T1' : false, 'T2' : false, 'T3' : false, 'T4' : false, 'hallway1' : false, 'hallway2' : false, 'cap1' : false, 'cap2' : false, 'cap3' : false, 'cap4' : false };
	var paths = GetNeighborArray( id );
	var neighborTilesetArray = GetNeighborTilesetArray( paths );
	
	/* First-card Force */
	if( drawList.length == 1 ) {
		tiles.X = true;
	}
	else {
		/* Add to array based on current paths */
//		if( paths.top && paths.bottom && paths.left && paths.right ) { tiles.X = true; }
//		
//		if( paths.right && paths.bottom && paths.left) { tiles.T1 = true; }
//		if( paths.bottom && paths.left && paths.top ) { tiles.T2 = true; }
//		if( paths.left && paths.top && paths.right ) { tiles.T3 = true; }
//		if( paths.top && paths.right && paths.bottom ) { tiles.T4 = true; }
////		
//		if( paths.left && paths.right) {
////			console.log('hallway1');
////			if( !paths.top.bottom && !paths.bottom.top ) {
//				tiles.hallway1 = true;
////			}
//		}
//		if( paths.top && paths.bottom) {
////			console.log('hallway2');
////			if( !paths.left.right && !paths.right.left ) {
//				tiles.hallway2 = true;
////			}
//		}
//		
//		console.log( 'neighborTilesetArray ('+id+')', neighborTilesetArray );

		if( neighborTilesetArray.left.right == id ) {
			if( !neighborTilesetArray.top.bottom && !neighborTilesetArray.right.left && !neighborTilesetArray.bottom.top ) {
				tiles.cap1 = true;
			}

			if( neighborTilesetArray.right ) {
				if ( neighborTilesetArray.right.left == 'blank' || !neighborTilesetArray.right.left ) {
					if( !neighborTilesetArray.bottom.top && !neighborTilesetArray.top.bottom ) {
						tiles.hallway1 = true;
					}

					if (neighborTilesetArray.top == 'blank' || !neighborTilesetArray.top.bottom ) {
						tiles.T1 = true;
					} else if (neighborTilesetArray.bottom == 'blank' || !neighborTilesetArray.bottom.top ) {
						tiles.T3 = true;
					}
				}
			}
		}
		if( neighborTilesetArray.top.bottom == id ) {
			if( !neighborTilesetArray.right.left && !neighborTilesetArray.bottom.top && !neighborTilesetArray.left.right ) {
				tiles.cap2 = true;
			}

			if( neighborTilesetArray.bottom ) {
				if ( neighborTilesetArray.bottom.top == 'blank' || !neighborTilesetArray.bottom.top ) {
					if( !neighborTilesetArray.left.right && !neighborTilesetArray.right.left ) {
						tiles.hallway2 = true;
					}

					if (neighborTilesetArray.right == 'blank' || !neighborTilesetArray.right.left ) {
						tiles.T4 = true;
					} else if (neighborTilesetArray.left == 'blank' || !neighborTilesetArray.left.right ) {
						tiles.T2 = true;
					}
				}
			}
		}
		if( neighborTilesetArray.right.left == id ) {
			if( !neighborTilesetArray.bottom.top && !neighborTilesetArray.left.right && !neighborTilesetArray.top.bottom ) {
				tiles.cap3 = true;
			}

			if( neighborTilesetArray.left ) {
				if ( neighborTilesetArray.left.right == 'blank' || !neighborTilesetArray.left.right ) {
					if( !neighborTilesetArray.top.bottom && !neighborTilesetArray.bottom.top ) {
						tiles.hallway1 = true;
					}

					if ( neighborTilesetArray.bottom == 'blank' || !neighborTilesetArray.bottom.top ) {
						tiles.T3 = true;
					} else if ( neighborTilesetArray.top == 'blank' || !neighborTilesetArray.top.bottom ) {
						tiles.T1 = true;
					}
				}
			}
		}
		if( neighborTilesetArray.bottom.top == id ) {
			if( !neighborTilesetArray.left.right && !neighborTilesetArray.right.left && !neighborTilesetArray.bottom.top ) {
				tiles.cap4 = true;
			}

			if( neighborTilesetArray.top ) {
				if ( neighborTilesetArray.top.bottom == 'blank' || !neighborTilesetArray.top.bottom ) {
					if( !neighborTilesetArray.right.left && !neighborTilesetArray.left.right ) {
						tiles.hallway2 = true;
					}

					if (neighborTilesetArray.left == 'blank' || !neighborTilesetArray.left.right ) {
						tiles.T2 = true;
					} else if (neighborTilesetArray.right == 'blank' || !neighborTilesetArray.right.left ) {
						tiles.T4 = true;
					}
				}
			}
		}
		if( neighborTilesetArray.left && neighborTilesetArray.top && neighborTilesetArray.right && neighborTilesetArray.bottom ) {
			if( ( neighborTilesetArray.left == 'blank' || neighborTilesetArray.left.right == id ) &&
				( neighborTilesetArray.top == 'blank' || neighborTilesetArray.top.bottom == id ) &&
				( neighborTilesetArray.right == 'blank' || neighborTilesetArray.right.left == id ) &&
				( neighborTilesetArray.bottom == 'blank' || neighborTilesetArray.bottom.top == id ) ) {
				tiles.X = true;
			}
		}
		
	
		
//		/* Remove from array based on neighbor tiles */
//		if( !neighborTilesetArray.left.right ) {
//			tiles.X = false;
//			
//			
//		}
	}

//	console.log('tiles ('+id+')', tiles);		
	for(var key in tiles) { if(!tiles[key]) delete tiles[key]; }
//	console.log('tiles ('+id+')', tiles);		

	/* Assign random tile from list */
	var div = document.getElementById( 'tile_' + id );
	const randomObjectValue = tiles => Object.keys(tiles)[(Math.random() * Object.keys(tiles).length) | 0];
	var randomProp = '';
	
	var hallwayLength = document.getElementById( 'hallwayLength' ).value;
	for( var x = 0; x <= hallwayLength; x++ ) {
		if( randomProp != 'hallway1' && randomProp != 'hallway2' ) {
			randomProp = randomObjectValue( tiles );
		} else {
			break;
		}
	}
	div.classList.add( 'tile-' + randomProp );
	div.classList.replace('tile-blank', 'tile');
//	console.log('tiles ('+id+')', tiles);		
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
	var tilesetPaths = { 'blank': false, 'left' : false, 'top' : false, 'right' : false, 'bottom' : false };

	for( var c in targetTile.classList ) {
		if( c >= 0 ) {
			switch ( targetTile.classList[c] ) {
				case 'tile-blank' :
					tilesetPaths = { 'blank': true, 'left' : true, 'top' : true, 'right' : true, 'bottom' : true };
					break;
				case 'tile-X' :
					tilesetPaths = { 'blank' : false, 'left' : true, 'top' : true, 'right' : true, 'bottom' : true };
					break;
				case 'tile-T1' : 
					tilesetPaths = { 'blank' : false, 'left' : true, 'top' : false, 'right' : true, 'bottom' : true };
					break;
				case 'tile-T2' : 
					tilesetPaths = { 'blank' : false, 'left' : true, 'top' : true, 'right' : false, 'bottom' : true };
					break;
				case 'tile-T3' : 
					tilesetPaths = { 'blank' : false, 'left' : true, 'top' : true, 'right' : true, 'bottom' : false };
					break;
				case 'tile-T4' : 
					tilesetPaths = { 'blank' : false, 'left' : false, 'top' : true, 'right' : true, 'bottom' : true };
					break;
				case 'tile-hallway1' : 
					tilesetPaths = { 'blank' : false, 'left' : true, 'top' : false, 'right' : true, 'bottom' : false };
					break;
				case 'tile-hallway2' : 
					tilesetPaths = { 'blank' : false, 'left' : false, 'top' : true, 'right' : false, 'bottom' : true };
					break;
				case 'tile-cap1' : 
					tilesetPaths = { 'blank' : false, 'left' : true, 'top' : false, 'right' : false, 'bottom' : false };
					break;
				case 'tile-cap2' : 
					tilesetPaths = { 'blank' : false, 'left' : false, 'top' : true, 'right' : false, 'bottom' : false };
					break;
				case 'tile-cap3' : 
					tilesetPaths = { 'blank' : false, 'left' : false, 'top' : false, 'right' : true, 'bottom' : false };
					break;
				case 'tile-cap4' : 
					tilesetPaths = { 'blank' : false, 'left' : false, 'top' : false, 'right' : false, 'bottom' : true };
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
function GetNeighborTilesetArray( paths ) {
	var tilesetArray = { 'left' : false, 'top' : false, 'right' : false, 'bottom' : false };
	for( var direction in paths ) {
		if( paths[direction] ) {
			tilesetArray[direction] = GetNeighborByTileset( paths[direction] );
			if( tilesetArray[direction].blank ) { tilesetArray[direction] = 'blank'; }
		}
	}
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


	drawList = [ GetTileIdFromCoordinates( [ startRow, startCol ] ) ];
	DrawDungeon();
}
function DisplayTileLabels( drawList_x, id ) {
	var display = 'display: none; ';
	if( displayTileLabels.checked ) { display = 'display: flex; '; }

	var thisLabel = GetTileFromCoordinates( GetCoordinatesFromId( id ) );
	thisLabel.innerHTML = '<div class="tileLabel" style="'+display+'"><div>#' +drawList_x+'</div><div style="clear: both;">Tile_'+id+'</div></div>';
}
function DrawDungeon() {
	var drawLimit = document.getElementById( 'tool_limit' ).value;
	for( var x = 0; x < drawLimit; x++ ) {		
		if( drawList[x] ) {
//			console.log('DRAWLIST', x);
			
			if( GetTileFromCoordinates( GetCoordinatesFromId( drawList[x] ) ).classList.contains('tile-blank') ) {
				AssignTile( drawList[x] );
				DisplayTileLabels( x, drawList[x] );
				
				DrawList_AddNeighbors( drawList[x] );
			}
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