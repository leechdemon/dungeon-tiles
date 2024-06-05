// JavaScript Document

function playTile(event) {
	var tile = event.target;
	var tileId = tile.id.replace('tile_', '');
	if( tile.classList.contains( 'move-available' ) ) {
		AssignTile( tileId );
//		DisplayTileLabels( drawList.length, tileId );
  }
}

dungeon.addEventListener("click", playTile);
