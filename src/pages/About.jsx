// About.jsx
import React, { useState } from 'react';
import './../css/About.css'; 
import ThirdPartyPage from './ThirdParty'; // 导入ThirdParty组件
import './../css/ThirdPartyFrame.css'; // 导入模态框样式

const About = () => {
    const [iframeVisible, setIframeVisible] = useState(false);
    
    const openWebsite = (url) => {
        const { invoke } = window.__TAURI__.tauri
        // 在默认浏览器打开链接
        invoke('open_url_in_browser', { url: url })
        .then((response) => {
        window.header.innerHTML = response
        })
    };

    const openIframe = () => {
        setIframeVisible(true);
    };

    const closeIframe = () => {
        setIframeVisible(false);
    };

  return (
    <div className="about-container">
      <div className="image-container">
        <img src="./../../img/bg.jpg" alt="My Image" />
      </div>
      <h1 className="about-text-h1">JTOP游戏启动器</h1>
      <p className="about-text-p">版本：v1.0.1.3a</p>
      <div className="button-container">
        <input type="image" src="./../../img/官方网站.png" alt="官方网站" onClick={() => openWebsite('https://jtopgame.top')} />
        <input type="image" src="./../../img/意见反馈.png" alt="意见反馈" onClick={() => openWebsite('https://jtopgame.top/')} />
        <input type="image" src="./../../img/开源信息.png" alt="开源信息" id="openIframeButton" onClick={openIframe} />
      </div>

      {iframeVisible && (
        <div className="modal-overlay" onClick={closeIframe}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeIframe}>X</button>
            <div className="modal-content-inner">
              <ThirdPartyPage />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
