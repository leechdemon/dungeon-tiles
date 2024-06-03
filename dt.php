<?php $version = "0.2.2b"; ?>

<style>
	#dungeon { width: 75%; }
	#tools { width: 25%; }
	#tools button, #tools input { margin: 1rem; max-width: 50%; }

	.tile, .tile-blank { color: white; font-size: small; width: 15px; height: 15px; float: left; text-align: center; background-size: contain; background-color: #2d303d; /* opacity: 0; transition-duration: 0.25s; */ padding: 0px; }
	@media screen and (max-width: 500px) {
		.tile { width: 25px; height: 25px; }
	}
	.tile:hover .tileLabel { display: block !important; } 
	.tileLabel { font-weight: 800; font-size: smaller; }

	.tile-X { background-image: url("/wp-content/uploads/2024/05/tile-x.jpg"); transform: scale(1.05); }

	.tile-T1 { background-image: url("/wp-content/uploads/2024/05/tile-t.jpg"); transform: scale(1.05); }
	.tile-T2 { background-image: url("/wp-content/uploads/2024/05/tile-t.jpg"); transform: rotate(90deg) scale(1.05); }
	.tile-T3 { background-image: url("/wp-content/uploads/2024/05/tile-t.jpg"); transform: rotate(180deg) scale(1.05); }
	.tile-T4 { background-image: url("/wp-content/uploads/2024/05/tile-t.jpg"); transform: rotate(270deg) scale(1.05); }

	.tile-hallway1 { background-image: url("/wp-content/uploads/2024/05/tile-hallway.jpg"); transform: scale(1.05); }
	.tile-hallway2 { background-image: url("/wp-content/uploads/2024/05/tile-hallway.jpg"); transform: rotate(90deg) scale(1.05); }

	.tile-cap1 { background-image: url("/wp-content/uploads/2024/05/tile-cap.jpg"); transform: scale(1.05); }
	.tile-cap2 { background-image: url("/wp-content/uploads/2024/05/tile-cap.jpg"); transform: rotate(90deg) scale(1.05); }
	.tile-cap3 { background-image: url("/wp-content/uploads/2024/05/tile-cap.jpg"); transform: rotate(180deg) scale(1.05); }
	.tile-cap4 { background-image: url("/wp-content/uploads/2024/05/tile-cap.jpg"); transform: rotate(270deg) scale(1.05); }

	.tile-red { background-color: red; }
</style>

<div id="dungeon"></div>
<div id="tools">
	<p style="float: right;">v<?php echo $version; ?></p>
  <button onclick="javascript:ResetDungeon();">Reset Dungeon</button>
  
	<hr>
	<input type="number" id="tool_limit" value="75">
	<label for="tool_limit">Limit</label>
	<hr>
	<input type="number" id="dungeon_width" value="15">
	<label for="dungeon_width">Width</label>
	<input type="number" id="dungeon_height" value="15">
	<label for="dungeon_height">Height</label>
	<hr>
	<input type="number" id="dungeon_startingCol" value="6">
	<label for="dungeon_startingCol">Starting Col</label>
	<input type="number" id="dungeon_startingRow" value="6">
	<label for="dungeon_startingRow">Starting Row</label>

	<hr>
	<input type="checkbox" id="displayTileLabels" ischecked >
	<label for="displayTileLabels">displayTileLabels</label>

</div>

<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri(); ?>/dungeon-tiles/dt.js?v=<?php echo random_int(0,99999); ?>"></script>