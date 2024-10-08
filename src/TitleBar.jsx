﻿// TitleBar.jsx
import React, { useEffect, useState } from 'react';
import './css/TitleBar.css';
import { appWindow } from '@tauri-apps/api/window';

const TitleBar = () => {
    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        const minimizeBtn = document.getElementById('titlebar-minimize');
        const maximizeBtn = document.getElementById('titlebar-maximize');
        const closeBtn = document.getElementById('titlebar-close');

        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => appWindow.minimize());
        }
        if (maximizeBtn) {
            // 当再次点击最大化按钮时，如果窗口已经最大化，则恢复到原大小；否则最大化窗口
            maximizeBtn.addEventListener('click', async () => {
                if (await appWindow.isMaximized()) {
                    await appWindow.unmaximize();
                    setIsMaximized(false);
                } else {
                    await appWindow.maximize();
                    setIsMaximized(true);
                }
            });
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
                    src={isMaximized ? "./img/restore.svg" : "./img/maximize.png"}
                    alt={isMaximized ? "restore" : "maximize"}
                />
            </div>
            <div className="titlebar-button-close" id="titlebar-close">
                <img src="./img/close.png" alt="close"/>
            </div>
        </div>
    );
};

export default TitleBar;
