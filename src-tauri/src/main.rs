// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

use tauri::{Manager, SystemTray, SystemTrayEvent};
use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem};
use std::sync::{Arc, Mutex};

fn main() {
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
    let is_show_window = Arc::new(Mutex::new(false)); 

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .system_tray(tray)
        .on_system_tray_event(move |app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => {
              match id.as_str() {
                "quit" => {
                  std::process::exit(0);
                }
                "hide" => {
                    if let Some(window) = app.get_window("main") {
                        let mut is_show_window = is_show_window.lock().unwrap();
                        if *is_show_window {
                            if let Err(e) = window.hide() {
                                eprintln!("Failed to hide window: {}", e);
                            }
                            let item_handle = app.tray_handle().get_item("hide");
                            let _ = item_handle.set_title("显示窗口");
                            *is_show_window = false;
                        }
                        else {
                            if let Err(e) = window.show() {
                                eprintln!("Failed to show window: {}", e);
                            }
                            let item_handle = app.tray_handle().get_item("hide");
                            let _ = item_handle.set_title("隐藏窗口");
                            *is_show_window = true;
                        }
                    }
                }
                _ => {}
              }
            }
            _ => {}
          })
        .run(context)
        .expect("error while running tauri application");
}
