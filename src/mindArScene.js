import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Scene from "./scene";
import { getLinkedTargetAndContent } from "./api";

const MindARScene = () => {
  const { targetId } = useParams();
  const [urls, setUrls] = useState(null); // Initialize with null

  useEffect(() => {
    getLinkedTargetAndContent(targetId)
      .then((response) => {
        setUrls(response.data);
      })
      .catch((error) => console.error(error));
  }, [targetId]);

  // Render the Scene component only when urls is available
  return (
    <div>
      {urls && (
        <Scene
          modelFile={urls.content.modelFile}
          mindFile={urls.target.mindFile}
        />
      )}
    </div>
  );
};

export default MindARScene;
