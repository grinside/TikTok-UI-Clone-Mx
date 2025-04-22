import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';
import './VideoCard.css';

const VideoCard = ({
  url,
  profilePic,
  username,
  description,
  song,
  likes,
  comments,
  saves,
  shares,
  setVideoRef,
  autoplay
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported() && url.endsWith('.m3u8')) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoplay) {
          video.play().catch(err => console.warn('Autoplay bloqué :', err));
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      video.addEventListener('loadedmetadata', () => {
        if (autoplay) {
          video.play().catch(err => console.warn('Autoplay bloqué Apple :', err));
        }
      });
    }
  }, [url, autoplay]);

  const handleClick = () => {
    const video = videoRef.current;
    if (video.paused) video.play();
    else video.pause();
  };

  return (
    <div className="video">
      <video
        className="player"
        ref={(ref) => {
          videoRef.current = ref;
          if (setVideoRef) setVideoRef(ref);
        }}
        onClick={handleClick}
        muted={autoplay}
        playsInline
        loop
        controls
        autoPlay={autoplay}
      />
    </div>
  );
};

export default VideoCard;