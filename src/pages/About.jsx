// About.jsx
import React, { useState } from 'react';
import './../css/About.css'; // 导入关于页面的CSS样式
import ThirdPartyPage from './ThirdPartyPage'; // 导入第三方页面组件
import './../css/ThirdPartyFrame.css'; // 导入第三方页面模态框样式

const About = () => {
    // 使用useState钩子创建一个状态来控制iframe的可见性
    const [iframeVisible, setIframeVisible] = useState(false);
    
    // 定义一个函数来打开网页链接
    const openWebsite = (url) => {
        const { invoke } = window.__TAURI__.tauri
        // 使用Tauri的API在默认浏览器打开链接
        invoke('open_url_in_browser', { url: url })
        .then((response) => {
            // 假设这里更新页面头部内容
            window.header.innerHTML = response
        })
    };

    // 定义一个函数来打开iframe模态框
    const openIframe = () => {
        setIframeVisible(true);
    };

    // 定义一个函数来关闭iframe模态框
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
        <input type="image" src="./../../img/官方网站.png" alt="官方网站" onClick={() => openWebsite('https://jtopgame.top')}  />
        <input type="image" src="./../../img/意见反馈.png" alt="意见反馈" onClick={() => openWebsite('https://jtopgame.top/')}  />
        <input type="image" src="./../../img/开源信息.png" alt="开源信息" id="openIframeButton" onClick={openIframe} />
      </div>

      {iframeVisible && (
        <div className="modal-overlay" onClick={closeIframe}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* 关闭按钮，点击时调用closeIframe函数 */}
            <button className="close-button" onClick={closeIframe}>X</button>
            {/* 模态框内容区域 */}
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
