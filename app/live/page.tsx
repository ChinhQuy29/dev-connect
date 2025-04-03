"use client"

// components/WebcamBroadcast.tsx
import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamBroadcast = () => {
    const webcamRef = useRef<Webcam>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [videoConstraints, setVideoConstraints] = useState<MediaTrackConstraints>({
        width: 700,
        height: 400,
        facingMode: 'user',
    });

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            console.log(imageSrc); // You can handle the captured image here
        }
    }, [webcamRef]);

    const startBroadcast = async () => {
        try {
            setIsRecording(true);
            // Here you would typically send the stream to a server
            // For this example, we're just displaying it locally
        } catch (err) {
            console.error('Error accessing webcam:', err);
            setIsRecording(false);
        }
    };

    const stopBroadcast = () => {
        setIsRecording(false);
    };

    const flipCamera = () => {
        setVideoConstraints({
            ...videoConstraints,
            facingMode: videoConstraints.facingMode === 'user' ? 'environment' : 'user',
        });
    };

    return (
        <div className="webcam-container">
            <div className="webcam-video">
                {isRecording ? (
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        mirrored={videoConstraints.facingMode === 'user'}
                    />
                ) : (
                    <div className="webcam-placeholder">Webcam is off</div>
                )}
            </div>

            <div className="webcam-controls">
                {!isRecording ? (
                    <button onClick={startBroadcast} className="start-button">
                        Start Broadcast
                    </button>
                ) : (
                    <>
                        <button onClick={capture} className="capture-button">
                            Take Snapshot
                        </button>
                        <button onClick={flipCamera} className="flip-button">
                            Flip Camera
                        </button>
                        <button onClick={stopBroadcast} className="stop-button">
                            Stop Broadcast
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default WebcamBroadcast;