import axios from "axios";
import { useEffect, useRef, useState } from "react";

const Screen = ({ videoSrc, videos }) => {
    const videoRef = useRef(null);
    const [pauseIcon, setPauseIcon] = useState('/icons/play.png');
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [currentSrc, setCurrentSrc] = useState(videoSrc);
    const [videoWatched, setVideoWatched] = useState(false);
    const [watchedVideos, setWatchedVideos] = useState([]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.src = currentSrc;
            videoRef.current.load();
            if (pauseIcon === '/icons/pause.png') {
                videoRef.current.play();
            }
            setVideoWatched(false);
        }
    }, [currentSrc]);

    useEffect(() => {
        return () => {
            if (videoRef.current) {
                videoRef.current.pause();
            }
        };
    }, []);

    const findDataFunc = async () => {
        try {
            const response = await axios.get('http://localhost:5000/video');
            const videoData = response.data[0];

            if (videoData) {
                setCurrentSrc(videos[Object.keys(videos)[videoData.totalPlayVideo]].src);
                setCurrentVideoIndex(videoData.totalPlayVideo);
                const watchedList = JSON.parse(localStorage.getItem('watchedVideos')) || [];
                setWatchedVideos(watchedList);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        findDataFunc(); 
    }, []);

    const handlePlay = async () => {
        const videoKeys = Object.keys(videos);
        localStorage.setItem('totalVideo', JSON.stringify(videoKeys.length));
        videoRef.current.pause();
        if (videoRef.current && pauseIcon === '/icons/play.png') {
            videoRef.current.play();
            setPauseIcon('/icons/pause.png');
        } else {
            videoRef.current.pause();
            setPauseIcon('/icons/play.png');
            localStorage.setItem('s', JSON.stringify(videoRef.current.currentTime));
            localStorage.setItem('d', JSON.stringify(videoRef.current.duration));
            const response = await axios.post("http://localhost:5000/video", { lastWatchedTime: videoRef.current.currentTime });
            console.log(response.data);
        }
    };

    const handleEnd = async () => {
        videoRef.current.pause();
        setPauseIcon('/icons/play.png');
        setVideoWatched(true);
        const videoKeys = Object.keys(videos);

        localStorage.setItem('s', JSON.stringify(videoRef.current.currentTime));
        localStorage.setItem('d', JSON.stringify(videoRef.current.duration));
        
        const nextIndex = currentVideoIndex + 1;
        
        localStorage.setItem("total", JSON.stringify(nextIndex));

        if (nextIndex < videoKeys.length) {
            setWatchedVideos(prevState => {
                const newWatchedList = [...prevState, currentVideoIndex];
                localStorage.setItem('watchedVideos', JSON.stringify(newWatchedList));
                return newWatchedList;
            });

            const response = await axios.post("http://localhost:5000/video", { totalPlayVideo: nextIndex });
            const responseTime = await axios.post("http://localhost:5000/video", { lastWatchedTime: '' });
            console.log(response.data);
            console.log(responseTime.data);

            setCurrentVideoIndex(nextIndex);
            setCurrentSrc(videos[videoKeys[nextIndex]].src);
        } else {
            alert('No more videos to play');
        }
    };

    const handleNext = () => {
        const videoKeys = Object.keys(videos);
        const nextIndex = currentVideoIndex + 1;

        if (videoWatched || watchedVideos.includes(currentVideoIndex)) {
            if (nextIndex < videoKeys.length) {
                setCurrentVideoIndex(nextIndex);
                setCurrentSrc(videos[videoKeys[nextIndex]].src);

                axios.post("http://localhost:5000/video", { totalPlayVideo: nextIndex })
                    .then(response => console.log(response.data))
                    .catch(error => console.error('Error saving progress:', error));
            } else {
                alert('No more videos to play');
            }
        } else {
            alert('Complete the current video before proceeding to the next one');
        }
    };

    const handlePrevious = () => {
        const videoKeys = Object.keys(videos);

        if (currentVideoIndex > 0) {
            const prevIndex = currentVideoIndex - 1;

            if (watchedVideos.includes(prevIndex)) {
                setCurrentVideoIndex(prevIndex);
                setCurrentSrc(videos[videoKeys[prevIndex]].src);
                setVideoWatched(true); 
            } else {
                alert('You must first complete the current video to access the previous one.');
            }
        } else {
            alert('You are at the first video');
        }
    };

    return (
        <div className="screen-layout">
            <div className="screen">
                <video ref={videoRef} key={currentSrc} width="100%" onEnded={handleEnd}>
                    <source src={currentSrc} />
                </video>
                <div className="icons">
                    <div className="icons-group">
                        <div className="right" style={{ marginLeft: '-50px' }}>
                            <img
                                src={'/icons/skip-button.png'}
                                alt="Previous"
                                onClick={handlePrevious}
                            />
                        </div>
                        <div className="play" style={{ padding: '0 40px' }}>
                            <img src={pauseIcon} alt="Play/Pause" onClick={handlePlay} />
                        </div>
                        <div className="left">
                            <img
                                src={'/icons/skip-button.png'}
                                alt="Next"
                                onClick={handleNext}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Screen;
