var scene, camera, renderer, pointCloud;var camera, scene, renderer;
var width = window.innerWidth;
var height = window.innerHeight;
var particles, particleSystem;
window.onload = function() {
	init();
	animateParticles();
};
var init = function() {
	//add a scene; scene contains all 3D data
	scene = new THREE.Scene();
  scene.background = new THREE.Color('rgb(0,0,0)');
  // renderer
  renderer = new THREE.WebGLRenderer({antialias:false});
  renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(width, height);

  var container = document.getElementById('container');
  container.appendChild( renderer.domElement );

  //create a new camera;
	camera = new THREE.PerspectiveCamera(70, width/height, 1, 8000);
	camera.position.z = 3500;

  controls = new THREE.TrackballControls(camera);

  controls.rotateSpeed = 15.0;
  controls.zoomSpeed = 15.2;
  controls.panSpeed = 3.8;

  controls.noZoom = false;
  controls.noPan = false;

  controls.staticMoving = true;
  controls.dynamicDampingFactor = 5.6;

  controls.addEventListener( 'change', render );

  var light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 1, 1, 1 );
				scene.add( light );
	var light = new THREE.DirectionalLight( 0x002288 );
				light.position.set( -1, -1, -1 );
				scene.add( light );
	var light = new THREE.AmbientLight( 0x222222 );
				scene.add( light );
	makeParticles();

  window.addEventListener('resize', onWindowResize, false);
  render();
}
  //lightsvar pointLight = new THREE.PointLight(0xffffff);


  function makeParticles() {
  group = new THREE.Group();

  $.getJSON('data.json',function(data){
    var WLFxPositions = data.WLFX;
    var WLFyPositions = data.WLFY;
    var WLFzPositions = data.WLFZ;

    var WRFxPositions = data.WRFX;
    var WRFyPositions = data.WRFY;
    var WRFzPositions = data.WRFZ;

    var materialWLF = new THREE.MeshBasicMaterial({
      color:'rgb(255,255,255)'
    });
    var geometryWLF = new THREE.BoxGeometry(1, 1, 1);

		var materialWRF = new THREE.MeshBasicMaterial({
			color:'rgb(255,255,0)'
		});
		var geometryWRF = new THREE.BoxGeometry(1, 1, 1);


    for(var i = 0; i<WLFxPositions.length; i++){
        //console.log(WRFxPositions[i] + '-' + WRFyPositions[i] + '-' + WRFzPositions[i]);
        //Dan:WaistLFront
        var pointCloudWLF = new THREE.Mesh(geometryWLF, materialWLF);
        pointCloudWLF.position.x =WLFxPositions[i];
        pointCloudWLF.position.y =WLFyPositions[i];
        pointCloudWLF.position.z =WLFzPositions[i];
        pointCloudWLF.updateMatrix();
				//console.log(WLFzPositions[i]);
        //pointCloud.matrixAutoUpdate = false;
        scene.add(pointCloudWLF);
      }

      for (var i =0; i<WRFxPositions.length; i++){
				//console.log(WRFzPositions[i]);
          //Dan: WaistRFront
        var pointCloudWRF = new THREE.Mesh(geometryWRF, materialWRF);
        pointCloudWRF.position.x =WRFxPositions[i];
        pointCloudWRF.position.y =WRFyPositions[i];
        pointCloudWRF.position.z =WRFzPositions[i];

        pointCloudWRF.updateMatrix();
        //pointCloud.m	atrixAutoUpdate = false;
        scene.add(pointCloudWRF);
      }
  	//add it to the scene
  	//scene.add(group);
  });
}

function onWindowResize(){
  camera.aspect = width/height;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  controls.handleResize();
  render();
}

 function render() {
  //camera.lookAt( scene.position );
	renderer.render(scene, camera);
}

var animateParticles = function() {
	requestAnimationFrame (animateParticles);
  controls.update();
}
