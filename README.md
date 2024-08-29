# **JTOP游戏启动器（JTOP游戏平台）**



## **TODO**

1. 绘制自定义标题栏（官网有文档，百度搜tauri自定义标题栏）
2. 将侧边栏的字符图标换成之前启动器用的侧边栏图标
3. 关闭按钮保存点击后是否关闭或退出到系统托盘
4. 让日志文件带时间编号，并放在APPDATA/LOACL/JTOP/JTOP Game Launcher目录里
5. 设置界面搬过来
6. 所有页面进行响应式布局设计，最大化窗口能够保持样式



## 如何参与开发 ？

### 先决条件

请确保您的操作系统上安装了Node JS和Rust。

打开终端，输入以下命令来安装Tauri CLI

```bash
npm install --save-dev @tauri-apps/cli
```

如果在运行上面的命令时出现网络问题，建议使用`cnpm`作为您的包管理器。

```bash
 npm install -g cnpm --registry=http://registry.npmmirror.com
```

在安装`cnpm`后，您可以用`cnpm`来替换`npm`，例如输入`npm run tauri dev`替换为`cnpm run tauri dev`



### 运行方法

在**项目根目录**打开终端，输入

```bash
npm run tauri dev
```

如果您使用VSCode来运行项目，可以先在**项目根目录**打开终端运行

```bash
npm run dev
```

然后再打开`JTOP_GameLauncher/src-tauri/src/main.rs`，

![how to run this project](.\img\how to run this project.png)

点击main函数上面的“Run”即可运行。

如果您没有看到`Run`的字样，说明您没有安装rust插件扩展包

![rust extensions](.\img\rust extensions.png)

或者rust解释器插件正在扫描您的项目。请耐心等待。

![analyzer running](.\img\analyzer running.png)

### 打包方法

1、将同级目录下的`AppData.Local.tauri.zip` 复制到`C:\Users\<你的用户名>\AppData\Local`目录下，只有在第一次打包时才复制，后续直接运行打包命令即可。

2、在**项目根目录**打开终端，输入

```bash
npm run tauri build
```

你可以在`src-tauri\target\release`目录中找到打包好的exe文件，并在`bundle`文件夹中找到通过两种安装包工具打包的安装包。

