<!DOCTYPE html>
<?php
/*//
HRCLOUD2-PLUGIN-START
App Name: Blockrain
App Website: https://github.com/Aerolab/blockrain.js
App Version: v1.0 (12-4-2018 00:00)
App License: GPLv3
App Author: Aerolab
App Genre: Games
App Description: A new take on the classic game of Tetris!
App Integration: 0 (True)
HRCLOUD2-PLUGIN-END
//*/
?>
<html>
<head>
  <meta charset="utf-8" />
  <title>Blockrain.js - A Tetris game in HTML5 + Javascript</title>
  <meta name="description" content="Blockrain.js lets you embed the classic Tetris game on your website" />
  <meta name="keywords" content="js, jquery, game, plugin, html5, tetris" />
  <meta name="author" content="Aerolab" />
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="src/blockrain.css">
</head>
<body>
<div id="title-text" name="title-text" style="text-align:center;">
  <p><h2>BLOCKRAIN TETRIS</h2></p>
</div>
<section id="examples">
  <article id="example-slider">
    <div class="example">
      <div class="theme">theme: <strong>"retro"</strong></div>
      <div class="instructions">
        <div class="keyboard">
          <div class="key key-up"></div>
          <div class="key key-left"></div>
          <div class="key key-down"></div>
          <div class="key key-right"></div>
        </div>
      </div>
      <div class="game" id="tetris-demo"></div>
    </div>
    <div class="buttons">
      <a href="" class="btn btn-prev">Previous</a>
      <a href="" class="btn btn-next">Next</a>
    </div>
  </article>
</section>
<script src="assets/js/jquery-1.11.1.min.js"></script>
<script src="src/blockrain.jquery.libs.js"></script>
<script src="src/blockrain.jquery.src.js"></script>
<script src="src/blockrain.jquery.themes.js"></script>
<script>

  var $demo = $('#tetris-demo').blockrain({
    speed: 20,
    theme: 'retro',
    onStart: function() {
      ga( 'send', 'event', 'tetris', 'started');
    },
    onLine: function() {
      ga( 'send', 'event', 'tetris', 'line');
    },
    onGameOver: function(score){
      ga( 'send', 'event', 'tetris', 'over', score);
    }
  });

  $('#example-slider').find('.btn-next').click(function(event){
    event.preventDefault();
    switchDemoTheme(true);
  });
  $('#example-slider').find('.btn-prev').click(function(event){
    event.preventDefault();
    switchDemoTheme(false);
  });

  function switchDemoTheme(next) {

    var themes = Object.keys(BlockrainThemes);

    var currentTheme = $demo.blockrain('theme');
    var currentIx = themes.indexOf(currentTheme);

    if( next ) { currentIx++; }
    else { currentIx--; }

    if( currentIx >= themes.length ){ currentIx = 0; }
    if( currentIx < 0 ){ currentIx = themes.length-1; }

    $demo.blockrain('theme', themes[currentIx]);
    $('#example-slider .theme strong').text( '"'+themes[currentIx]+'"' );
  }
</script>
</body>
</html>
