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
                    src="../img/minisize.png"
                    alt="minimize"
                />
            </div>
            <div className="titlebar-button" id="titlebar-maximize">
                <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAVUlEQVR4nGNgGAUkAg8GBobHDAwM/9EwLoCu7hHUDJzgERZN//Gox6YWZAZBDeSC/4T0j1rwn8IgHgWjgAgwmtH+D3hZ9IjWxbUHDkuoVuGMAgZ0AADoT0vu2C9MdgAAAABJRU5ErkJggg=="
                    alt="maximize"
                />
            </div>
            <div className="titlebar-button" id="titlebar-close">
                <img src="https://api.iconify.design/mdi:close.svg" alt="close"/>
            </div>
        </div>
    );
};

export default TitleBar;
