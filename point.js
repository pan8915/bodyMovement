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
	camera = new THREE.PerspectiveCamera(60, width/height, 1, 7000);
	camera.position.z = 1500;

  controls = new THREE.TrackballControls(camera);

  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;

  controls.noZoom = false;
  controls.noPan = false;

  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

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
//Dan:WaistLFront
  $.getJSON('data.json',function(data){
    var xPositions = data.X;
    var yPositions = data.Y;
    var zPositions = data.Z;
    for(var i = 0; i<xPositions.length; i++){
        console.log(xPositions[i] + '-' + yPositions[i] + '-' + zPositions[i]);
        var material = new THREE.MeshBasicMaterial({
          color:'rgb(255,255,255)'
        });
      	///define each particle's position and add it to the system
        var geometry = new THREE.BoxGeometry(2, 2, 2);
        var pointCloud = new THREE.Mesh(geometry, material);
        pointCloud.position.x =xPositions[i];
        pointCloud.position.y =yPositions[i];
        pointCloud.position.z =zPositions[i];
        pointCloud.updateMatrix();
        pointCloud.matrixAutoUpdate = false;
        group.add(pointCloud);
    }
  	//add it to the scene
  	scene.add(group);
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
	renderer.render(scene, camera);
}

var animateParticles = function() {
	requestAnimationFrame (animateParticles);
  controls.update();
}
