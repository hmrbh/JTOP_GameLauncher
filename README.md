# **JTOP游戏启动器（JTOP游戏平台）**

### 运行方法

在本目录位置打开终端，输入

```bash
npm run tauri dev
```

### 打包方法

1、将同级目录下的`AppData.Local.tauri.zip` 复制到`C:\Users\<你的用户名>\AppData\Local`目录下，只有在第一次打包时才复制，后续直接运行打包命令即可。

2、在本目录位置打开终端，输入

```bash
npm run tauri build
```

你可以在`src-tauri\target\release`目录中找到打包好的exe文件，并在`bundle`文件夹中找到通过两种安装包工具打包的安装包。

