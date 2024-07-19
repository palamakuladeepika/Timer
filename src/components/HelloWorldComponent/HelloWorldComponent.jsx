import React, { useState, useEffect } from 'react';
import './HelloWorldComponent.css';

const HelloWorld = () => {
    const [milliseconds, setMilliseconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        if (isRunning) {
            const id = setInterval(() => {
                setMilliseconds(prevMilliseconds => prevMilliseconds + 10);
            }, 10);
            setIntervalId(id);
        } else if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning]);

    const formatTime = (totalMilliseconds) => {
        const totalSeconds = Math.floor(totalMilliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const millis = totalMilliseconds % 1000;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(millis).padStart(2, '0')}`;
    };

    return (
        <div className="container">
            <div className="timer">
                <h2 className="header">Welcome !</h2>
                <h3 className="header">Timer</h3>
                <p className="time">{formatTime(milliseconds)}</p>
                <div className="buttonContainer">
                    <button className="button" onClick={() => setIsRunning(true)}>Start</button>
                    <button className="button" onClick={() => setIsRunning(false)}>Pause</button>
                    <button className="button" onClick={() => { setIsRunning(false); setMilliseconds(0); }}>Reset</button>
                </div>
            </div>
        </div>
    );
};

export default HelloWorld;