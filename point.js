var scene, camera, renderer, pointCloud;var camera, scene, renderer;
var width = window.innerWidth;
var height = window.innerHeight;
var particles, particleSystem;
var mouse =0;
window.onload = function() {
	init();
	animateParticles();
};

var INTERSECTED;

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
	camera = new THREE.PerspectiveCamera(70, width/height, 1, 10000);
	camera.position.z = 3500;

  controls = new THREE.TrackballControls(camera);

  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 3.2;
  controls.panSpeed = 1.2;

  controls.noZoom = false;
  controls.noPan = false;

  controls.staticMoving = true;
  controls.dynamicDampingFactor = 2.6;

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

	var geometry = new THREE.PlaneGeometry(10000,3,10000);
	var material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide} );
	var plane = new THREE.Mesh( geometry, material );
  scene.add( plane );

	var geometry = new THREE.PlaneGeometry(3,10000,10000);
	var material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide} );
	var plane = new THREE.Mesh( geometry, material );
  scene.add( plane );

	// var geometry = new THREE.PlaneGeometry(10000,10000,1);
	// var material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide} );
	// var plane = new THREE.Mesh( geometry, material );
  // scene.add( plane );

	// raycaster = new THREE.Raycaster();
	// mouse = new THREE.Vector2();

	document.addEventListener('mousemove', onDocumentMouseMove,false);

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
		var materialWLF = new THREE.MeshBasicMaterial({
      color:'rgb(255,255,255)'
    });
    var geometryWLF = new THREE.BoxGeometry(0.5, 0.5, 0.5);

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

    var WRFxPositions = data.WRFX;
    var WRFyPositions = data.WRFY;
    var WRFzPositions = data.WRFZ;
		var materialWRF = new THREE.MeshBasicMaterial({
			color:'rgb(255,255,0)'
		});
		var geometryWRF = new THREE.BoxGeometry(0.5, 0.5, 0.5);

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
//DAN waistLBack
		var WLBxPositions = data.WLBX;
    var WLByPositions = data.WLBY;
    var WLBzPositions = data.WLBZ;
		var materialWLB = new THREE.MeshBasicMaterial({
			color:'rgb(0,255,0)'
		});
		var geometryWLB = new THREE.BoxGeometry(0.5, 0.5, 0.5);

    for (var i =0; i<WLBxPositions.length; i++){
			//console.log(WRFzPositions[i]);
        //Dan: WaistRFront
      var pointCloudWLB = new THREE.Mesh(geometryWLB, materialWLB);
      pointCloudWLB.position.x =WLBxPositions[i];
      pointCloudWLB.position.y =WLByPositions[i];
      pointCloudWLB.position.z =WLBzPositions[i];

      pointCloudWLB.updateMatrix();
      //pointCloud.m	atrixAutoUpdate = false;
      scene.add(pointCloudWLB);
    }

//DAN waistRBack
		var WRBxPositions = data.WRBX;
    var WRByPositions = data.WRBY;
    var WRBzPositions = data.WRBZ;
		var materialWRB = new THREE.MeshBasicMaterial({
			color:'rgb(0,0,255)'
		});
		var geometryWRB = new THREE.BoxGeometry(0.5, 0.5, 0.5);

    for (var i =0; i<WRBxPositions.length; i++){
			//console.log(WRFzPositions[i]);
        //Dan: WaistRFront
      var pointCloudWRB = new THREE.Mesh(geometryWRB, materialWRB);
      pointCloudWRB.position.x =WRBxPositions[i];
      pointCloudWRB.position.y =WRByPositions[i];
      pointCloudWRB.position.z =WRBzPositions[i];

      pointCloudWRB.updateMatrix();
      //pointCloud.m	atrixAutoUpdate = false;
      scene.add(pointCloudWRB);
    }

//DAN BackTOP
		var BTxPositions = data.BTX;
    var BTyPositions = data.BTY;
    var BTzPositions = data.BTZ;
		var materialBT = new THREE.MeshBasicMaterial({
			color:'rgb(0,255,255)'
		});
		var geometryBT = new THREE.BoxGeometry(0.5, 0.5, 0.5);

    for (var i =0; i<BTxPositions.length; i++){
			//console.log(WRFzPositions[i]);
        //Dan: WaistRFront
      var pointCloudBT = new THREE.Mesh(geometryBT, materialBT);
      pointCloudBT.position.x =BTxPositions[i];
      pointCloudBT.position.y =BTyPositions[i];
      pointCloudBT.position.z =BTzPositions[i];

      pointCloudBT.updateMatrix();
      //pointCloud.m	atrixAutoUpdate = false;
      scene.add(pointCloudBT);
    }
