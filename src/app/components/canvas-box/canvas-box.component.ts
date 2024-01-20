import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
@Component({
  selector: 'app-canvas-box',
  standalone: true,
  imports: [],
  templateUrl: './canvas-box.component.html',
  styleUrl: './canvas-box.component.css'
}) 

export class CanvasBoxComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.createThreeJsBox();
  }

  createThreeJsBox(): void {
    
    const canvas = document.getElementById('canvas-box');
    const scene = new THREE.Scene();
    const material = new THREE.MeshToonMaterial();
    

    const box = new THREE.Mesh(new THREE.BoxGeometry(34, 17, 1), 
    material);
   
   
  scene.add(box);
    const canvasSizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const camera = new THREE.PerspectiveCamera(
      50,
      canvasSizes.width / canvasSizes.height,
      0.001,
      1000
    ); 
    camera.position.z = 100;
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setClearColor(0xed05151, 1);
    renderer.setSize(canvasSizes.width, canvasSizes.height);

    window.addEventListener('resize', () => {
      canvasSizes.width = window.innerWidth;
      canvasSizes.height = window.innerHeight;

      camera.aspect = canvasSizes.width / canvasSizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(canvasSizes.width, canvasSizes.height);
      renderer.render(scene, camera);
    });
    const clock = new THREE.Clock();
    const animateGeometry = () => {
      const elapsedTime = clock.getElapsedTime();
      // Update animaiton objects
      box.rotation.x = elapsedTime;
      box.rotation.y = elapsedTime;
      box.rotation.z = elapsedTime;
      // Render
      renderer.render(scene, camera);
      // Call tick again on the next frame
      window.requestAnimationFrame(animateGeometry);
    };

    animateGeometry();
  }
}
