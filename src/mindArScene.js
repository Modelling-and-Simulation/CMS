// MindARScene.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MindARScene = () => {
  const { targetId } = useParams();
  const [urls, setUrls] = useState([]);
  console.log(targetId);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/links/${targetId}`)
      .then((response) => {
        console.log("get links" + response.data);
        setUrls(response.data);
      })
      .catch((error) => console.error(error));
  }, [targetId]);

  // Your existing iframe logic here

  return (
    <div>
      MindAR Scene
      {/* Your other React components or content */}
      <iframe
        title="MindAR Scene"
        src={`/3dScene.html?contentUrl=${urls.contentUrl}&targetUrl=${urls.targetUrl}`}
        width="100%"
        height="500px"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default MindARScene;
