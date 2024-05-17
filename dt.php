<?php 

?>

<style>
	#dungeon { width: 75%; }
	#tools { width: 25%; }
	#tools button, #tools input { margin: 1rem; max-width: 50%; }

	.tile, .tile-blank { width: 15px; height: 15px; float: left; text-align: center; background-size: contain; background-color: #2d303d; /* opacity: 0; transition-duration: 0.25s; */ padding: 0px; }
	@media screen and (max-width: 500px) {
		.tile { width: 25px; height: 25px; }
	}

	.tile-X { background-image: url("/wp-content/uploads/2024/05/tile-x.jpg"); }

	.tile-T1 { background-image: url("/wp-content/uploads/2024/05/tile-t.jpg"); }
	.tile-T2 { background-image: url("/wp-content/uploads/2024/05/tile-t.jpg"); transform: rotate(90deg); }
	.tile-T3 { background-image: url("/wp-content/uploads/2024/05/tile-t.jpg"); transform: rotate(180deg); }
	.tile-T4 { background-image: url("/wp-content/uploads/2024/05/tile-t.jpg"); transform: rotate(270deg); }

	.tile-hallway1 { background-image: url("/wp-content/uploads/2024/05/tile-hallway.jpg"); }
	.tile-hallway2 { background-image: url("/wp-content/uploads/2024/05/tile-hallway.jpg"); transform: rotate(90deg); }

	.tile-cap1 { background-image: url("/wp-content/uploads/2024/05/tile-cap.jpg"); }
	.tile-cap2 { background-image: url("/wp-content/uploads/2024/05/tile-cap.jpg"); transform: rotate(90deg); }
	.tile-cap3 { background-image: url("/wp-content/uploads/2024/05/tile-cap.jpg"); transform: rotate(180deg); }
	.tile-cap4 { background-image: url("/wp-content/uploads/2024/05/tile-cap.jpg"); transform: rotate(270deg); }

	.tile-red { background-color: red; }
</style>

<div id="dungeon"></div>
<div id="tools">
	<button onclick="javascript:DrawDungeon();">Draw Dungeon</button>
	<hr>
	<input type="number" id="tool_limit" value="25">
	<label for="tool_limit">Limit</label>
	<hr>
	<input type="number" id="dungeon_width" value="10">
	<label for="dungeon_width">Width</label>
	<input type="number" id="dungeon_height" value="10">
	<label for="dungeon_height">Height</label>
	<hr>
	<input type="number" id="dungeon_startingCol" value="5">
	<label for="dungeon_startingCol">Starting Col</label>
	<input type="number" id="dungeon_startingRow" value="5">
	<label for="dungeon_startingRow">Starting Row</label>

</div>

<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri(); ?>/dungeon-tiles/dt.js?v=<?php echo random_int(0,99999); ?>"></script>