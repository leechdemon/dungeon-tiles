<?php $version = "0.3.0"; ?>

<style>
	#dungeonWindow { width: 75%; background-color: #2d303d; }
	#tools { width: 25%; }
	#tools button { margin: 1rem; max-width: 50%; }
	#tools input { width: 100%; }
	#tools .input-group { max-width: 100%; clear: both; margin: 1rem; }
	#tools .input-item { max-width: 45%; text-align: center; margin: 0.25rem; float: left; }

	.tile, .tile-blank, .hiddenTile, .tile-blocked { color: white; font-size: small; width: 15px; height: 15px; float: left; text-align: center; background-size: contain; background-color: #2d303d;  opacity: 1;  /* transition-duration: 0.25s; */ padding: 0px; }
	@media screen and (max-width: 500px) {
		.tile { width: 25px; height: 25px; }
	}
/*	.hiddenTile { opacity: 0 !important; }*/
/*	.tile:hover .tileLabel { display: block !important; } */
	.tileLabel { font-weight: 800; font-size: smaller; }
	
	.move-available { background-color: #ff000044; }
	.move-available:hover { background-color: #ff000099; }

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
	.tile-blocked { background-color: #111216; }
</style>

<div id="dungeonWindow"></div>
<div id="tools">
	<p style="float: right;">v<?php echo $version; ?></p>
	<button onclick="javascript:ResetDungeon();">Reset Dungeon</button>
  
	<div class="input-group">
		<div class="input-item">
			<input type="number" id="tool_limit" value="750">
			<label for="tool_limit">Limit</label>
		</div>
	</div>
	<div class="input-group">
		<div class="input-item">
			<input type="number" id="dungeon_width" value="20">
			<label for="dungeon_width">Width</label>
		</div>
		<div class="input-item">
			<input type="number" id="dungeon_height" value="20">
			<label for="dungeon_height">Height</label>
		</div>
	</div>
	<div class="input-group">
		<div class="input-item">
			<input type="number" id="hallwayLength" value="3">
			<label for="hallwayLength">Hallway Length</label>
		</div>
	</div>
	<div class="input-group">
		<div class="input-item">
			<input type="number" id="dungeon_startingRow" value="10">
			<label for="dungeon_startingRow">Starting Row</label>
		</div>
		<div class="input-item">
			<input type="number" id="dungeon_startingCol" value="10">
			<label for="dungeon_startingCol">Starting Col</label>
		</div>
	</div>

	<div class="input-group">
		<div class="input-item">
			<input type="checkbox" id="displayTileLabels" ischecked >
			<label for="displayTileLabels">displayTileLabels</label>
		</div>
	</div>

</div>

<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri(); ?>/dungeon-tiles/dt.js?v=<?php echo random_int(0,99999); ?>"></script>
<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri(); ?>/dungeon-tiles/includes/controls.js?v=<?php echo random_int(0,99999); ?>"></script>