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

const autodraw = '';

function DrawList_AddNeighbors( id  ) {
	var available = dungeon.tiles[ id ].available;
	var neighbors = dungeon.tiles[ id ].neighbors;	
		
	if( available.left ) { document.getElementById( 'tile_'+neighbors.left ).classList.add( 'move-available' ); }
	if( available.right ) { document.getElementById( 'tile_'+neighbors.right ).classList.add( 'move-available' ); }
	if( available.top ) { document.getElementById( 'tile_'+neighbors.top ).classList.add( 'move-available'); }
	if( available.bottom ) { document.getElementById( 'tile_'+neighbors.bottom ).classList.add( 'move-available' ); }
}
function AssignTile( id ) {
	console.log( id );
	
	
	drawList.push( id );
	document.getElementById('limit_number').innerHTML = drawList.length;
	 
	var neighbors = dungeon.tiles[id].neighbors;
	var type_options = { 'X' : false, 'T1' : false, 'T2' : false, 'T3' : false, 'T4' : false, 'hallway1' : false, 'hallway2' : false, 'cap1' : false, 'cap2' : false, 'cap3' : false, 'cap4' : false };
	
	/* Reset this, in case there's been a change. */
		SetAvailableByNeighbors( id );
		var available = dungeon.tiles[id].available;
		SetRequiredByNeighbor( id );
		var required = dungeon.tiles[id].required;

	/* First-card Force */
	if( drawList.length == 1 ) {
		type_options.X = true;
	}
	else {
		if( required.left && !required.top && !required.right && !required.bottom ) { type_options.cap1 = true; }
		if( required.top && !required.left && !required.bottom && !required.right ) { type_options.cap2 = true; }
		if( required.right && !required.bottom && !required.left && !required.top ) { type_options.cap3 = true; }
		if( required.bottom && !required.left && !required.top && !required.right ) { type_options.cap4 = true; }
		
		if( (required.left || available.left) && !required.top && (required.right || available.right) && !required.bottom ) { type_options.hallway1 = true; }
		if( !required.left && (required.top || available.top) && !required.right && (required.bottom || available.bottom) ) { type_options.hallway2 = true; }
		
		if( (required.left || available.left) && !required.top && (required.right || available.right) && (required.bottom || available.bottom) ) { type_options.T1 = true; }
		if( (required.left || available.left) && (required.top || available.top) && !required.right && (required.bottom || available.bottom) ) { type_options.T2 = true; }
		if( (required.left || available.left) && (required.top || available.top) && (required.right | available.right) && !required.bottom ) { type_options.T3 = true; }
		if( !required.left && (required.top || available.top) && (required.right || available.right) && (required.bottom || available.bottom ) ) { type_options.T4 = true; }
		
		if( (required.left || available.left) && (required.top || available.top) && (required.right || available.right) && (required.right || available.right) ) { type_options.X = true; }		
	}
	
	/* Assign random tile from list */
		for(var key in type_options) { if(!type_options[key]) delete type_options[key]; }
		const randomObjectValue = type_options => Object.keys(type_options)[(Math.random() * Object.keys(type_options).length) | 0];
		var randomProp = randomObjectValue( type_options );

	/* Increase chance of longer hallways */
		if( ( dungeon.tiles[ neighbors.left ] && dungeon.tiles[ neighbors.left ].type == 'hallway1' ) || ( dungeon.tiles[ neighbors.right ] && dungeon.tiles[ neighbors.right ].type == 'hallway1' ) ) { var neighborIsHallway = true; }
		if( ( dungeon.tiles[ neighbors.top ] && dungeon.tiles[ neighbors.top ].type == 'hallway2' ) || ( dungeon.tiles[ neighbors.bottom ] && dungeon.tiles[ neighbors.bottom ].type == 'hallway2' ) ) { var neighborIsHallway = true; }


		if( neighborIsHallway ) {
			var hallwayLength = document.getElementById( 'hallwayLength' ).value;
			for( var x = 0; x <= hallwayLength; x++ ) {
				if( randomProp != 'hallway1' && randomProp != 'hallway2' ) {
					randomProp = randomObjectValue( type_options );
				} else {
					break;
				}
			}
		}
	
	/* %Chance of forced hallway */
		var hallwayChance = document.getElementById('hallwayChance').value / 100;
		if( Math.random() < hallwayChance ) {
			/* Force a hallway */
			if( type_options.hallway1 ) { randomProp = 'hallway1'; }
			if( type_options.hallway2 ) { randomProp = 'hallway2'; }
		} 

	/* update the dungeon object, neighbors */
		dungeon.tiles[id].type = randomProp;
		dungeon.tiles[id].type_options = type_options;

		var div = document.getElementById( 'tile_' + id );
		div.classList.add( 'tile-' + randomProp );
		div.classList.replace('tile-blank', 'tile');

	SetRequiredByTileset( id ); 
	SetAvailableByTileset( id );

	DrawList_AddNeighbors( id );
	AutoDrawHallwayTiles( id );
}
function AutoDrawHallwayTiles( id ) {
	var neighbors = dungeon.tiles[id].neighbors; 
	var tileType = dungeon.tiles[id].type;
	
	if( tileType == 'hallway1' && dungeon.tiles[ neighbors.left ].type == 'blank' ) { AssignTile( neighbors.left ); }
	if( tileType == 'hallway1' && dungeon.tiles[ neighbors.right ].type == 'blank' ) { AssignTile( neighbors.right ); }
	if( tileType == 'hallway2' && dungeon.tiles[ neighbors.top ].type == 'blank' ) { AssignTile( neighbors.top ); }
	if( tileType == 'hallway2' && dungeon.tiles[ neighbors.bottom ].type == 'blank' ) { AssignTile( neighbors.bottom ); }
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
			dungeon.tiles[ tileCount ].coordinates = { 'x' : y, 'y': x };
			dungeon.tiles[ tileCount ].available = { 'left' : false, 'top' : false, 'right' : false, 'bottom' : false };
			dungeon.tiles[ tileCount ].neighbors = { 'left' : false, 'top' : false, 'right' : false, 'bottom' : false };
			dungeon.tiles[ tileCount ].required = { 'left' : false, 'top' : false, 'right' : false, 'bottom' : false };
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
	
	/* Neighbors can't be built until all tiles are created. */
	for( var id in dungeon.tiles ) { BuildNeighborArray( id ); }
	/* Tileset can't be used until AssignTile() is run. */
//	for( var id in dungeon.tiles ) { SetAvailabilityByTileset( id ); }
}
function BuildNeighborArray( id ) {
	var coordinates = dungeon.tiles[id].coordinates;
	var neighbors = dungeon.tiles[id].neighbors;
	
	/* If we're on the grid, assign a NeighbordId  */
	if( coordinates.x != 1 ) {
		neighbors.left = GetTileIdFromCoordinates( { 'x' : coordinates.x - 1, 'y' : coordinates.y } );
	}
	if( coordinates.x != gridWidth ) {
		neighbors.right = GetTileIdFromCoordinates( { 'x' : coordinates.x + 1, 'y' : coordinates.y } );
	}
	if( coordinates.y != 1 ) {
		neighbors.top = GetTileIdFromCoordinates( { 'x' : coordinates.x, 'y' : coordinates.y - 1 } );
	}
	if( coordinates.y != gridHeight ) {
		neighbors.bottom = GetTileIdFromCoordinates( { 'x' : coordinates.x, 'y' : coordinates.y + 1 } );
	}

	dungeon.tiles[id].neighbors = neighbors;
}
function SetAvailableByNeighbors( id ) {	
	var tile = dungeon.tiles[id];
	var thisDiv = '';
	
	thisDiv  = document.getElementById( 'tile_' + tile.neighbors.left );	
	if( thisDiv && thisDiv.classList.contains( 'tile-blank' ) ) { tile.available.left = true; }
	thisDiv  = document.getElementById( 'tile_' + tile.neighbors.top );	
	if( thisDiv && thisDiv.classList.contains( 'tile-blank' ) ) { tile.available.top = true; }
	thisDiv  = document.getElementById( 'tile_' + tile.neighbors.right );	
	if( thisDiv && thisDiv.classList.contains( 'tile-blank' ) ) { tile.available.right = true; }
	thisDiv  = document.getElementById( 'tile_' + tile.neighbors.bottom );	
	if( thisDiv && thisDiv.classList.contains( 'tile-blank' ) ) { tile.available.bottom = true; }
	
	tile = dungeon.tiles[id];
}
function SetRequiredByNeighbor( id ) {
	var tile = dungeon.tiles[ id ];
	var thisDiv = '';
	
	thisDiv = dungeon.tiles[ tile.neighbors.left ];
	if( thisDiv && thisDiv.required.right ) { tile.required.left = true; }
	thisDiv = dungeon.tiles[ tile.neighbors.top ];
	if( thisDiv && thisDiv.required.bottom ) { tile.required.top = true; }
	thisDiv = dungeon.tiles[ tile.neighbors.right ];
	if( thisDiv && thisDiv.required.left ) { tile.required.right = true; }
	thisDiv = dungeon.tiles[ tile.neighbors.bottom ];
	if( thisDiv && thisDiv.required.top ) { tile.required.bottom = true; }
	
	dungeon.tiles[id].neighors = tile.neighbors;
}
function SetAvailableByTileset( id ) {
	var tile = dungeon.tiles[id];
	
	switch ( tile.type ) {
		case 'blank' :
			tile.available.left = true;
			tile.available.bottom = true;
			tile.available.right = true;
			tile.available.top = true;
			break;
		case 'blocked' :
			tile.available.left = false;
			tile.available.bottom = false;
			tile.available.right = false;
			tile.available.top = false;
			break;
		case 'X' :
			tile.available.left = true;
			tile.available.bottom = true;
			tile.available.right = true;
			tile.available.top = true;
			break;
		case 'T1' : 
			tile.available.left = true;
			tile.available.bottom = true;
			tile.available.right = true;
			tile.available.top = false;
			break;
		case 'T2' : 
			tile.available.left = true;
			tile.available.bottom = true;
			tile.available.right = false;
			tile.available.top = true;
			break;
		case 'T3' : 
			tile.available.left = true;
			tile.available.bottom = false;
			tile.available.right = true;
			tile.available.top = true;
			break;
		case 'T4' : 
			tile.available.left = false;
			tile.available.bottom = true;
			tile.available.right = true;
			tile.available.top = true;
			break;
		case 'hallway1' : 
			tile.available.left = true;
			tile.available.bottom = false;
			tile.available.right = true;
			tile.available.top = false;
			break;
		case 'hallway2' : 
			tile.available.left = false;
			tile.available.bottom = true;
			tile.available.right = false;
			tile.available.top = true;
			break;
		case 'cap1' : 
			tile.available.left = false;
			tile.available.bottom = false;
			tile.available.right = false;
			tile.available.top = false;
			break;
		case 'cap2' : 
			tile.available.left = false;
			tile.available.bottom = false;
			tile.available.right = false; 
			tile.available.top = false;
			break;
		case 'cap3' : 
			tile.available.left = false;
			tile.available.bottom = false;
			tile.available.right = false;
			tile.available.top = false;
			break;
		case 'cap4' : 
			tile.available.left = false;
			tile.available.bottom = false;
			tile.available.right = false;
			tile.available.top = false;
			break;
	}
	dungeon.tiles[id].available = tile.available;	
}
function SetRequiredByTileset( id ) {	
	var tile = dungeon.tiles[id];
	
	switch ( tile.type ) {
		case 'blank' :
			tile.required.left = true;
			tile.required.bottom = true;
			tile.required.right = true;
			tile.required.top = true;
			break;
		case 'blocked' :
			tile.required.left = false;
			tile.required.bottom = false;
			tile.required.right = false;
			tile.required.top = false;
			break;
		case 'X' :
			tile.required.left = true;
			tile.required.bottom = true;
			tile.required.right = true;
			tile.required.top = true;
			break;
		case 'T1' : 
			tile.required.left = true;
			tile.required.bottom = true;
			tile.required.right = true;
			tile.required.top = false;
			break;
		case 'T2' : 
			tile.required.left = true;
			tile.required.bottom = true;
			tile.required.right = false;
			tile.required.top = true;
			break;
		case 'T3' : 
			tile.required.left = true;
			tile.required.bottom = false;
			tile.required.right = true;
			tile.required.top = true;
			break;
		case 'T4' : 
			tile.required.left = false;
			tile.required.bottom = true;
			tile.required.right = true;
			tile.required.top = true;
			break;
		case 'hallway1' : 
			tile.required.left = true;
			tile.required.bottom = false;
			tile.required.right = true;
			tile.required.top = false;
			break;
		case 'hallway2' : 
			tile.required.left = false;
			tile.required.bottom = true;
			tile.required.right = false;
			tile.required.top = true;
			break;
		case 'cap1' : 
			tile.required.left = true;
			tile.required.bottom = false;
			tile.required.right = false;
			tile.required.top = false;
			break;
		case 'cap2' : 
			tile.required.left = false;
			tile.required.bottom = true;
			tile.required.right = false;
			tile.required.top = false;
			break;
		case 'cap3' : 
			tile.required.left = false;
			tile.required.bottom = false;
			tile.required.right = true;
			tile.required.top = false;
			break;
		case 'cap4' : 
			tile.required.left = false;
			tile.required.bottom = false;
			tile.required.right = false;
			tile.required.top = true;
			break;
	}
	dungeon.tiles[id].required = tile.required;	
}
function ResetDungeon() {
	startCol = parseInt( document.getElementById('dungeon_startingCol').value );
	startRow = parseInt( document.getElementById('dungeon_startingRow').value );
	gridWidth = parseInt( document.getElementById('dungeon_width').value );
	gridHeight = parseInt( document.getElementById('dungeon_height').value );
	if( !document.getElementById('autoDraw').checked ) { clearTimeout(autoDraw); }

	/* Force startCol/Row to stay on the grid. */
	if( Number(startCol) > Number(gridWidth) ) { startCol = gridWidth; document.getElementById('dungeon_startingCol').value = startCol; }
	if( Number(startRow) > Number(gridHeight) ) { startRow = gridHeight; document.getElementById('dungeon_startingRow').value = startRow; }

	CreateDungeonGrid();
	drawList = [];
	AssignTile( GetTileIdFromCoordinates( { 'x' : startRow, 'y' : startCol } ) );
	
	if( document.getElementById('autoDraw').checked ) { autoDraw = setTimeout( DrawNewTileCard, 500 ); }
//	else { clearTimeout(autoDraw); }
}
function DisplayTileLabels( drawList_x, id ) {
	var display = 'display: none; ';
	if( displayTileLabels.checked ) { display = 'display: flex; '; }

	var thisLabel = document.getElementById(id);
	thisLabel.innerHTML = '<div class="tileLabel" style="'+display+'"><div>#' +drawList_x+'</div><div style="clear: both;">Tile_'+id+'</div></div>';
}
function DrawNewTileCard() {
	var divs = document.getElementsByClassName( 'move-available' );
	var id = Math.floor(Math.random() * divs.length);

	divs[id].click();
	if( drawList.length < document.getElementById('tool_limit').value ) { setTimeout( DrawNewTileCard, 500 ); }
}
function GetTileIdFromCoordinates( coordinates ) {
	var targetTileId = false;
	if( ValidateCoordinates( coordinates ) ) {
		var queryString = '.col_'+coordinates.x+'.row_'+coordinates.y;
		targetTileId = document.querySelectorAll( queryString )[0].id.replace('tile_','');
	}
	
	return targetTileId;
}
function ValidateCoordinates( coordinates ) {
	var status = false;
	
	if( coordinates.x >= 1 && coordinates.x <= gridWidth) {
		if( coordinates.y >= 1 && coordinates.y <= gridHeight) { status = true; }
	}
	
	return status;
}

ResetDungeon();