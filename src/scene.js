import React from "react";
import { BACKEND_URL } from "./constants";

const Scene = ({ modelFile, mindFile }) => {
  const mindFileUrl = BACKEND_URL + "/" + mindFile;
  const modelFileUrl = BACKEND_URL + "/" + modelFile;

  return (
    <div>
      <a-scene
        mindar-image={`filterMinCF:0.0001; filterBeta: 0.01; imageTargetSrc: ${mindFileUrl}; maxTrack:2;`}
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        scene-loaded
      >
        <a-assets>
          <a-asset-item
            id="bmw-model"
            src="./assets/untitled.glb"
          ></a-asset-item>
        </a-assets>
        <a-camera
          position="0 0 0"
          look-controls="enabled: false"
          cursor="fuse: false; rayOrigin: mouse;"
          raycaster="far: ${customFields.libVersion}; objects: .clickable"
        ></a-camera>

        <a-entity mindar-image-target="targetIndex: 0" id="model0">
          <a-gltf-model
            id="model"
            class="clickable"
            src={`${modelFileUrl}`}
            position="0 0 0"
            scale="0.3 0.3 0.3"
            rotation="-90 180 0"
            click-node="targetNode: SunRoof"
          />
        </a-entity>
      </a-scene>
    </div>
  );
};

export default Scene;
