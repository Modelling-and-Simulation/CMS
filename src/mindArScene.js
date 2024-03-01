// MindARScene.js
import React from 'react';
import { useParams } from 'react-router-dom';

const MindARScene = () => {
  const { contentUrl, targetUrl } = useParams();

  // Your existing iframe logic here

  return (
    <div>
      {/* Your other React components or content */}
      <iframe
        title="MindAR Scene"
        src={`/3dScene.html?contentUrl=${contentUrl}&targetUrl=${targetUrl}`}
        width="100%"
        height="500px"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default MindARScene;
