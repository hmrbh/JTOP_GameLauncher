# **JTOP游戏启动器（JTOP游戏平台）**

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

在**本目录位置**打开终端，输入

```bash
npm run tauri dev
```

### 打包方法

1、将同级目录下的`AppData.Local.tauri.zip` 复制到`C:\Users\<你的用户名>\AppData\Local`目录下，只有在第一次打包时才复制，后续直接运行打包命令即可。

2、在**本目录位置**打开终端，输入

```bash
npm run tauri build
```

你可以在`src-tauri\target\release`目录中找到打包好的exe文件，并在`bundle`文件夹中找到通过两种安装包工具打包的安装包。

