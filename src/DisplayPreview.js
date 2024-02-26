import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayPreview = ({ fileName }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/preview/${fileName}`, {
          responseType: 'arraybuffer',
        });

        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        const imageUrl = `data:image/png;base64,${base64Image}`;
        setPreviewUrl(imageUrl);
      } catch (error) {
        console.error('Fetching preview failed:', error);
      }
    };

    fetchPreview();
  }, [fileName]);

  return (
    <div>
      {previewUrl && <img src={previewUrl} alt="Preview" />}
    </div>
  );
};

export default DisplayPreview;
