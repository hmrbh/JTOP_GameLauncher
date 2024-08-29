// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, SystemTray, SystemTrayEvent, CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem};
use std::sync::{Arc, Mutex};
use simplelog::*;
use std::fs::File;

extern crate simplelog;
extern crate log;

mod utils;

fn main() {

    CombinedLogger::init(vec![
        TermLogger::new(LevelFilter::Debug, Config::default(), TerminalMode::Mixed, ColorChoice::Auto),
        WriteLogger::new(LevelFilter::Info, Config::default(), File::create("log.txt").unwrap()),
    ]).unwrap();

    log::info!("创建系统托盘");

    let context = tauri::generate_context!();
    
    // 创建托盘菜单
    let quit = CustomMenuItem::new("quit".to_string(), "退出");
    let hide = CustomMenuItem::new("hide".to_string(), "隐藏窗口");
    let tray_menu = SystemTrayMenu::new()
      .add_item(quit)
      .add_native_item(SystemTrayMenuItem::Separator)
      .add_item(hide);

    //将托盘菜单添加到 SystemTray 实例
    let tray = SystemTray::new().with_menu(tray_menu);
    // 记录当前窗口是否显示
    // 窗口默认是显示状态，所以初始值设置为 true
    let is_show_window = Arc::new(Mutex::new(true)); 

    tauri::Builder::default()
        // 注册指令 open_url_in_browser
        .invoke_handler(tauri::generate_handler![open_url_in_browser])
        .system_tray(tray)
        .on_system_tray_event(move |app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => {
              match id.as_str() {
                "quit" => {
                  log::info!("由托盘菜单退出程序");
                  std::process::exit(0);
                }
                "hide" => {
                    if let Some(window) = app.get_window("main") {
                        let mut is_show_window = is_show_window.lock().unwrap();
                        if *is_show_window {
                            if let Err(e) = window.hide() {
                                log::error!("无法隐藏窗口: {}", e)
                            }
                            let item_handle = app.tray_handle().get_item("hide");
                            let _ = item_handle.set_title("显示窗口");
                            *is_show_window = false;
                            log::debug!("隐藏窗口")
                        }
                        else {
                            if let Err(e) = window.show() {
                                log::error!("无法显示窗口: {}", e)
                            }
                            let item_handle = app.tray_handle().get_item("hide");
                            let _ = item_handle.set_title("隐藏窗口");
                            *is_show_window = true;
                            log::debug!("显示窗口");
                        }
                    }
                }
                _ => {}
              }
            }
            SystemTrayEvent::DoubleClick { .. } => {
              if let Some(window) = app.get_window("main") {
                log::info!("托盘双击，显示窗口在最上层");
                  if let Err(e) = window.show() {
                      log::error!("无法在设置窗口焦点前显示窗口: {}", e);
                  }
                  
                  if let Err(e) = window.set_focus() {
                    log::error!("无法设置窗口焦点: {}", e);
                  }
                }
             }
            _ => {}
          })
        .run(context)
        .expect("运行 Tauri 应用失败");
}

#[tauri::command]
fn open_url_in_browser(url: &str) {
  utils::open_url_in_default_browser(url);
  log::info!("打开网页：{}", url)
}