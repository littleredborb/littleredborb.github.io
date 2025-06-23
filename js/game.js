// global var
var camera,
    scene,
    renderer,
    controls;
var mouse = new THREE.Vector2();
var spotLight, spotLight2;
var lights_off = false;
var ambientLight;
var door = new Array();
var door_opened = false;
var noAnim = true;
var tokoAnim = true;
var toko_opened = false;
var tokonoma;
var bgm = document.createElement('audio');
    bgm.src = 'music.mp3';
bgm.loop = true;
bgm.play();
var fan;
var fanSpeed=0.3;
var kotatsu, table;
var cold = false;
var teapot;
var pourAnim= false;
var tea;
var drink = false;

function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xc1c1c1 );
    
    var aspect = window.innerWidth / window.innerHeight;
    var d = 20;
    camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );
    
    //orient camera to isometric
    camera.position.set(20,20,20);
    //look at origin
    camera.lookAt(new THREE.Vector3( 20, 20, 20 ));
    
    
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.gammaInput = true;
	renderer.gammaOutput = true;
    
    //------
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    
    //------
    // instantiate a loader
    var loader = new THREE.JSONLoader();

    // load a resource
    loader.load(
        // resource URL
        'models/kotatsu.json',
        // Function when resource is loaded
        function ( geometry, materials ) {
            var material = new THREE.MeshFaceMaterial( materials );
            var object = new THREE.Mesh( geometry, material );
            scene.add( object );
            object.position.set(0, 2.9, 3);
            object.castShadow=true;
            object.receiveShadow=true;
            object.visible=false;
            kotatsu = object;
            
        }
    );
    loader.load(
        // resource URL
        'models/table3.json',
        // Function when resource is loaded
        function ( geometry, materials ) {
            var material = new THREE.MeshFaceMaterial( materials );
            var object = new THREE.Mesh( geometry, material );
            scene.add( object );
            object.position.set(0, 2.9, 3);
            object.castShadow=true;
            object.receiveShadow=true;
            table = object;
        }
    );
    
    loader.load(
        // resource URL
        'models/teaset.json',
        // Function when resource is loaded
        function ( geometry, materials ) {
            var material = new THREE.MeshFaceMaterial( materials );
            var object = new THREE.Mesh( geometry, material );
            scene.add( object );
            object.position.set(0, 5, 3);
            object.castShadow=true;
            object.receiveShadow=true;
        }
    );
    
    loader.load(
        // resource URL
        'models/teapot.json',
        // Function when resource is loaded
        function ( geometry, materials ) {
            var material = new THREE.MeshFaceMaterial( materials );
            var object = new THREE.Mesh( geometry, material );
            scene.add( object );
            object.position.set(0, 6, 2);
            object.rotation.y= -45 *Math.PI/180;
            object.castShadow=true;
            object.receiveShadow=true;
            teapot = object;
        }
    );
    
    loader.load(
        // resource URL
        'models/light.json',
        // Function when resource is loaded
        function ( geometry, materials ) {
            var material = new THREE.MeshFaceMaterial( materials );
            var object = new THREE.Mesh( geometry, material );
            scene.add( object );
            object.position.set(0, 20, 4);
            object.castShadow=false;
            object.receiveShadow=false;
        }
    );
    loader.load(
        // resource URL
        'models/door.json',
        // Function when resource is loaded
        function ( geometry, materials ) {
            var material = new THREE.MeshFaceMaterial( materials );
            var object = new THREE.Mesh( geometry, material );
            scene.add( object );
            object.position.set(-10.8, 6.5, 4);
            object.castShadow=true;
            object.receiveShadow=true;
            door[0] = object;
        }
    );
    loader.load(
        // resource URL
        'models/cushion.json',
        // Function when resource is loaded
        function ( geometry, materials ) {
            var material = new THREE.MeshFaceMaterial( materials );
            var object = new THREE.Mesh( geometry, material );
            var object2 = new THREE.Mesh( geometry, material );
            scene.add( object );
            object.position.set(5, 1.5, 3);
            object.castShadow=true;
            object.receiveShadow=true;
            scene.add( object2 );
            object2.position.set(-5, 1.5, 3);
            object2.castShadow=true;
            object2.receiveShadow=true;
        }
    );
    loader.load(
        // resource URL
        'models/something.json',
        // Function when resource is loaded
        function ( geometry, materials ) {
            var material = new THREE.MeshFaceMaterial( materials );
            var object = new THREE.Mesh( geometry, material );
            var object2 = new THREE.Mesh( geometry, material );
            scene.add( object );
            object.position.set(4.5, 1.5, -7);
            object.castShadow=true;
            object.receiveShadow=true;
        }
    );
    
    loader.load(
        // resource URL
        'models/something2.json',
        // Function when resource is loaded
        function ( geometry, materials ) {
            var material = new THREE.MeshFaceMaterial( materials );
            var object = new THREE.Mesh( geometry, material );
            var object2 = new THREE.Mesh( geometry, material );
            scene.add( object );
            object.position.set(-5.5, 1.5, -7);
            object.castShadow=true;
            object.receiveShadow=true;
        }
    );
    
    loader.load(
        // resource URL
        'models/tea.json',
        // Function when resource is loaded
        function ( geometry, materials ) {
            var material = new THREE.MeshFaceMaterial( materials );
            var object = new THREE.Mesh( geometry, material );
            var object2 = new THREE.Mesh( geometry, material );
            scene.add( object );
            object.position.set(0, 4, 3);
            object.receiveShadow=true;
            tea = object;
        }
    );
    
    loader.load(
        // resource URL
        'models/tokonoma.json',
        // Function when resource is loaded
        function ( geometry, materials ) {
            var material = new THREE.MeshFaceMaterial( materials );
            var object = new THREE.Mesh( geometry, material );
            scene.add( object );
            object.position.set(-5.5, 1.5, -7);
            object.castShadow=true;
            object.receiveShadow=true;
            tokonoma = object;
        }
    );
    
    loader.load(
        // resource URL
        'models/fan.json',
        // Function when resource is loaded
        function ( geometry, materials ) {
            var material = new THREE.MeshFaceMaterial( materials );
            var object = new THREE.Mesh( geometry, material );
            scene.add( object );
            object.position.set(-7, 0.5, 8);
            object.scale.set(1.1,1.1,1.1);
            object.rotation.y+=0.1;
            object.castShadow=true;
            object.receiveShadow=true;
        }
    );
    loader.load(
        // resource URL
        'models/fan2.json',
        // Function when resource is loaded
        function ( geometry, materials ) {
            var material = new THREE.MeshFaceMaterial( materials );
            geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, -4, 0 ) );
            var object = new THREE.Mesh( geometry, material );
            scene.add( object );
            object.position.set(-7, 4.6, 8);
            object.scale.set(1.1,1.1,1.1);
            object.rotation.y+=90;
            object.castShadow=true;
            object.receiveShadow=true;
            fan = object;
        }
    );
    
    ambientLight = new THREE.AmbientLight( 0xad7c7c );
    scene.add(ambientLight); 
    //mainlight
    spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 0 , 50, 10 );
    spotLight.castShadow = true;
    spotLight.shadowDarkness=0.5;
    spotLight.shadowCameraVisible = true;
    spotLight.shadowCameraRight     =  2;
    spotLight.shadowCameraLeft     = -2;
    spotLight.shadowCameraTop      =  2;
    spotLight.shadowCameraBottom   = -2;
    spotLight.angle = 0.5;
    spotLight.distance = 100;
    spotLight.penumbra = 0.05;
    
    //outlight
    spotLight2 = new THREE.SpotLight( 0xfdffe4 );
    spotLight2.position.set( -20 , 17, 3 );
    spotLight2.castShadow = true;
    spotLight2.shadowDarkness=0.5;
    spotLight2.shadowCameraVisible = true;
    spotLight2.shadowCameraRight     =  2;
    spotLight2.shadowCameraLeft     = -2;
    spotLight2.shadowCameraTop      =  2;
    spotLight2.shadowCameraBottom   = -2;
    spotLight2.angle = 0.5;
    spotLight2.distance = 100;
    spotLight2.penumbra = 0.05;
    
    scene.add(spotLight);
    scene.add(spotLight2);
    spotLight2.visible = false;
    //var lightHelper = new THREE.SpotLightHelper( spotLight2 );
    //scene.add( lightHelper );
    var material = [];
    material[0] = new THREE.MeshLambertMaterial( { color: 0x392213 } ); //wood
    material[1] = new THREE.MeshLambertMaterial({color: 0xefd2b1}); //cream
    material[2] = new THREE.MeshLambertMaterial({color: 0xa0c97b}); //tatami
    material[3] = new THREE.MeshLambertMaterial({color: 0x1f2c13}); //darktatami
    
    var meshTatami = new THREE.BoxGeometry( 12.5, 0.2, 6 );
    var meshTatami2 = new THREE.BoxGeometry( 8.5, 0.2, 5.5 );
    var meshFloor = new THREE.BoxGeometry( 20, 2, 20 );
    var meshWall = new THREE.BoxGeometry( 20, 20, 2 );
    var meshCeil = new THREE.BoxGeometry( 20, 2, 5 );
    var meshWall2 = new THREE.BoxGeometry( 10, 20, 2 );
    var meshWall3 = new THREE.BoxGeometry( 2, 20, 2 );
    var meshWall4 = new THREE.BoxGeometry( 9, 4, 2 );
    var meshWall6 = new THREE.BoxGeometry( 2, 4.5, 20 );
    var meshWall5 = new THREE.BoxGeometry( 7, 20, 1 );
    var meshBeam = new THREE.BoxGeometry( 20, 1, 0.4 );
    var meshBeam2 = new THREE.BoxGeometry( 1, 20, 0.4 );
    var meshDoor = new THREE.BoxGeometry( 1, 15, 9 );
    var meshScreen = new THREE.BoxGeometry( 1.5, 3, 3 );
    
    var Beam1 = new THREE.Mesh( meshBeam, material[0] );
    var Beam2 = new THREE.Mesh( meshBeam, material[0] );
    var Beam3 = new THREE.Mesh( meshBeam2, material[0] );
    var Beam4 = new THREE.Mesh( meshBeam2, material[0] );
    var Beam5 = new THREE.Mesh( meshBeam2, material[0] );
    var Tatami1 = new THREE.Mesh( meshTatami, material[2] );
    var Tatami2 = new THREE.Mesh( meshTatami, material[2] );
    var Tatami3 = new THREE.Mesh( meshTatami, material[2] );
    var Tatami4 = new THREE.Mesh( meshTatami2, material[2] );
    var wall1 = new THREE.Mesh( meshWall, material[1] );
    var wall2 = new THREE.Mesh( meshWall2, material[1] );
    var wall3 = new THREE.Mesh( meshWall3, material[1] );
    var wall4 = new THREE.Mesh( meshWall4, material[1] );
    var wall5 = new THREE.Mesh( meshWall5, material[1] );
    var wall6 = new THREE.Mesh( meshWall6, material[1] );
    var floor = new THREE.Mesh( meshFloor, material[3] );
    var ceil = new THREE.Mesh( meshCeil, material[1] );
    /*
    door[0] = new THREE.Mesh( meshDoor, material[0] );
    door[1] = new THREE.Mesh( meshScreen, material[1] );
    door[2] = new THREE.Mesh( meshScreen, material[1] );
    door[3] = new THREE.Mesh( meshScreen, material[1] );
    door[4] = new THREE.Mesh( meshScreen, material[1] );
    door[5] = new THREE.Mesh( meshScreen, material[1] );
    door[6] = new THREE.Mesh( meshScreen, material[1] );
    */
    
    floor.receiveShadow = true;
    
    floor.castShadow = true;
    wall1.castShadow = true;
    wall1.receiveShadow = true;
    wall2.castShadow = true;
    wall2.receiveShadow = true;
    wall3.castShadow = true;
    wall3.receiveShadow = true;
    wall4.castShadow = true;
    wall4.receiveShadow = true;
    wall5.castShadow = true;
    wall5.receiveShadow = true;
    wall6.castShadow = true;
    wall6.receiveShadow = true;
    Beam1.castShadow = true;
    Beam1.receiveShadow = true;
    Beam2.receiveShadow = true;
    Beam2.castShadow = true;
    Beam3.receiveShadow = true;
    Beam3.castShadow = true;
    Beam4.receiveShadow = true;
    Beam4.castShadow = true;
    Beam5.receiveShadow = true;
    Beam5.castShadow = true;
    scene.add( floor );
    scene.add( wall1 );
    scene.add( wall2 );
    scene.add( wall3 );
    scene.add( wall4 );
    scene.add( wall5 );
    scene.add( wall6 );
    scene.add(Tatami1);
    scene.add(Tatami2);
    scene.add(Tatami3);
    scene.add(Beam1);
    scene.add(Beam2);
    scene.add(Beam3);
    scene.add(Beam4);
    scene.add(Beam5);
    scene.add(Tatami4);
    scene.add(ceil);
    ceil.position.set(0,18,-8);
    ceil.receiveShadow = true;
    ceil.castShadow = true;
    /*
    for(var i=0; i< door.length; i++){
        door[i].castShadows=true;
        door[i].receiveShadows=true;
        scene.add(door[i]);
         
    }*/
   
    //scene.add(tab);
    
    Beam1.position.set(0,15,-3.3);
    Beam2.position.set(-9.9,15,0);
    Beam2.rotation.y = Math.PI / 2;
    Beam3.position.set(-9.9,9,0);
    Beam3.rotation.y = Math.PI / 2;
    Beam4.position.set(-9.9,9,8);
    Beam4.rotation.y = Math.PI / 2;
    Beam5.position.set(0,9,-3.2);
    
    Tatami1.position.set(3.2,1,6.5);
    Tatami2.position.set(3.2,1,0);
    Tatami3.position.set(-6.5,1,3.2);
    Tatami3.rotation.y = Math.PI / 2;
    
    Tatami1.receiveShadow = true;
    Tatami2.receiveShadow = true;
    Tatami3.receiveShadow = true;
    Tatami1.castShadow = true;
    Tatami2.castShadow = true;
    Tatami3.castShadow = true;
    
    
    floor.position.set(0, 0, 0);
    wall1.position.set(0, 9, -11);
    wall2.position.set(-11, 9, -5);
    wall2.rotation.y = Math.PI / 2;
    wall3.position.set(-11, 9, 9);
    wall3.rotation.y = Math.PI / 2;
    wall4.position.set(-11, 17   , 4);
    wall4.rotation.y = Math.PI / 2;
    wall5.position.set(0, 9 , -7);
    wall5.rotation.y = Math.PI / 2;
    wall6.position.set(0, 16.8 , -4.5);
    wall6.rotation.y = Math.PI / 2;
    /*
    door[0].position.set(-10.8, 8, 3);
    door[1].position.set(-10.8, 11, 5.5);
    door[2].position.set(-10.8, 11, 2);
    door[3].position.set(-10.8, 7, 5.5);
    door[4].position.set(-10.8, 7, 2);
    door[5].position.set(-10.8, 3, 5.5);
    door[6].position.set(-10.8, 3, 2);
    */
    
    Tatami4.position.set(5.2,1.9,-7);
    
}

