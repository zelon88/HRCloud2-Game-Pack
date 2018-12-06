<!DOCTYPE html>
<?php
/*//
HRCLOUD2-PLUGIN-START
App Name: 3dCity
App Website: https://github.com/lo-th/3d.city
App Version: v1.0 (12-5-2018 00:00)
App License: GPLv3
App Author: lo-th
App Genre: Games
App Description: A 3D city simulator game!
App Integration: 0 (True)
HRCLOUD2-PLUGIN-END
//*/
?>
<html lang="en">
<head>
<title>3D.CITY</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
<link rel="icon" href="favicon.ico" />
<style>
*{ padding:0; margin: 0; -o-user-select:none; -ms-user-select:none; -khtml-user-select:none; -webkit-user-select:none; -moz-user-select: none;}
html { width:100%; height:100%; }
body { background:#6666E6; font:10px sans-serif; width:100%; height:100%; color:#FFFFFF; overflow: hidden; }
#container{ min-width:465px; min-height:465px; width:100%; height:100%; overflow:hidden; text-align:center; }
#container canvas{ position:absolute;top:0;left:0;width:100%;height:100% }
#debug{ position:absolute; padding:5px; right:0; bottom:0; text-align:right; width:20%; pointer-events:none; display:block; }
#hub{ position:absolute; top:0; left:0; height:100%; width:100%; pointer-events:none; display:block; text-align:center;}
#miniGlCanvas{ position:absolute; bottom:60px; left:15px; pointer-events:none; }
#logo{pointer-events:none; display:none;}
a:link {text-decoration: none; color:#FFAA66;}
a:visited {text-decoration: none; color:#FFAA66;}
a:active {text-decoration: none; color:#FFAA66;}
a:hover {text-decoration: underline; color: red;}
</style>
<script src="js/three.min.js"></script>
<script src="js/sea3d.min.js"></script>
<script src="build/view.min.js"></script>

</head>
<body onload="init()">
<div id="container"></div>
<div id="debug">v 0.4</div>
<canvas id="miniGlCanvas"></canvas>

<div id="hub"></div>
<object id="logo" width="300" height="300" type="image/svg+xml" data="img/logo.svg"></object>
</body></html>