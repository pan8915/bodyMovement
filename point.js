if (!Detector.webgl) Detector.addGetWebGLMessage();

var cloud = new THREE.Object3D();
var container, camera, controls, scene, raycaster, renderer, geometry, parameters, size, color, materials = [], i;
var width = window.innerWidth;
var height = window.innerHeight;
var particles;
var mouse = 0;
var clock;
var intersection = null;
var mixer, mesh;

init();
animateParticles();

var INTERSECTED;

function init() {
    container = document.getElementById('container');
    //create a new camera;
    camera = new THREE.PerspectiveCamera(70, width / height, 1, 10000);
    camera.position.set(-753.34552, 1575.938293, 2000);

    clock = new THREE.Clock();

    controls = new THREE.TrackballControls(camera);
    //controls.target.set(1000, 500, 7);
    //add a scene; scene contains all 3D data
    scene = new THREE.Scene();
    scene.background = new THREE.Color('rgb(50,50,50)');

    mixer = new THREE.AnimationMixer(scene);
    var loader = new THREE.JSONLoader();
    loader.load('bvh/monster.js', handle_load);

    function handle_load(geometry, materialsM) {
        //ANIMATION MESH
        var materialM = materialsM[0];
        materialM.morphTargets = true;
        materialM.color.setHex(0xffaaaa);

        mesh = new THREE.Mesh(geometry, materialM);
        mesh.position.set(-753.34552, 1075.938293, 100);
        mesh.scale.set(0.5, 0.5, 0.5);

        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        scene.add(mesh);

        mixer.clipAction(geometry.animations[0], mesh).setDuration(1).startAt(-Math.random()).play();
    }


    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 3.2;
    controls.panSpeed = 1.2;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 2.6;

    controls.addEventListener('change', render);

    makeParticles();

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);
    var light = new THREE.DirectionalLight(0x002288);
    light.position.set(-1, -1, -1);
    scene.add(light);
    var light = new THREE.AmbientLight(0x222222);
    scene.add(light);

    scene.add(cloud);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);
    // var container = document.getElementById('container');
    // container.appendChild(renderer.domElement);
    // document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
}


function makeParticles() {
    $.getJSON('data.json', function (data) {
        //WLF
        drawPoints(data.WLFX, data.WLFY, data.WLFZ, 'rgb(255,255,255)');

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
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function drawPoints(xPos, yPos, zPos, color) {
    var xPositions = xPos;
    var yPositions = yPos;
    var zPositions = zPos;

    geometry = new THREE.Geometry();
    for (var j = 0; j < xPositions.length; j++) {
        var vertex = new THREE.Vector3();
        vertex.x = xPositions[j];
        vertex.y = yPositions[j];
        vertex.z = zPositions[j];
        geometry.vertices.push(vertex);
    }


        size = 1;
        //console.log('size=' + size);
        var sprite = new THREE.TextureLoader().load("img/circle.png");
        materials[i] = new THREE.PointsMaterial({
            size: size,
            sizeAttenuation: false,
            map: sprite,
            color:color,
            alphaTest: 0.5,
            transparent: true
        });
        particles = new THREE.Points(geometry, materials[i]);
        scene.add(particles);

}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    render();
    controls.update();
}

function render() {
    mixer.update(clock.getDelta());
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    //find intersections
    raycaster.setFromCamera(mouse, camera);
    var intersections = raycaster.intersectObjects(scene.children);
    intersection = (intersections.length) > 0 ? intersections[0] : null;

    if (intersection) {
        for (var h = 0; h < intersections.length; h++) {
            var intersection = intersections[h],
                obj = intersection.object;
            //obj.material.color.setRGB(255, 255, 255);
            //obj.geometry = new THREE.CircleGeometry(8,10);
        }
    }

}

