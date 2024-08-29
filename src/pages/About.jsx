import React, { useState } from 'react';
import './/..//css/About.css'; 

const About = () => {
  const [iframeVisible, setIframeVisible] = useState(false);

  const openWebsite = (url) => {
    window.open(url, '_blank');
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
<<<<<<< Updated upstream
        <div id="mask" onClick={closeIframe}>
          <div id="iframeWindow">
            <div className="closeButton" onClick={closeIframe}>&times;</div>
            <iframe id="iframeDisplay" src="third-party.html" title="Third Party Content"></iframe>
=======
        <div className="modal-overlay" onClick={closeIframe}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* 关闭按钮，点击时调用closeIframe函数 */}
            <button className="close-button" onClick={closeIframe}>×</button>
            {/* 模态框内容区域 */}
            <div className="modal-content-inner">
              <ThirdPartyPage />
            </div>
>>>>>>> Stashed changes
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