//DAN CHEST
		var CxPositions = data.CX;
    var CyPositions = data.CY;
    var CzPositions = data.CZ;
		var materialC = new THREE.MeshBasicMaterial({
			color:'rgb(100,100,255)'
		});
		var geometryC = new THREE.BoxGeometry(0.5, 0.5, 0.5);

    for (var i =0; i<CxPositions.length; i++){
			//console.log(WRFzPositions[i]);
        //Dan: WaistRFront
      var pointCloudC = new THREE.Mesh(geometryC, materialC);
      pointCloudC.position.x =CxPositions[i];
      pointCloudC.position.y =CyPositions[i];
      pointCloudC.position.z =CzPositions[i];

      pointCloudC.updateMatrix();
      //pointCloud.m	atrixAutoUpdate = false;
      scene.add(pointCloudC);
    }

//DAN BACK LEFT
		var BLxPositions = data.BLX;
    var BLyPositions = data.BLY;
    var BLzPositions = data.BLZ;
		var materialBL = new THREE.MeshBasicMaterial({
			color:'rgb(255,100,100)'
		});
		var geometryBL = new THREE.BoxGeometry(0.5, 0.5, 0.5);

    for (var i =0; i<BLxPositions.length; i++){
			//console.log(WRFzPositions[i]);
        //Dan: WaistRFront
      var pointCloudBL = new THREE.Mesh(geometryBL, materialBL);
      pointCloudBL.position.x =BLxPositions[i];
      pointCloudBL.position.y =BLyPositions[i];
      pointCloudBL.position.z =BLzPositions[i];

      pointCloudBL.updateMatrix();
      //pointCloud.m	atrixAutoUpdate = false;
      scene.add(pointCloudBL);
    }

		//DAN BACK RIGHT
				var BRxPositions = data.BRX;
		    var BRyPositions = data.BRY;
		    var BRzPositions = data.BRZ;
				var materialBR = new THREE.MeshBasicMaterial({
					color:'rgb(155,100,0)'
				});
				var geometryBR = new THREE.BoxGeometry(0.5, 0.5, 0.5);

		    for (var i =0; i<BRxPositions.length; i++){
					//console.log(WRFzPositions[i]);
		        //Dan: WaistRFront
		      var pointCloudBR = new THREE.Mesh(geometryBR, materialBR);
		      pointCloudBR.position.x =BRxPositions[i];
		      pointCloudBR.position.y =BRyPositions[i];
		      pointCloudBR.position.z =BRzPositions[i];

		      pointCloudBR.updateMatrix();
		      //pointCloud.m	atrixAutoUpdate = false;
		      scene.add(pointCloudBR);
		    }
				//DAN head top
						var HTxPositions = data.HTX;
				    var HTyPositions = data.HTY;
				    var HTzPositions = data.HTZ;
						var materialHT = new THREE.MeshBasicMaterial({
							color:'rgb(200,80,190)'
						});
						var geometryHT = new THREE.BoxGeometry(0.5, 0.5, 0.5);

				    for (var i =0; i<HTxPositions.length; i++){
							//console.log(WRFzPositions[i]);
				        //Dan: WaistRFront
				      var pointCloudHT = new THREE.Mesh(geometryHT, materialHT);
				      pointCloudHT.position.x =HTxPositions[i];
				      pointCloudHT.position.y =HTyPositions[i];
				      pointCloudHT.position.z =HTzPositions[i];

				      pointCloudHT.updateMatrix();
				      //pointCloud.m	atrixAutoUpdate = false;
				      scene.add(pointCloudHT);
				    }

				//DAN head FRONT
						var HFxPositions = data.HFX;
				    var HFyPositions = data.HFY;
				    var HFzPositions = data.HFZ;
						var materialHF = new THREE.MeshBasicMaterial({
							color:'rgb(190,180,130)'
						});
						var geometryHF = new THREE.BoxGeometry(0.5, 0.5, 0.5);

				    for (var i =0; i<HFxPositions.length; i++){
							//console.log(WRFzPositions[i]);
				        //Dan: WaistRFront
				      var pointCloudHF = new THREE.Mesh(geometryHF, materialHF);
				      pointCloudHF.position.x =HFxPositions[i];
				      pointCloudHF.position.y =HFyPositions[i];
				      pointCloudHF.position.z =HFzPositions[i];

				      pointCloudHF.updateMatrix();
				      //pointCloud.m	atrixAutoUpdate = false;
				      scene.add(pointCloudHF);
				    }
			//DAN LFET SHOULDER BACK
					var LSBxPositions = data.LSBX;
					var LSByPositions = data.LSBY;
					var LSBzPositions = data.LSBZ;
					var materialLSB = new THREE.MeshBasicMaterial({
						color:'rgb(200,185,195)'
					});
					var geometryLSB = new THREE.BoxGeometry(0.5, 0.5, 0.5);

					for (var i =0; i<LSBxPositions.length; i++){
						//console.log(WRFzPositions[i]);
							//Dan: WaistRFront
						var pointCloudLSB = new THREE.Mesh(geometryLSB, materialLSB);
						pointCloudLSB.position.x =LSBxPositions[i];
						pointCloudLSB.position.y =LSByPositions[i];
						pointCloudLSB.position.z =LSBzPositions[i];

						pointCloudLSB.updateMatrix();
						//pointCloud.m	atrixAutoUpdate = false;
						scene.add(pointCloudLSB);
					}
			//DAN LFET SHOULDER TOP
					var LSTxPositions = data.LSTX;
					var LSTyPositions = data.LSTY;
					var LSTzPositions = data.LSTZ;
					var materialLST = new THREE.MeshBasicMaterial({
						color:'rgb(200,100,130)'
					});
					var geometryLST = new THREE.BoxGeometry(0.5, 0.5, 0.5);

					for (var i =0; i<LSTxPositions.length; i++){
						//console.log(WRFzPositions[i]);
							//Dan: WaistRFront
						var pointCloudLST = new THREE.Mesh(geometryLST, materialLST);
						pointCloudLST.position.x =LSTxPositions[i];
						pointCloudLST.position.y =LSTyPositions[i];
						pointCloudLST.position.z =LSTzPositions[i];

						pointCloudLST.updateMatrix();
						//pointCloud.m	atrixAutoUpdate = false;
						scene.add(pointCloudLST);
					}
			//DAN Left Elbow Out
					var LEOxPositions = data.LEOX;
					var LEOyPositions = data.LEOY;
					var LEOzPositions = data.LEOZ;
					var materialLEO = new THREE.MeshBasicMaterial({
						color:'rgb(10,190,255)'
					});
					var geometryLEO = new THREE.BoxGeometry(0.5, 0.5, 0.5);

					for (var i =0; i<LEOxPositions.length; i++){
						var pointCloudLEO = new THREE.Mesh(geometryLEO, materialLEO);
						pointCloudLEO.position.x =LEOxPositions[i];
						pointCloudLEO.position.y =LEOyPositions[i];
						pointCloudLEO.position.z =LEOzPositions[i];

						pointCloudLEO.updateMatrix();
						//pointCloud.m	atrixAutoUpdate = false;
						scene.add(pointCloudLEO);
					}
			//Dan:LUArmHigh
					var LUAHxPositions = data.LUAHX;
					var LUAHyPositions = data.LUAHY;
					var LUAHzPositions = data.LUAHZ;
					var materialLUAH = new THREE.MeshBasicMaterial({
						color:'rgb(10,90,55)'
					});
					var geometryLUAH = new THREE.BoxGeometry(0.5, 0.5, 0.5);

					for (var i =0; i<LUAHxPositions.length; i++){
						var pointCloudLUAH = new THREE.Mesh(geometryLUAH, materialLUAH);
						pointCloudLUAH.position.x =LUAHxPositions[i];
						pointCloudLUAH.position.y =LUAHyPositions[i];
						pointCloudLUAH.position.z =LUAHzPositions[i];

						pointCloudLUAH.updateMatrix();
						//pointCloud.m	atrixAutoUpdate = false;
						scene.add(pointCloudLUAH);
					}
			//Dan:RShoulderBack
					var RSBxPositions = data.RSBX;
					var RSByPositions = data.RSBY;
					var RSBzPositions = data.RSBZ;
					var materialRSB = new THREE.MeshBasicMaterial({
						color:'rgb(200,130,55)'
					});
					var geometryRSB = new THREE.BoxGeometry(0.5, 0.5, 0.5);

					for (var i =0; i<RSBxPositions.length; i++){
						var pointCloudRSB = new THREE.Mesh(geometryRSB, materialRSB);
						pointCloudRSB.position.x =RSBxPositions[i];
						pointCloudRSB.position.y =RSByPositions[i];
						pointCloudRSB.position.z =RSBzPositions[i];

						pointCloudRSB.updateMatrix();
						//pointCloud.m	atrixAutoUpdate = false;
						scene.add(pointCloudRSB);
					}
			//Dan:RShoulderTop
			var RSTxPositions = data.RSTX;
			var RSTyPositions = data.RSTY;
			var RSTzPositions = data.RSTZ;
			var materialRST = new THREE.MeshBasicMaterial({
				color:'rgb(35, 201, 186)'
			});
			var geometryRST = new THREE.BoxGeometry(0.5, 0.5, 0.5);

			for (var i =0; i<RSTxPositions.length; i++){
				var pointCloudRST = new THREE.Mesh(geometryRST, materialRST);
				pointCloudRST.position.x =RSTxPositions[i];
				pointCloudRST.position.y =RSTyPositions[i];
				pointCloudRST.position.z =RSTzPositions[i];

				pointCloudRST.updateMatrix();
				//pointCloud.m	atrixAutoUpdate = false;
				scene.add(pointCloudRST);
			}
			//Dan:RElbowOut
			var REOxPositions = data.REOX;
			var REOyPositions = data.REOY;
			var REOzPositions = data.REOZ;
			var materialREO = new THREE.MeshBasicMaterial({
				color:'rgb(245, 55, 127)'
			});
			var geometryREO = new THREE.BoxGeometry(0.5, 0.5, 0.5);

			for (var i =0; i<REOxPositions.length; i++){
				var pointCloudREO = new THREE.Mesh(geometryREO, materialREO);
				pointCloudREO.position.x =REOxPositions[i];
				pointCloudREO.position.y =REOyPositions[i];
				pointCloudREO.position.z =REOzPositions[i];

				pointCloudREO.updateMatrix();
				//pointCloud.m	atrixAutoUpdate = false;
				scene.add(pointCloudREO);
			}
			//Dan:RUArmHigh
			var RUAHxPositions = data.RUAHX;
			var RUAHyPositions = data.RUAHY;
			var RUAHzPositions = data.RUAHZ;
			var materialRUAH = new THREE.MeshBasicMaterial({
				color:'rgb(255, 131, 0)'
			});
			var geometryRUAH = new THREE.BoxGeometry(0.5, 0.5, 0.5);

			for (var i =0; i<REOxPositions.length; i++){
				var pointCloudRUAH = new THREE.Mesh(geometryRUAH, materialRUAH);
				pointCloudRUAH.position.x =RUAHxPositions[i];
				pointCloudRUAH.position.y =RUAHyPositions[i];
				pointCloudRUAH.position.z =RUAHzPositions[i];

				pointCloudRUAH.updateMatrix();
				//pointCloud.m	atrixAutoUpdate = false;
				scene.add(pointCloudRUAH);
			}


  });
}

function onWindowResize(){
  camera.aspect = width/height;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  controls.handleResize();
  render();
}

 function onDocumentMouseMove(event){
	 event.preventDefault();
	 mouse.x =(event.clientX / window.innerWidth) * 2 -1;
	 mouse.y = - (event.clientY / window.innerHeight) * 2 +1;
 }

 function render() {
  //camera.lookAt( scene.position );

	renderer.render(scene, camera);
	// raycaster.setFromCamera ( mouse, camera);
	//
	// var intersects = raycaster.intersectObjects(scene.children);
	// if (intersects.length>0){
	// 	if(INTERSECTED != intersects[0].object){
  //      INTERSECTED.geometryRUAH = new THREE.BoxGeometry(30,30,30);
	// 	}
	// }
}

var animateParticles = function() {
	requestAnimationFrame (animateParticles);
  controls.update();
}
