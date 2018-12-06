<!DOCTYPE html>
<?php
/*//
HRCLOUD2-PLUGIN-START
App Name: Mezzball
App Website: https://github.com/hughsk/ludum-dare-27
App Version: v1.0 (12-5-2018 00:00)
App License: GPLv3
App Author: hughsk
App Genre: Games
App Description: A game where you trap bouncing balls!
App Integration: 0 (True)
HRCLOUD2-PLUGIN-END
//*/
?>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css?family=Josefin+Sans|Josefin+Slab|Julius+Sans+One|Poiret+One|Quicksand|Varela" rel="stylesheet">
  <title>**MEzZbALL**</title>
</head>
<body>

  <div id="wrapper">

    <div class="info">
      <span id="time">0</span>
      <span id="cleared">0%</span>
      <span id="level">1</span>
    </div>

    <canvas class="jscv direction" id="canvas" width="600" height="400"/>

  </div>



  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="game.js"></script>
</body>
</html>
