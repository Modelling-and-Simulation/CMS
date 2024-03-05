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
        console.log("get links", response.data);
        setUrls(response.data);
      })
      .catch((error) => console.error(error));
  }, [targetId]);

  // Render the Scene component only when urls is available
  return (
    <div>
      MindAR Scene
      {/* {console.log(urls.contentUrl)} */}
      {urls && (
        <Scene contentUrl={urls.contentUrl} targetUrl={urls.targetUrl} />
      )}
    </div>
  );
};

export default MindARScene;
