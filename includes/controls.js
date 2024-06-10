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
			tile.classList.add('tile-blank', 'tile-blocked' );
			console.log( 'Blocked: '+tileId );
		}
	}
}

dungeonWindow.addEventListener("click", playTile);
