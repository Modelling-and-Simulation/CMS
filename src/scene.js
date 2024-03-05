// Scene.js
import React, { useEffect, useState } from 'react';

const Scene = ({ modelFile, mindFile }) => {
  console.log("Received modelFile:", modelFile);
  console.log("Received mindFile:", mindFile);
  const [loaded, setLoaded] = useState(false);
  {console.log(modelFile, mindFile)}

  useEffect(() => {
    console.log("inside use effect");
    const handleSceneLoad = () => {
      console.log('Scene loaded');
      const video = document.getElementById('video-plane');
      console.log(video?.components?.geometry.isPlaying);
      if (video?.components?.geometry.isPlaying !== undefined) {
        video.components.geometry.isPlaying = false;
      }
      // setLoaded(true);
    };

    const initAFrame = () => {
      const sceneElement = document.querySelector('a-scene');

      if (sceneElement) {
        console.log('Inside scene element');
        sceneElement.addEventListener('loaded', handleSceneLoad);
        console.log('after scene loaded');

        // Cleanup event listener on component unmount
        return () => {
          sceneElement.removeEventListener('loaded', handleSceneLoad);
        };
      }
    };

     // Set loaded to true immediately
  setLoaded(true);

    // Wait for the document to be fully loaded before initializing A-Frame
    if (document.readyState === 'complete') {
      console.log('inside complete');
      initAFrame();
    } else {
      window.addEventListener('load', initAFrame);
    }
  }, []); // Empty dependency array to run the effect only once when the component mounts

  useEffect(() => {
    if (loaded) {
      // Now that the scene is loaded, update the a-gltf-model src and a-scene attributes
      const gltfModel = document.getElementById('model');
      const aScene = document.querySelector('a-scene');

      if (gltfModel) {
        gltfModel.setAttribute('src', modelFile);
      }

      if (aScene) {
        aScene.setAttribute(
          'mindar-image',
          `filterMinCF:0.0001; filterBeta: 0.01; imageTargetSrc: ${mindFile}; maxTrack:2;`
        );
      }
    }
  }, [loaded, modelFile, mindFile]);

  return (
    <div>
      {loaded && (
        <a-scene vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
          <a-camera
            position="0 0 0"
            look-controls="enabled: false"
            cursor="fuse: false; rayOrigin: mouse;"
          ></a-camera>

          <a-entity mindar-image-target="targetIndex: 0" id="model0">
            <a-gltf-model
              id="model"
              class="clickable"
              position="0 0 0"
              scale="0.3 0.3 0.3"
              rotation="-90 180 0"
              click-node="targetNode: SunRoof"
            />

            <a-circle
              id="click-link"
              class="clickable"
              color="#f00"
              radius="0.3"
              rotation="-90 0 0"
              position="0 0 -1.5"
            ></a-circle>
          </a-entity>
        </a-scene>
      )}
    </div>
  );
};

export default Scene;
