// src/components/BackgroundBokeh.js
import React, { useEffect } from 'react';
import '../styles/BackgroundBokeh.scss';

const BackgroundBokeh = () => {
    useEffect(() => {
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        const stars = 500;
        const colorRange = [0, 60, 240];

        canvas.width = window.innerWidth + 300;
        canvas.height = window.innerHeight + 300;

        const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        const drawStars = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < stars; i++) {
                const x = Math.random() * canvas.offsetWidth;
                const y = Math.random() * canvas.offsetHeight;
                const radius = Math.random() * 1.5;
                const hue = colorRange[getRandom(0, colorRange.length - 1)];
                const sat = getRandom(50, 100);
                context.beginPath();
                context.arc(x, y, radius, 0, Math.PI * 2);
                context.fillStyle = `hsl(${hue}, ${sat}%, 88%)`;
                context.fill();
            }
        };

        drawStars();
        window.addEventListener("resize", drawStars);

        return () => {
            window.removeEventListener("resize", drawStars);
        };
    }, []);

    return (
        <div>
            <canvas id="canvas"></canvas>
            <div className="wrapper">
                <div className="colorizer1"></div>
                <div className="colorizer2"></div>
                <div className="colorizer3"></div>
                <div className="colorizer4"></div>
                <div className="circles">
                    {[...Array(150)].map((_, index) => (
                        <div key={index} className="circle"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BackgroundBokeh;
