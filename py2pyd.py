import os
import shutil  # 导入 shutil 模块用于文件操作
import Cython.Build
from setuptools import setup

def compile_py_files(directory):
    # 遍历目录及其子目录中的所有文件
    for dirpath, dirnames, files in os.walk(directory):
        for file in files:
            if file.endswith('.py'):
                # 构建完整的文件路径
                full_path = os.path.join(dirpath, file)
                # 编译Python文件
                ext = Cython.Build.cythonize(full_path)
                # 调用setup方法
                setup(
                    ext_modules=ext,  # 将Cython.Build.cythonize返回的结果传进去
                    script_args=['build', 'build_ext', '--inplace']
                )
                print(f"Compiling {full_path}...")
                print(f"full path: {full_path}")

                # 构建目标文件路径
                # 获取上一级目录的路径
                parent_dir = os.path.dirname(os.path.dirname(full_path))
                target_dir = os.path.join(os.path.dirname(parent_dir), 'bin-python')
                if not os.path.exists(target_dir):
                    os.makedirs(target_dir)

                # 构建目标文件名，去掉后缀
                base_name = os.path.splitext(file)[0]
                target_file = f"{base_name}.pyd"
                
                
                # 复制文件到目标目录
                shutil.copy(("./build/lib.win-amd64-cpython-312/"+base_name+".cp312-win_amd64.pyd"), os.path.join(target_dir, target_file))
                print(f"Copied to {os.path.join(target_dir, target_file)}")

def remove_c_files(directory):
    # 遍历目录及其子目录中的所有文件
    for dirpath2, dirnames, files in os.walk(directory):
        for file in files:
            if file.endswith('.c'):
                # 构建完整的文件路径
                full_path = os.path.join(dirpath2, file)
                # 删除C文件
                os.remove(full_path)
                print(f"Removed {full_path}...")

if __name__ == '__main__':
    directory_to_compile = './src-python'
    compile_py_files(directory_to_compile)
    remove_c_files(directory_to_compile)