function render(){
    requestAnimationFrame( render );
	moveDoor();
    moveTokonoma();
    fan.rotation.z+=fanSpeed;
    pourTea();
    renderer.render( scene, camera );
    controls.update();
    document.onkeydown = keydown;
}

function moveTokonoma(){
    if(!tokoAnim){
        console.log(door[0].position.z);
        if(toko_opened){
                tokonoma.position.x+=0.1;
            if(tokonoma.position.x>=-5.5){
                tokoAnim = true;
                toko_opened=false;
            }
        }
        else{
            tokonoma.position.x-=0.1;
            if(tokonoma.position.x<-8.5){
                tokoAnim = true;
                toko_opened=true;
            }
        }
                
    }
}


function moveDoor(){
    if(!noAnim){
        console.log(door[0].position.z);
        if(door_opened){
            for(var i=0; i< door.length; i++){
                door[i].position.z+=0.2;
            }
            
            if(door[0].position.z>=4){
                noAnim = true;
                door_opened=false;
            }
        }
        else{
            for(var i=0; i< door.length; i++){
                door[i].position.z-=0.2;
            }
            if(door[0].position.z<=-4){
                noAnim = true;
                door_opened=true;
            }
        }
                
    }
}
var a1=false;
var a2=false;
function pourTea(){
    if(pourAnim){
        if(!a1){
            teapot.position.y+=0.1;
            teapot.rotation.y+=0.06;
            if(teapot.position.y>=7)
                a1=true;
        }
        else if(!a2){
            teapot.rotation.x+=0.06;
            if(tea.position.y <= 5.5)
                tea.position.y+=0.17;
            if(teapot.rotation.x>=30 * Math.PI/180){
                pourAnim=false;
                a2=true;
                
            }
        }            
    }
}
var teapotpour=false;
var lastAmbi = new THREE.Color( 0xad7c7c );
function keydown(event){
    var ascii=event.keyCode;	
    if(ascii == 65){
        if(lights_off){
            spotLight.visible=true;
            ambientLight.color = lastAmbi;            
            spotLight2.visible=false;
            lights_off=false;
        }
        else{
            spotLight.visible=false;
            lastAmbi = ambientLight.color;
            ambientLight.color = new THREE.Color(0x050505);
            spotLight2.visible=true;
            lights_off=true;
        }
    }
    else if(ascii == 68){
        noAnim=false;
    }
    else if(ascii == 70){
        if(!lights_off)
            ambientLight.color = new THREE.Color( 0x7c93ad );
    }
    else if(ascii == 71){
        if(!lights_off)
            ambientLight.color = new THREE.Color( 0xad7c7c );
    }
    else if(ascii == 72){
        if(!lights_off)
            ambientLight.color = new THREE.Color( 0x2f2f6a );
    }
    else if(ascii == 73){
        if(!lights_off)
            ambientLight.color = new THREE.Color( 0xe5e5e5 );
    }
    else if(ascii == 74){
        if(cold){
            kotatsu.visible=false;
            table.visible=true;
            cold=false;
        }
        else{
            kotatsu.visible=true;
            table.visible=false;
            cold=true;
        }
            
    }
    else if(ascii == 75 && !pourAnim){
        if(teapotpour){
            teapot.position.set(0, 6, 2);
            teapot.rotation.y= -45 *Math.PI/180;
            teapot.rotation.x= 0;
            teapotpour=false;
            a1=false;
            a2=false;
        }
        else{
            pourAnim=true;
            teapotpour=true;
        }
            
    }
    else if(ascii == 76){
        if(tea.position.y>=5.5){
            tea.position.y=4;
        }
            
    }
    else if(ascii == 69){
        tokoAnim=false;
    }
    else if(ascii == 49){
        fanSpeed=0.3;
    }
    else if(ascii == 50){
        fanSpeed=0.6;
    }
    else if(ascii == 48){
        fanSpeed=0;
    }
}

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;		

}

window.addEventListener( 'mousemove', onMouseMove, false );
init();
render();