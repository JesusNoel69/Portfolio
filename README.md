# 3D Portfolio (Three.js + Vite)

Interactive 3D portfolio built with **Three.js** and **Vite**. Use the navbar to move between sections and click 3D objects to open details in a modal.

## Deployed

[![Netlify Status](https://api.netlify.com/api/v1/badges/dcff57cd-6cff-46c5-82fa-b2404f111be9/deploy-status)](https://app.netlify.com/sites/portfolio-jesus-n/deploys)

## Tech

- Three.js + GLTFLoader
- Postprocessing: OutlinePass + FXAA
- Scene optimized with **Draco** (compressed GLB)

## Run (Vite)

```bash
npm install
npx vite
```

## Build / Preview

```
npx vite build
npx vite preview
```

## Draco (GLB compression)

### Compress a GLB

```

npm i -D @gltf-transform/cli
npx gltf-transform draco ./models/portfolio_scene.glb ./models/portfolio_scene.draco.glb
```

## Add Draco decoders (required)

Copy decoder files into:

```
public/draco/
```

From:

```
node_modules/three/examples/jsm/libs/draco/
```

Then in Three.js:

- dracoLoader.setDecoderPath("/draco/")

- gltfLoader.setDRACOLoader(dracoLoader)

## Notes

- Put models in /models

- Put static assets in /assets or /public
