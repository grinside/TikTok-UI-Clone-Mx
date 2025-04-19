import React, { useRef, useEffect } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {
  const {
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
  } = props;

  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (autoplay && video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Autoplay  bloqué, en attente d’une interaction :', error);
        });
      }
    }
  }, [autoplay]);

  const onVideoPress = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch((err) => console.warn("Erreur play() :", err));
    } else {
      video.pause();
    }
  };

  return (
    <div className="video">
      <video
        className="player"
        onClick={onVideoPress}
        ref={(ref) => {
          videoRef.current = ref;
          if (setVideoRef) setVideoRef(ref);
        }}
        src={url}
        loop
        muted // 🔥 essentiel pour autoplay
        playsInline // 🔥 mobile-friendly
        autoPlay={autoplay} // 🔥 rend clair l’intention
      />
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
