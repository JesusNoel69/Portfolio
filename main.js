import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/addons/shaders/FXAAShader.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import {
  MODEL_INFO,
  MODEL_ALIASES,
  presets,
  initialPosition,
} from "./constants.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const loaderEl = document.getElementById("loader");
const loaderBar = document.getElementById("loader-bar");

function hideLoader() {
  if (!loaderEl) return;
  loaderEl.classList.add("is-hidden");
  setTimeout(() => loaderEl.remove(), 150);
}

function setLoaderProgress(pct) {
  if (!loaderBar) return;
  const clamped = Math.max(0, Math.min(100, pct));
  loaderBar.style.width = clamped + "%";
}

const scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.001,
  1000,
);

const select = document.getElementById("navbar");

//animations
let transition = null;

function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
function startTransition(preset, seconds = 0.75) {
  if (!preset) return;

  const toCube = new THREE.Vector3(
    preset.cubeObj.x,
    preset.cubeObj.y,
    preset.cubeObj.z,
  );
  const toTarget = new THREE.Vector3(
    preset.targetObj.x,
    preset.targetObj.y,
    preset.targetObj.z,
  );

  const toCam = new THREE.Vector3(
    preset.cameraObj.x,
    preset.cameraObj.y,
    preset.cameraObj.z,
  );
  const toDir = new THREE.Vector3().subVectors(toCam, toTarget).normalize();

  transition = {
    t0: performance.now(),
    dur: Math.max(0.002, seconds) * 1000,

    fromCube: cube.position.clone(),
    fromTarget: controls.target.clone(),
    fromDir: new THREE.Vector3()
      .subVectors(camera.position, controls.target)
      .normalize(),
    fromOffset: globalOffset,

    toCube,
    toTarget,
    toDir,
    toOffset: preset.offsetValue ?? globalOffset,

    fromFov: camera.fov,
    toFov: 50,
  };

  controls.enabled = false;
}

///
let globalOffset = 18;

select.addEventListener("change", (e) => {
  const key = e.target.value;
  //applyPreset(presets[key]);
  startTransition(presets[key] ?? presets.initial, 0.75);
});

const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(11.4, 3.117, 0.5);
scene.add(dirLight);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.4;
renderer.setClearColor(0x000000, 1);

scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.0));
scene.background = new THREE.Color("#1b2751");

const dir = new THREE.DirectionalLight(0xffffff, 1.2);
dir.position.set(3, 6, 3);
dir.castShadow = true;
scene.add(dir);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

const raycaster = new THREE.Raycaster();
const mouseNdc = new THREE.Vector2(0, 0); // NDC
let selectableRoot = null;

const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();
let focusObject = null;
//cube reference
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 0, //comment for mesh
});
const cube = new THREE.Mesh(geometry, material);
//position initial coordinates: 0, 5, 2
//position trophies coordinates: 4, 5, 5
//position skills coordinates: -2.5, 8.5, -1.75
//position projects coordinates: 0, 4.75, 0
//position contacts coordinates: 1.6, 4.75, -2.5

cube.position.set(
  initialPosition.cubeObj.x,
  initialPosition.cubeObj.y,
  initialPosition.cubeObj.z,
);

scene.add(cube);
//cube reference
loader.setDRACOLoader(dracoLoader);

