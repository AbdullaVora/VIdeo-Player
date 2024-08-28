// // import React from 'react'
// import PropTypes from 'prop-types';
// import i1 from '../../public/images/i1.png'
// import i2 from '../../public/images/i1.png'
// import i3 from '../../public/images/i1.png'
// import Screen from './Screen';
// import { useState } from 'react'

// const Aside = () => {
//   const path = { src: '/videos/Video2.mp4', thumbnail1: i1, thumbnail2: i2 };

//   const [videoSend, setVideo] = useState('/videos/Video1.mp4');

//   const handleVideo = () => {
//     console.log('Thumbnail clicked, setting video path:', path.src); // Debugging
//     setVideo(path.src);
//   };

//   console.log('Current videoSend state:', videoSend); // Debugging


//   return (
//     <>
//       <div className="aside">
//         <div className="video-list">
//           <div className="video">
//             <img src={path.thumbnail1} alt="" onClick={handleVideo} style={{ cursor: 'pointer' }} />
//           </div>
//           <div className="video">
//             <img src={path.thumbnail2} alt="" onClick={handleVideo} style={{ cursor: 'pointer' }} />
//           </div>
//           <div className="video"></div>
//         </div>
//       </div>
//       <Screen videoSrc={videoSend} />
//     </>
//   )
// }

// Aside.PropTypes = {
//   onVideoSelect: PropTypes.func.isRequired,
// }

// export default Aside


import PropTypes from 'prop-types';
import i1 from '/images/i1.png';
import i2 from '/images/i2.png';
import i3 from '/images/i3.png'; 
import Screen from '../components/Screen';
import { useState } from 'react';

const Aside = () => {     
  const videos = {
    video1: { id: 1, src: '/videos/Video1.mp4', thumbnail: i1 },
    video2: { id:2, src: '/videos/Video2.mp4', thumbnail: i2 },
    video3: { id:3, src: '/videos/Video3.mp4', thumbnail: i3 },
  };

  const [videoSend, setVideo] = useState(videos.video1.src);

  const handleVideo = (videoSrc) => {
    console.log('Thumbnail clicked, setting video path:', videoSrc);
    setVideo(videoSrc);
  };

  return (
    <>
      <div className="aside">
        <div className="video-list">
          {Object.entries(videos).map(([key, video]) => (
            <div className="video" key={key}>
              <img
                src={video.thumbnail}
                alt={`Thumbnail for ${key}`}
                onClick={() => handleVideo(video.src)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>
      </div>
      <Screen videoSrc={videoSend} videos={videos} />
    </>
  );
};

Aside.propTypes = {
  onVideoSelect: PropTypes.func.isRequired,
};

export default Aside;
