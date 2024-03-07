import React, { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";
import { getLinkedTargetAndContent } from "./api";
import { BACKEND_URL } from "./constants";

const MindARScene = () => {
  const { targetId } = useParams();
  const sceneRef = useRef(null);

  const [modelFileUrl, setModelFileUrl] = useState(null);
  const [mindFileUrl, setMindFileUrl] = useState(null);

  useEffect(() => {
    getLinkedTargetAndContent(targetId)
      .then((response) => {
        const modelFileUrl =
          BACKEND_URL + "/" + response.data.content.modelFile;
        const mindFileUrl = BACKEND_URL + "/" + response.data.target.mindFile;

        setModelFileUrl(modelFileUrl);
        setMindFileUrl(mindFileUrl);
      })
      .catch((error) => console.error(error));
  }, [targetId]);

  useEffect(() => {
    if (!modelFileUrl || !mindFileUrl) {
      return;
    }

    const sceneEl = sceneRef.current;
    const arSystem = sceneEl.systems["mindar-image-system"];

    sceneEl.addEventListener("renderstart", () => {
      arSystem.start(); // start AR
    });

    return () => {
      console.log("cleanup");
      arSystem.stop();
    };
  }, [modelFileUrl, mindFileUrl]);

  return (
    <div
      style={{
        margin: "auto",
        position: "relative",
        height: "98vh",
        width: "98vw",
        overflow: "hidden",
      }}
    >
      {!modelFileUrl || !mindFileUrl ? (
        <div>Loading...</div>
      ) : (
        <a-scene
          ref={sceneRef}
          mindar-image={`imageTargetSrc: ${mindFileUrl}; autoStart: false; filterMinCF:0.0001; filterBeta: 0.01; maxTrack:2; uiScanning:no;`}
          color-space="sRGB"
          embedded
          vr-mode-ui="enabled: false"
          device-orientation-permission-ui="enabled: false"
        >
          <a-assets>
            <a-asset-item id="model" src={`${modelFileUrl}`}></a-asset-item>
          </a-assets>
          <a-camera
            position="0 0 0"
            look-controls="enabled: false"
            cursor="fuse: false; rayOrigin: mouse;"
            raycaster="far: ${customFields.libVersion}; objects: .clickable"
          ></a-camera>

          <a-entity mindar-image-target="targetIndex: 0">
            <a-gltf-model
              id="model"
              class="clickable"
              src="#model"
              position="0 0 0"
              scale="0.3 0.3 0.3"
              rotation="-90 180 0"
              click-node="targetNode: SunRoof"
            />
          </a-entity>
        </a-scene>
      )}
    </div>
  );
};

export default MindARScene;
