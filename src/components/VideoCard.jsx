import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = ({
  url,
  username,
  description,
  song,
  likes,
  shares,
  comments,
  saves,
  profilePic,
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
          video.play().catch((err) =>
            console.warn('Autoplay bloqué, en attente d’interaction :', err)
          );
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      video.addEventListener('loadedmetadata', () => {
        if (autoplay) {
          video.play().catch((err) =>
            console.warn('Autoplay bloqué (Apple) :', err)
          );
        }
      });
    } else {
      console.error('HLS non supporté sur ce navigateur.');
    }
  }, [url, autoplay]);

  const onVideoPress = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play().catch((err) => console.warn('Erreur play() :', err));
    } else {
      video.pause();
    }
  };

  return (
    <div className="video">
      <div className="aspect-4-3">
        <video
          className="player"
          onClick={onVideoPress}
          ref={(ref) => {
            videoRef.current = ref;
            if (setVideoRef) setVideoRef(ref);
          }}
          loop
          muted
          playsInline
          controls={true}
        />
      </div>
      <div className="bottom-controls">
        <div className="footer-left">
          <FooterLeft username={username} description={description} song={song} />
        </div>
        <div className="footer-right">
          <FooterRight likes={likes} shares={shares} comments={comments} saves={saves} profilePic={profilePic} />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;