<!doctype html>
<?php
/*//
HRCLOUD2-PLUGIN-START
App Name: HexGL
App Website: https://github.com/BKcore/HexGL
App Version: v1.0 (12-4-2018 00:00)
App License: GPLv3
App Author: BKCore
App Genre: Games
App Description: A high-speed racing adventure!
App Integration: 0 (True)
HRCLOUD2-PLUGIN-END
//*/
?>
<html lang="en">
  <head>
    <title>HexGL by BKcore</title>
    <meta charset="utf-8">
    <meta name="description" content="HexGL is a futuristic racing game built by Thibaut Despoulain (BKcore) using HTML5, Javascript and WebGL. Come challenge your friends on this fast-paced 3D game!">
    <meta property="og:title" content="HexGL, the HTML5 futuristic racing game." />
    <meta property="og:type" content="game" />
    <meta property="og:site_name" content="HexGL by BKcore" />
    <meta property="fb:admins" content="1482017639" />
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <link rel="stylesheet" href="css/multi.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="css/fonts.css" type="text/css" charset="utf-8">
    <style>
      body {
        padding:0;
        margin:0;
      }
      canvas { pointer-events:none; width: 100%;}
      #overlay{
        position: absolute;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
      }
    </style>
  </head>

  <body>
    <div id="step-1">
      <div id="global"></div>
      <div id="title">
      </div>
      <div id="menucontainer">
        <div id="menu">
          <div id="start">Start</div>
          <div id="s-controlType">Controls: Keyboard</div>
          <div id="s-quality">Quality: High</div>
          <div id="s-hud">HUD: On</div>
          <div id="s-godmode" style="display: none">Godmode: Off</div>
          <div id="s-credits">Credits</div>
        </div>
      </div>
    </div>
    <div id="step-2" style="display: none">
      <div id="ctrl-help">Click/Touch to continue.</div>
    </div>
    <div id="step-3" style="display: none">
      <div id="progressbar"></div>
    </div>
    <div id="step-4" style="display: none">
      <div id="overlay"></div>
      <div id="main"></div>
    </div>
    <div id="step-5" style="display: none">
      <div id="time"></div>
      <div id="ctrl-help">Click/Touch to continue.</div>
    </div>
    <div id="credits" style="display: none">
      <h3>Code</h3>
      <p><b>Concept and Development</b><br>Thibaut Despoulain (BKcore)</p>
      <p><b>Contributors</b><br>townxelliot<br>mahesh.kk</p>
      <p><b>Technologies</b><br>WebGL<br>JavaScript<br>CoffeeScript<br>Three.js<br>LeapMotion</p>
      <h3>Graphics</h3>
      <p><b>HexMKI base model</b><br>Charnel</p>
      <p><b>Track texture</b><br>Nobiax</p>
      <h4>Click anywhere to continue.</h4>
    </div>

    <div id="leapinfo" style="display: none"></div>

    <script src="libs/leap-0.4.1.min.js"></script>
    <script src="libs/Three.dev.js"></script>
    <script src="libs/ShaderExtras.js"></script>
    <script src="libs/postprocessing/EffectComposer.js"></script>
    <script src="libs/postprocessing/RenderPass.js"></script>
    <script src="libs/postprocessing/BloomPass.js"></script>
    <script src="libs/postprocessing/ShaderPass.js"></script>
    <script src="libs/postprocessing/MaskPass.js"></script>
    <script src="libs/Detector.js"></script>
    <script src="libs/Stats.js"></script>
    <script src="libs/DAT.GUI.min.js"></script>

    <script src="bkcore.coffee/controllers/TouchController.js"></script>
    <script src="bkcore.coffee/controllers/OrientationController.js"></script>
    <script src="bkcore.coffee/controllers/GamepadController.js"></script>

    <script src="bkcore.coffee/Timer.js"></script>
    <script src="bkcore.coffee/ImageData.js"></script>
    <script src="bkcore.coffee/Utils.js"></script>

    <script src="bkcore/threejs/RenderManager.js"></script>
    <script src="bkcore/threejs/Shaders.js"></script>
    <script src="bkcore/threejs/Particles.js"></script>
    <script src="bkcore/threejs/Loader.js"></script>

    <script src="bkcore/Audio.js"></script>

    <script src="bkcore/hexgl/HUD.js"></script>
    <script src="bkcore/hexgl/RaceData.js"></script>
    <script src="bkcore/hexgl/ShipControls.js"></script>
    <script src="bkcore/hexgl/ShipEffects.js"></script>
    <script src="bkcore/hexgl/CameraChase.js"></script>
    <script src="bkcore/hexgl/Gameplay.js"></script>

    <script src="bkcore/hexgl/tracks/Cityscape.js"></script>

    <script src="bkcore/hexgl/HexGL.js"></script>

    <script src="launch.js"></script>

  </body>
</html>
