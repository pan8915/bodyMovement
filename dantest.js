if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var container = document.getElementById( 'container' );
var scene, renderer, camera, controls, stats;
var mesh, skeleton, mixer;
var myAction;

var actions;
var settings;
var clock = new THREE.Clock();

var url = 'model/dandemobody.json';

// Initialize scene, light and renderer

scene = new THREE.Scene();
scene.add( new THREE.AmbientLight( 0xffffff ) );

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setClearColor(0x333333);
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

container.appendChild( renderer.domElement );


// Load skinned mesh

new THREE.ObjectLoader().load( url, function ( loadedObject ) {

    loadedObject.traverse( function ( child ) {

        if ( child instanceof THREE.SkinnedMesh ) {

            mesh = child;

        }

    } );

    // Add mesh and skeleton helper to scene
    scene.add( mesh );

    skeleton = new THREE.SkeletonHelper( mesh );
    skeleton.visible = false;
    scene.add( skeleton );


    // Initialize camera and camera controls

    var radius = mesh.geometry.boundingSphere.radius;

    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera( 45, aspect, 1, 10000 );
    camera.position.set( 0.0, radius, radius * 3.5 );


    // Initialize mixer and clip actions

    mixer = new THREE.AnimationMixer( mesh );


    myAction = mixer.clipAction( 'pers0812 11.39.05 AM' );
    actions = [ myAction ];

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, radius, 0 );
    controls.update();

    activateAllActions();
    animate();

} );



    settings = {
        'show model':            true,
        'show skeleton':         false,
        'activate all':          activateAllActions,
        'modify step size':      0.05,
        'use default duration':  true,
        'modify walk weight':    1.0,
        'modify time scale':     .050
    };



function deactivateAllActions() {

    actions.forEach( function ( action ) {

        action.stop();

    } );

}


function activateAllActions() {


    setWeight( myAction, settings[ 'modify walk weight' ] );


    actions.forEach( function ( action ) {

        action.play();

    } );

}


function setWeight( action, weight ) {

    action.enabled = true;
    action.setEffectiveTimeScale( 1 );
    action.setEffectiveWeight( weight );

}


function animate() {

    // Render loop

    requestAnimationFrame( animate );

    // Get the time elapsed since the last frame, used for mixer update (if not in single step mode)

    var mixerUpdateDelta = clock.getDelta();

    // Update the animation mixer, the stats panel, and render this frame

    mixer.update( mixerUpdateDelta );

    renderer.render( scene, camera );

}
