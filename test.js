var pointCloud;
var camera, controls, scene, raycaster, renderer;
var width = window.innerWidth;
var height = window.innerHeight;
var particles, particleSystem;
var mouse = 0;
var clock;
var intersection = null;
var mixer, mesh, skeletonHelper;
// window.onload = function() {
//
// };


init();
animateParticles();
var loader = new THREE.BVHLoader();

loader.load( 'bvh/pirouette.bvh', function( result ) {
				skeletonHelper = new THREE.SkeletonHelper( result.skeleton.bones[ 0 ] );
				skeletonHelper.skeleton = result.skeleton; // allow animation mixer to bind to SkeletonHelper directly
				var boneContainer = new THREE.Group();
				boneContainer.add( result.skeleton.bones[ 0 ] );
				scene.add( skeletonHelper );
				scene.add( boneContainer );
				// play animation
				mixer = new THREE.AnimationMixer( skeletonHelper );
				mixer.clipAction( result.clip ).setEffectiveWeight( 1.0 ).play();
			} );



var INTERSECTED;

function init() {
  container = document.getElementById('container');
  //create a new camera;
  camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
  camera.position.set( 0,200,400 );

  clock = new THREE.Clock();

  controls = new THREE.TrackballControls(camera);
  //add a scene; scene contains all 3D data
  scene = new THREE.Scene();
  scene.background = new THREE.Color('rgb(79,79,79)');


  controls = new THREE.TrackballControls(camera);
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 3.2;
  controls.panSpeed = 1.2;

  controls.noZoom = false;
  controls.noPan = false;

  controls.staticMoving = true;
  controls.dynamicDampingFactor = 2.6;

  controls.addEventListener('change', render);

  var light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);
  scene.add(light);
  var light = new THREE.DirectionalLight(0x002288);
  light.position.set(-1, -1, -1);
  scene.add(light);
  var light = new THREE.AmbientLight(0x222222);
  scene.add(light);
  makeParticles();

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  document.body.appendChild( renderer.domElement );
  // var container = document.getElementById('container');
  // container.appendChild(renderer.domElement);
  // document.addEventListener('mousemove', onDocumentMouseMove, false);

  window.addEventListener('resize', onWindowResize, false);
  //render();
}
//lightsvar pointLight = new THREE.PointLight(0xffffff);


function makeParticles() {
  $.getJSON('data.json', function(data) {
    //WLF
    drawPoints(data.WLFX, data.WLFY, data.WLFZ, 'rgb(255,255,255,150)');

    //WRFX
    drawPoints(data.WRFX, data.WRFY, data.WRFZ, 'rgb(255,255,0)');

    //DAN waistLBack
    drawPoints(data.WLBX, data.WLBY, data.WLBZ, 'rgb(0,255,0)');

    //DAN waistRBack
    drawPoints(data.WRBX, data.WRBY, data.WRBZ, 'rgb(0,0,255)');

    //DAN BackTOP
    drawPoints(data.BTX, data.BTY, data.BTZ, 'rgb(0,255,255)');

    //DAN CHEST
    drawPoints(data.CX, data.CY, data.CZ, 'rgb(100,100,255)');

    //DAN BACK LEFT
    drawPoints(data.BLX, data.BLY, data.BLZ, 'rgb(255,100,100)');

    //DAN BACK RIGHT
    drawPoints(data.BRX, data.BRY, data.BRZ, 'rgb(155,100,0)');

    //DAN head top
    drawPoints(data.HTX, data.HTY, data.HTZ, 'rgb(200,80,190)');

    //DAN head FRONT
    drawPoints(data.HFX, data.HFY, data.HFZ, 'rgb(190,180,130)');

    //DAN LFET SHOULDER BACK
    drawPoints(data.LSBX, data.LSBY, data.LSBZ, 'rgb(200,185,195)');

    //DAN LFET SHOULDER TOP
    drawPoints(data.LSTX, data.LSTY, data.LSTZ, 'rgb(200,100,130)');

    //DAN Left Elbow Out
    drawPoints(data.LEOX, data.LEOY, data.LEOZ, 'rgb(10,190,255)');

    //Dan:LUArmHigh
    drawPoints(data.LUAHX, data.LUAHY, data.LUAHZ, 'rgb(10, 90, 55)');

    //Dan:RShoulderBack
    drawPoints(data.RSBX, data.RSBY, data.RSBZ, 'rgb(200, 130, 55)');

    //Dan:RShoulderTop

    drawPoints(data.RSTX, data.RSTY, data.RSTZ, 'rgb(35, 201, 186,150)');
    //Dan:RElbowOut

    drawPoints(data.REOX, data.REOY, data.REOZ, 'rgb(245, 55, 127,150)');
    //Dan:RUArmHigh
    drawPoints(data.RUAHX, data.RUAHY, data.RUAHZ, 'rgb(255, 131, 0,150)');
  });
}

function onWindowResize() {

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
  //controls.handleResize();
  //render();
}

function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function render() {
  var timer = Date.now();

  camera.lookAt(scene.position);
  //mixer.update(clock.getDelta());
  //find intersections
  raycaster.setFromCamera(mouse, camera);
  var intersections = raycaster.intersectObjects(scene.children);
  intersection = (intersections.length) > 0 ? intersections[0] : null;

  if (intersection) {
    for (var i = 0; i < intersections.length; i++) {
      var intersection = intersections[i],
        obj = intersection.object;
      obj.material.color.setRGB(255, 255, 255);
			//obj.geometry = new THREE.CircleGeometry(8,10);
    }
  }else{
		//obj.geometry = new THREE.CircleGeometry(1.2,10);
	}
  renderer.render(scene, camera);
}


function drawPoints (xPos, yPos, zPos, dColor) {
  var xPositions = xPos;
  var yPositions = yPos;
  var zPositions = zPos;
  var material = new THREE.MeshBasicMaterial({
    color: dColor
  });
  var geometry = new THREE.CircleGeometry(1.2, 10);

  for (var i = 0; i < xPositions.length; i++) {
    var pointCloud = new THREE.Mesh(geometry, material);
    pointCloud.position.x = xPositions[i];
    pointCloud.position.y = yPositions[i];
    pointCloud.position.z = zPositions[i];

    pointCloud.updateMatrix();
    //pointCloud.m	atrixAutoUpdate = false;
    scene.add(pointCloud);
  }
}

  function animateParticles() {
  requestAnimationFrame(animateParticles);
  var delta = clock.getDelta();
	if ( mixer ) mixer.update( delta );
  controls.update();
  renderer.render(scene, camera);
}