loader.load(
  "/models/portfolio_scene.draco.glb",
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);
    selectableRoot = model;
    //startTransition(presets[select.value] ?? presets.initial, 0);
    //applyPreset(presets[select.value] ?? presets.initial);

    focusObject = cube;
    //position initial target -2, 2, 5
    //position trophies target -2, 2, 50
    //position skills target -2.5, 8.5, 1.75
    //position projects target -2.5, 8.5, 1.75
    //position contacts target 1.2, 4.75, -2.5

    controls.target.set(
      initialPosition.targetObj.x,
      initialPosition.targetObj.y,
      initialPosition.targetObj.z,
    );
    controls.update();

    //position initial camera 8.978, 5.341, -1.586
    //position trophies camera -5, 5.341, -1.586
    //position skills camera 0.62, 8.57, 1.69
    //position projects camera 0.62, 8.57, 1.69
    //position contacts camera 3.16, 4.59, -1.11

    camera.position.set(
      initialPosition.cameraObj.x,
      initialPosition.cameraObj.y,
      initialPosition.cameraObj.z,
    );

    camera.fov = 50;
    camera.updateProjectionMatrix();
    //offset initial 18
    //offset trophies 10
    //offset skills 6
    //offset projects 10
    //offset contacts 4.5

    fitCameraToObject(
      camera,
      focusObject,
      controls,
      initialPosition.offsetValue,
    );
    // hide loader
    setLoaderProgress(100);
    hideLoader();
  },
  (xhr) => {
    if (xhr.total) {
      const pct = (xhr.loaded / xhr.total) * 100;
      setLoaderProgress(pct);
    } else {
      // simulate progress
      setLoaderProgress(Math.min(90, (xhr.loaded / (1024 * 1024)) * 10));
    }
  },
  (err) => {
    console.error("GLB load error:", err);
    if (loaderEl) {
      loaderEl.querySelector(".loader-title").textContent =
        "Failed to load 3D scene";
      loaderEl.querySelector(".loader-sub").textContent =
        "Please refresh or try again.";
    }
  },
);

controls.enablePan = false;
controls.enableZoom = true;
controls.enableRotate = true;
controls.enableDamping = true;
controls.dampingFactor = 0.08;

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
renderPass.clear = true;
composer.addPass(renderPass);

const outlinePass = new OutlinePass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  scene,
  camera,
);
composer.addPass(outlinePass);

//
outlinePass.edgeStrength = 4.0; // remark intensity
outlinePass.edgeThickness = 1.0;
outlinePass.edgeGlow = 0.0; // glow
outlinePass.pulsePeriod = 0; //no pulse
outlinePass.usePatternTexture = false;

outlinePass.visibleEdgeColor.set("#2a78ff");
outlinePass.hiddenEdgeColor.set("#2a78ff");
const fxaaPass = new ShaderPass(FXAAShader);
fxaaPass.material.uniforms["resolution"].value.set(
  1 / (window.innerWidth * renderer.getPixelRatio()),
  1 / (window.innerHeight * renderer.getPixelRatio()),
);
composer.addPass(fxaaPass);
const outputPass = new OutputPass();
composer.addPass(outputPass);

//document.body.appendChild(renderer.domElement);
const wrap = document.getElementById("three-wrap");

wrap.appendChild(renderer.domElement);

const isTouch = matchMedia("(pointer: coarse)").matches;
//disable remark on mobile, becuse it's touch
if (isTouch) {
  outlinePass.enabled = false;
}
//reduces piel ratio for vertical mobile
function getDpr() {
  const dpr = window.devicePixelRatio || 1;
  const portrait = window.innerHeight > window.innerWidth;

  if (isTouch && portrait) return Math.min(dpr, 1.0);
  if (isTouch) return Math.min(dpr, 1.25);
  return Math.min(dpr, 2);
}

function applySizes() {
  const w = wrap.clientWidth;
  const h = wrap.clientHeight;
  const dpr = getDpr();

  renderer.setPixelRatio(dpr);
  renderer.setSize(w, h, false);

  composer.setSize(w, h);
  if (composer.setPixelRatio) composer.setPixelRatio(dpr);

  outlinePass.setSize(w, h);

  fxaaPass.material.uniforms["resolution"].value.set(
    1 / (w * dpr),
    1 / (h * dpr),
  );

  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

applySizes();
window.addEventListener("resize", () => setTimeout(applySizes, 150));
window.visualViewport?.addEventListener("resize", () =>
  setTimeout(applySizes, 150),
);
//timmer for resize window
let timer;
window.addEventListener("resize", () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    renderer.setSize(w, h, true);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    composer.setSize(w, h);
    outlinePass.setSize(w, h);

    fxaaPass.material.uniforms["resolution"].value.set(
      1 / (w * renderer.getPixelRatio()),
      1 / (h * renderer.getPixelRatio()),
    );
    if (focusObject) {
      updateClipPlanesFrom(focusObject);
    }
  }, 150);
});

