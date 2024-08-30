// Sidebar.jsx
import React, { useState } from 'react';
import './css/Sidebar.css';
import Home from './pages/Home';
import News from './pages/News';
import Workshop from './pages/Workshop';
import Settings from './pages/Settings';
import About from './pages/About';
import './css/GlobalStyles.css';

const Sidebar = () => {
  const [activePage, setActivePage] = useState('home');

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h1>JTOP游戏启动器</h1>
        <ul>
          <li className={activePage === 'home' ? 'active' : ''} onClick={() => handlePageChange('home')}>
            <i className="icon home"></i> 游戏
          </li>
          <li className={activePage === 'news' ? 'active' : ''} onClick={() => handlePageChange('news')}>
            <i className="icon news"></i> 新闻
          </li>
          <li className={activePage === 'workshop' ? 'active' : ''} onClick={() => handlePageChange('workshop')}>
            <i className="icon workshop"></i> 创意工坊
          </li>
          <li className={activePage === 'settings' ? 'active' : ''} onClick={() => handlePageChange('settings')}>
            <i className="icon settings"></i> 设置
          </li>
          <li className={activePage === 'about' ? 'active' : ''} onClick={() => handlePageChange('about')}>
            <i className="icon about"></i> 关于
          </li>
        </ul>
        <div className="sidebar-divider"></div> {/* 插入分割线 */}
      </div>

      <div className="content">
        {/* 根据当前活动页面渲染不同的内容 */}
        {activePage === 'home' && <Home />}
        {activePage === 'news' && <News />}
        {activePage === 'workshop' && <Workshop />}
        {activePage === 'settings' && <Settings />}
        {activePage === 'about' && <About />}
      </div>
    </div>
  );
};

export default Sidebar;
