import * as THREE from 'three'

			let camera, scene, renderer, stars=[]
			
			function init() {	
				camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000)
				camera.position.z = 5	 
				scene = new THREE.Scene()
				renderer = new THREE.WebGLRenderer()
				renderer.setSize( window.innerWidth, window.innerHeight )
				document.body.appendChild(renderer.domElement)
			}

			function addSphere() {
				for (let z= -1000; z < 1000; z+=4) {
					let geometry   = new THREE.SphereGeometry(0.5, 15, 15)
					let material = new THREE.MeshBasicMaterial( {color: '#5D398A'} )
					let sphere = new THREE.Mesh(geometry, material)
					sphere.position.x = Math.random() * 1000 - 500
					sphere.position.y = Math.random() * 1000 - 500
					sphere.position.z = z
					sphere.scale.x = sphere.scale.y = 4
					scene.add( sphere )
					stars.push(sphere)
				}
			}

			function animateStars() { 
				for(let i=0; i<stars.length; i++) {
					let star = stars[i]
					star.position.z +=  i/40
					if(star.position.z>1000) star.position.z-=2000
				}
			}
		
			function render() {
				requestAnimationFrame(render)
				renderer.render(scene, camera)
				animateStars()
			}

			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
			}

			addEventListener('resize', (event) => onWindowResize());
			
			init()
			addSphere()
			render()