function updateClipPlanesFrom(object) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);

  camera.near = 0.01;
  camera.far = 2000 + maxDim * 10;
  camera.updateProjectionMatrix();
}

renderer.domElement.addEventListener("mousemove", (e) => {
  const rect = renderer.domElement.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  mouseNdc.set(x, y);
});

//
function computeFitDistance(object, camera, offset) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());

  const fitHeightDistance =
    size.y / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5));
  const fitWidthDistance =
    size.x /
    2 /
    (Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) * camera.aspect);

  return offset * Math.max(fitHeightDistance, fitWidthDistance);
}

function fitCameraToObject(camera, object, controls, offset = globalOffset) {
  const box = new THREE.Box3().setFromObject(object);

  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  const fitHeightDistance =
    size.y / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5));
  const fitWidthDistance =
    size.x /
    2 /
    Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) /
    camera.aspect;

  const distance = offset * Math.max(fitHeightDistance, fitWidthDistance);

  const direction = new THREE.Vector3()
    .subVectors(camera.position, controls.target)
    .normalize();

  camera.position.copy(center).add(direction.multiplyScalar(distance));

  camera.near = 0.05;
  camera.far = 2000;
  camera.updateProjectionMatrix();

  // update controls
  //controls.target.copy(center);
  controls.update();
}

let needsPick = false;
//only if pointer move iit's possible
renderer.domElement.addEventListener("pointermove", (e) => {
  if (isTouch) return;
  const rect = renderer.domElement.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  mouseNdc.set(x, y);
  needsPick = true;
});

function animate() {
  if (!isTouch && needsPick) {
    updateAimHighlight();
    needsPick = false;
  }
  /*console.log(
    "controls target, camera,  cube position, ",
    controls.target,
    camera.position,
    cube.position,
  );*/
  //console.log(globalOffset);
  //-2.5, 8.5, 1.75
  //0.62, 8.57, -1.69
  //-2.5, 8.5, 1.75
  if (transition) {
    const now = performance.now();
    const u = (now - transition.t0) / transition.dur;
    const t = Math.min(1, Math.max(0, u));
    const k = easeInOutCubic(t);
    cube.position.lerpVectors(transition.fromCube, transition.toCube, k);
    controls.target.lerpVectors(transition.fromTarget, transition.toTarget, k);

    // dir + offset suaves
    const dirNow = new THREE.Vector3()
      .lerpVectors(transition.fromDir, transition.toDir, k)
      .normalize();
    const offsetNow = THREE.MathUtils.lerp(
      transition.fromOffset,
      transition.toOffset,
      k,
    );

    // calculate distance
    const distance = computeFitDistance(cube, camera, offsetNow);
    camera.position.copy(controls.target).add(dirNow.multiplyScalar(distance));

    camera.fov = THREE.MathUtils.lerp(transition.fromFov, transition.toFov, k);
    camera.updateProjectionMatrix();

    controls.update();

    if (t >= 1) {
      cube.position.copy(transition.toCube);
      controls.target.copy(transition.toTarget);

      const finalDir = transition.toDir.clone().normalize();
      const finalDistance = computeFitDistance(
        cube,
        camera,
        transition.toOffset,
      );
      camera.position
        .copy(controls.target)
        .add(finalDir.multiplyScalar(finalDistance));

      camera.fov = transition.toFov;
      camera.updateProjectionMatrix();

      globalOffset = transition.toOffset;
      updateClipPlanesFrom(cube);

      transition = null;
      controls.enabled = true;
      controls.update();
    }
  } else {
    controls.update();
  }

  composer.render();

  //renderer.render(scene, camera);
}

function getTopLevelChild(obj, root) {
  let o = obj;
  while (o && o.parent && o.parent !== root) o = o.parent;
  return o; //direct root child
}
let lastTop = null;

