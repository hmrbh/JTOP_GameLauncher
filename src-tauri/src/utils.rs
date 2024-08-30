extern crate webbrowser;

pub fn open_url_in_default_browser(url: &str) {
    match webbrowser::open(url) {
        Ok(_) => println!("浏览器已打开"),
        Err(e) => eprintln!("无法打开浏览器: {}", e),
    }
}