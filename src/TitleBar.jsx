// TitleBar.jsx
import React, { useEffect } from 'react';
import './css/TitleBar.css';

import { appWindow } from '@tauri-apps/api/window';

const TitleBar = () => {
    useEffect(() => {
        const minimizeBtn = document.getElementById('titlebar-minimize');
        const maximizeBtn = document.getElementById('titlebar-maximize');
        const closeBtn = document.getElementById('titlebar-close');

        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => appWindow.minimize());
        }
        if (maximizeBtn) {
            maximizeBtn.addEventListener('click', () => appWindow.toggleMaximize());
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', () => appWindow.close());
        }
    }, []);

    return (
        <div data-tauri-drag-region="true" className="titlebar">
            <div className="titlebar-button" id="titlebar-minimize">
                <img
                    src="./img/minimize.png"
                    alt="minimize"
                />
            </div>
            <div className="titlebar-button" id="titlebar-maximize">
                <img
                    src="./img/maximize.png"
                    alt="maximize"
                />
            </div>
            <div className="titlebar-button-close" id="titlebar-close">
                <img src="./img/close.png" alt="close"/>
            </div>
        </div>
    );
};

export default TitleBar;