function updateAimHighlight() {
  if (!selectableRoot) return;

  raycaster.setFromCamera(mouseNdc, camera);
  const hits = raycaster.intersectObject(selectableRoot, true);
  const hit = hits.find((h) => h.object && h.object.isMesh);
  if (!hit) {
    outlinePass.selectedObjects = [];
    lastTop = null;
    return;
  }

  const top = getTopLevelChild(hit.object, selectableRoot);

  if (!top) return;
  //console.log(top);

  const topName = top.name || "";

  if (
    topName === "floor" ||
    topName === "wall" ||
    topName === "table_colection"
  ) {
    outlinePass.selectedObjects = [];
    lastTop = null;
    return;
  }

  if (top === lastTop) return;
  lastTop = top;

  // OutlinePass wait meshes
  const selected = [];
  top.traverse((o) => {
    if (o.isMesh) selected.push(o);
  });

  outlinePass.selectedObjects = selected;
}
// dialog elements
const dialog = document.getElementById("dialog");
const elTitle = document.getElementById("name");
const elDesc = document.getElementById("description");
const elActions = document.getElementById("dialog-actions");
const elQr = document.getElementById("dialog-qr");
const elSkills = document.getElementById("dialog-skills");
const elImage = document.getElementById("dialog-image");
const display = document.getElementById("dlg-display");

//only click for canva generated
renderer.domElement.addEventListener("click", (e) => {
  if (!selectableRoot) return;

  raycaster.setFromCamera(mouseNdc, camera);
  const hits = raycaster.intersectObject(selectableRoot, true);
  const hit = hits.find((h) => h.object && h.object.isMesh);
  if (!hit) {
    return;
  }

  const top = getTopLevelChild(hit.object, selectableRoot);

  if (!top) return;

  const topName = top.name || "";

  if (
    topName === "floor" ||
    topName === "wall" ||
    topName === "table_colection"
  ) {
    return;
  }
  showDialog(topName);
});

function showDialog(modelName) {
  const key = MODEL_ALIASES[modelName] ?? modelName;
  const data = MODEL_INFO[key];

  // Reset UI
  elTitle.textContent = "";
  elDesc.textContent = "";
  elActions.innerHTML = "";
  elQr.hidden = true;
  elQr.src = "";
  elSkills.hidden = true;
  elImage.hidden = true;
  elSkills.innerHTML = "";
  display.classList.add("dlg-display");
  //display.style.border = "none";
  elActions.style.margin = "auto";

  if (!data) {
    elTitle.textContent = key;
    elDesc.textContent = "No info in MODEL_INFO.";
    dialog.showModal();
    return;
  }

  elTitle.textContent = data.title ?? key;
  elDesc.textContent = data.description ?? "";

  // Links (GitHub/Demo/Certificate)
  if (Array.isArray(data.links)) {
    data.links.forEach((l) => {
      const a = document.createElement("a");
      a.href = l.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = l.label ?? "Abrir";
      elActions.appendChild(a);
    });
  }

  // Social buttons (cell)
  if (Array.isArray(data.socials)) {
    elActions.style.margin = "0";

    data.socials.forEach((s) => {
      const a = document.createElement("a");
      a.href = s.url;
      a.target = s.url.startsWith("mailto:") ? "_self" : "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = s.label ?? "Abrir";
      elActions.appendChild(a);
    });
  }

  // QR (trophies)
  if (data.qr) {
    elQr.src = data.qr;
    elQr.hidden = false;
  }

  //Project images
  if (data.image) {
    elImage.src = data.image;
    elImage.hidden = false;
  }

  // Skills
  if (Array.isArray(data.skills)) {
    display.classList.remove("dlg-display");
    elSkills.hidden = false;
    data.skills.forEach((sk) => {
      const item = document.createElement("div");
      item.className = "skill-item";
      item.innerHTML = `<strong>${sk.name}</strong><br/><small>${
        sk.note ?? ""
      }</small>`;
      elSkills.appendChild(item);
    });
  }
  dialog.showModal();
}

// close
//const closeDialogButton = document.getElementById("dialog-close");
//closeDialogButton.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  if (e.target && e.target.id === "dialog-close") {
    dialog.close();
  }
});
