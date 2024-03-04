import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';
@Component({
  selector: 'app-laptop',
  standalone: true,
  imports: [],
  templateUrl: './laptop.component.html',
  styleUrl: './laptop.component.css'
})
export class LaptopComponent implements OnInit{
  ngOnInit(): void {
    this.createLaptop();
    this.resizeElements();  
  }
  constructor(){
    
  }
  addGeometry(){
    this.scene.add(this.mesh);
    this.scene.add(this.wireframe);
    this.scene.add(this.mesh2);
    this.scene.add(this.wireframe2);
    this.scene.add(this.mesh3);
    this.scene.add(this.wireframe3);
    this.scene.add(this.camera);
    this.scene.add(this.ambientLight);
    this.scene.add(this.pointLight);
  }
  resizeInitialElements() {
    this.width = window.innerWidth-30;
    this.height = window.innerHeight;
  
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  
    this.renderer.setSize(this.width, this.height);
  
    // Ajustar la escala de los objetos al nuevo tamaño de la ventana
    const aspectRatio = this.lengthBackScreen / this.widthBackScreen;

    const newWidth = this.width * 0.04;
    const newHeight = newWidth / aspectRatio;
  
    this.mesh.scale.set(newWidth / this.lengthBackScreen, newHeight / this.widthBackScreen, 1);
    this.wireframe.scale.set(newWidth / this.lengthBackScreen, newHeight / this.widthBackScreen, 1);
  
    this.mesh2.scale.set(newWidth / this.lengthBackScreen, newHeight / this.widthBackScreen, 1);
    this.wireframe2.scale.set(newWidth / this.lengthBackScreen, newHeight / this.widthBackScreen, 1);

    this.mesh3.scale.set(newWidth / this.lengthScreen, newHeight / this.widthScreen, 1);
    this.wireframe3.scale.set(newWidth / this.lengthScreen, newHeight / this.widthScreen, 1);
  
    
    // Calcular nuevas posiciones basadas en el tamaño actual de la ventana
    const mesh2Y = (-newHeight / 2) - 0.5;
    
    // Calcular la posición en Z dinámicamente
    const originalMesh2Position = new THREE.Vector3(0, mesh2Y, 0);
    const rotatedMesh2Position = originalMesh2Position.applyEuler(this.mesh2.rotation);

    // Establecer nuevas posiciones
    this.mesh2.position.set(0, mesh2Y, rotatedMesh2Position.z);
    this.wireframe2.position.set(0, mesh2Y, rotatedMesh2Position.z);
  

    this.adjustCanvasAndCamera();
    
    // Renderizar la escena con los cambios
    this.renderer.render(this.scene, this.camera);
  }
  adjustCanvasAndCamera() {
    // Ajusta el tamaño del canvas y la posición de la cámara
    if (this.width / this.height > 1.5) {
      this.camera.position.z = 65;
      this.camera.position.y=-10;
    }else if (this.width / this.height > 1.3) {
      this.camera.position.z = 60;
      this.camera.position.y=5;
    }else if (this.width / this.height > 1) {
      this.camera.position.z = 50;
    }else {
      this.camera.position.z = 45;
    }
    //alert(this.width / this.height);
    this.renderer.setSize(this.width, this.height);
    
  }

  resizeElements() {
    window.addEventListener('resize', () => {
      this.resizeInitialElements();
    });
  }

