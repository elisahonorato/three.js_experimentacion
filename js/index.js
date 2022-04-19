import * as THREE from './threejs/three.module.js';
import{STLLoader} from './threejs/STLLoader.js';
import{OrbitControls} from './threejs/OrbitControls.js';

let scene, camera, renderer, object;



function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x172D66);


    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth/ window.innerHeight,
        0.1,
        10000
    );
    camera.position.z = 10;

    renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene.add(object);

    let control = new OrbitControls(camera, renderer.domElement);


const lights = []; 

const lightValues = [
    {colour: 0xD7FFC1, intensity: 8, dist: 12, x: 1, y: 0, z: 8},
    {colour: 0xFF7A6C, intensity: 6, dist: 12, x: -2, y: 1, z: -10},
    {colour: 0x00FFFF, intensity: 3, dist: 10, x: 0, y: 10, z: 1},
    {colour: 0xB30C58, intensity: 6, dist: 12, x: 0, y: -10, z: -1},
    {colour: 0x16A7F5, intensity: 6, dist: 12, x: 10, y: 3, z: -1},
    {colour: 0x90F615, intensity: 6, dist: 12, x: -10, y: -1, z: 0}
];
for (let i=0; i<6; i++) {

    lights[i] = new THREE.PointLight(
      lightValues[i]['colour'], 
      lightValues[i]['intensity'], 
      lightValues[i]['dist']
    );
  
    lights[i].position.set(
      lightValues[i]['x'], 
      lightValues[i]['y'], 
      lightValues[i]['z']
    );
  
    scene.add(lights[i]);

};


    animate();
}

function animate(){
    requestAnimationFrame(animate);

 
  

    renderer.render(scene, camera);
}


let loader = new STLLoader();
loader.load('./3dmodels/dioramafinale.stl', (model)=>{
    object = new THREE.Mesh(
        model,
        new THREE.MeshLambertMaterial({color: 0xFFF0CA})
    );
    object.scale.set(0.1, 0.1, 0.1);
    object.position.set(-10,-10,0);
    object.rotation.x = Math.PI/-3.6;
    init();
})
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}



