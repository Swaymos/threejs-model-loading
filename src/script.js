import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const color1 = new THREE.Color();

const scene = new THREE.Scene();

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

// Materials

const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color("purple")

// Mesh
const sphere = new THREE.Mesh(geometry,material)
// scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight("#F4F6F0", 1)
pointLight.position.x = 1
pointLight.position.y = 1
pointLight.position.z = 1
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 10
scene.add(camera)



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setClearColor("#F4F6F0")
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Loading Model

const loader = new GLTFLoader()
loader.load(
    'landscape.glb',
    function (gltf) {
        // gltf.scene.position.y = 3;
        // gltf.scene.scale.set(10,10,10);
        // gltf.scene.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         const m = (child as THREE.Mesh)
        //         m.receiveShadow = true
        //         m.castShadow = true
        //     }
        //     if (((child as THREE.Light)).isLight) {
        //         const l = (child as THREE.Light)
        //         l.castShadow = true
        //         l.shadow.bias = -.003
        //         l.shadow.mapSize.width = 2048
        //         l.shadow.mapSize.height = 2048
        //     }
        // })
        scene.add(gltf.scene)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

tick()