  animateGeometry=()=> {
    this.controls.update();
    this.elapsedTime = this.clock.getElapsedTime();
    this.wireframe.rotation.copy(this.mesh.rotation);
    this.wireframe2.rotation.copy(this.mesh2.rotation);
    this.wireframe3.rotation.copy(this.mesh3.rotation);
    // Call tick again on the next frame
    requestAnimationFrame(this.animateGeometry);
    // Render
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true });
    this.renderer.render(this.scene, this.camera);
  };
  
  //TODO: cambiar los document por tags # 
  //TODO: ver afterrender y beforeRender para reemplazar por window y document
  createLaptop(){
    //const controls = new OrbitControls(camera, renderer.domElement);
    this.canvas = document.getElementById('canvas-laptop');
    this.width =  window.innerWidth-20;//this.canvas.clientWidth;
    this.height = window.innerHeight-20;//this.canvas.clientHeight;
  
    this.scene = new THREE.Scene();
    this.material = new THREE.MeshBasicMaterial({ color: 0x808080 });
    this.materialScreen = new THREE.MeshBasicMaterial({ color: 0x000000 });

    this.lengthScreen = 13;
    this.widthScreen = 9;
    this.shapeScreen = new THREE.Shape();
    this.shapeScreen.moveTo(-this.lengthScreen / 2 + this.borde, -this.widthScreen / 2);
    this.shapeScreen.lineTo(this.lengthScreen / 2 - this.borde, -this.widthScreen / 2);
    this.shapeScreen.lineTo(this.lengthScreen / 2, -this.widthScreen / 2 + this.borde);
    this.shapeScreen.lineTo(this.lengthScreen / 2, this.widthScreen / 2 - this.borde);
    this.shapeScreen.lineTo(this.lengthScreen / 2 - this.borde, this.widthScreen / 2);
    this.shapeScreen.lineTo(-this.lengthScreen / 2 + this.borde, this.widthScreen / 2);
    this.shapeScreen.lineTo(-this.lengthScreen / 2, this.widthScreen / 2 - this.borde);
    this.shapeScreen.lineTo(-this.lengthScreen / 2, -this.widthScreen / 2 + this.borde);
  
    this.lengthBackScreen = 12;
    this.widthBackScreen = 8;
    this.shapeBackScreen = new THREE.Shape();
    this.shapeBackScreen.moveTo(-this.lengthBackScreen / 2 + this.borde, -this.widthBackScreen / 2);
    this.shapeBackScreen.lineTo(this.lengthBackScreen / 2 - this.borde, -this.widthBackScreen / 2);
    this.shapeBackScreen.lineTo(this.lengthBackScreen / 2, -this.widthBackScreen / 2 + this.borde);
    this.shapeBackScreen.lineTo(this.lengthBackScreen / 2, this.widthBackScreen / 2 - this.borde);
    this.shapeBackScreen.lineTo(this.lengthBackScreen / 2 - this.borde, this.widthBackScreen / 2);
    this.shapeBackScreen.lineTo(-this.lengthBackScreen / 2 + this.borde, this.widthBackScreen / 2);
    this.shapeBackScreen.lineTo(-this.lengthBackScreen / 2, this.widthBackScreen / 2 - this.borde);
    this.shapeBackScreen.lineTo(-this.lengthBackScreen / 2, -this.widthBackScreen / 2 + this.borde);
  
    this.extrudeSettings = {
      depth: this.screenThickness,
      bevelEnabled: true,
      bevelThickness: this.borde,
      bevelSize: this.borde,
      bevelOffset: 0,
      bevelSegments: 2,
    };
  
    this.backScreen = new THREE.ExtrudeGeometry(this.shapeBackScreen, this.extrudeSettings);
    this.screen = new THREE.ExtrudeGeometry(this.shapeScreen, this.extrudeSettings);
    
    this.wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true});
  
    this.mesh = new THREE.Mesh(this.backScreen, this.material);
    this.mesh2= new THREE.Mesh(this.backScreen, this.material);
    this.mesh3= new THREE.Mesh(this.backScreen, this.materialScreen);

    this.wireframe = new THREE.Mesh(this.backScreen, this.wireframeMaterial);
    this.wireframe2= new THREE.Mesh(this.backScreen, this.wireframeMaterial);;
    this.wireframe3= new THREE.Mesh(this.screen, this.wireframeMaterial);;
    //
    const initialScale = 0.04;
    this.mesh.scale.set(initialScale, initialScale, 1);
    this.wireframe.scale.set(initialScale, initialScale, 1);
    this.mesh2.scale.set(initialScale, initialScale, 1);
    this.wireframe2.scale.set(initialScale, initialScale, 1);
    this.mesh3.scale.set(initialScale, initialScale, 1);
    this.wireframe3.scale.set(initialScale, initialScale, 1);
    this.mesh3.position.z+=0.01;    
    this.mesh2.rotation.x -= 1.5;
    this.wireframe2.rotation.copy(this.mesh2.rotation);

    this.camera = new THREE.PerspectiveCamera(
      50, // Ajusta el ángulo de visión
      this.width / this.height,
      0.1,
      1000
    );
    this.addGeometry();
  
    //this.camera.position.z = 40; // Ajusta la posición de la cámara
  
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setClearColor(0xed05151, 1);
    this.renderer.setSize(this.width, this.height);
  
    //
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.camera.position.set( 0, 5, 50 );
    //

   
    this.clock = new THREE.Clock();
    this.resizeInitialElements();
    this.animateGeometry();

  }
  private canvas! : HTMLElement;
  private scene : THREE.Scene;
  private material : THREE.MeshBasicMaterial;//THREE.MeshToonMaterial;
  private materialScreen : THREE.MeshBasicMaterial;
  private backScreen : any; //THREE.Mesh<THREE.BoxGeometry, THREE.MeshToonMaterial, THREE.Object3DEventMap>
  private camera : THREE.PerspectiveCamera;
  private renderer : THREE.WebGLRenderer;
  private width:number;
  private height:number;
  private backScreenColor: THREE.ColorRepresentation;
  public clock: THREE.Clock;
  public elapsedTime:number;
  private ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  private pointLight = new THREE.PointLight(0xffffff, 0.5);
  

  private lengthBackScreen : number;
  private widthBackScreen : number;
  private shapeBackScreen : THREE.Shape;
  private extrudeSettings : {};
  private wireframeMaterial: THREE.MeshBasicMaterial;
  private mesh : THREE.Mesh;
  private wireframe:THREE.Mesh;
  private mesh2 : THREE.Mesh;
  private wireframe2:THREE.Mesh;
  private borde:number=0.2;
  private screenThickness:number=0.2;
  private controls : OrbitControls;

  private mesh3 : THREE.Mesh;
  private wireframe3:THREE.Mesh;
  private lengthScreen : number;
  private widthScreen : number;
  private shapeScreen : THREE.Shape;
  private screen : any;
}
