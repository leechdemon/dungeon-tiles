// JavaScript Document

function playTile(event) {
	var tile = event.target;
	var tileId = tile.id.replace('tile_', '');
	if( tile.classList.contains( 'move-available' ) ) {
		document.getElementById('tile_' + tileId).classList.remove('move-available');
		AssignTile( tileId );
//		DisplayTileLabels( drawList.length, tileId );
	}
	else {
		if( tile.classList.contains( 'tile-blank' ) ) {
			tile.classList.replace('tile-blank', 'tile-blocked' );
			dungeon.tiles[ tileId ].type = 'blocked';
			SetRequiredByTileset( tileId );
			SetAvailableByTileset( tileId );
			console.log( 'Blocked: '+tileId );
		} else if( tile.classList.contains( 'tile-blocked' ) ) {
			tile.classList.replace('tile-blocked', 'tile-blank' );
			dungeon.tiles[ tileId ].type = 'blank';
			SetRequiredByTileset( tileId );
			SetAvailableByTileset( tileId );
			console.log( 'Blank: '+tileId );
		}

	}
}

dungeonWindow.addEventListener("click", playTile);
