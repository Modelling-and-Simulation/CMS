import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { getLinkedTargetAndContent } from "./api";
import { BACKEND_URL } from "./constants";

const MindARScene = () => {
  const { targetId } = useParams();
  const [modelFileUrl, setModelFileUrl] = useState(null);
  const [mindFileUrl, setMindFileUrl] = useState(null);

  useEffect(() => {
    getLinkedTargetAndContent(targetId)
      .then((response) => {
        const modelFileUrl =
          BACKEND_URL + "/" + response.data.content.modelFile;
        const mindFileUrl = BACKEND_URL + "/" + response.data.target.mindFile;

        console.log("modelFileUrl", modelFileUrl);
        console.log("mindFileUrl", mindFileUrl);

        setModelFileUrl(modelFileUrl);
        setMindFileUrl(mindFileUrl);
      })
      .catch((error) => console.error(error));
  }, [targetId]);

  // Render the Scene component only when urls is available
  if (!modelFileUrl || !mindFileUrl) {
    return <div>Loading...</div>;
  }
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
      <a-scene
        mindar-image={`imageTargetSrc: ${mindFileUrl}; filterMinCF:0.0001; filterBeta: 0.01; maxTrack:2;`}
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
    </div>
  );
};

export default MindARScene;
