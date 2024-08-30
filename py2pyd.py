import os
import Cython.Build
import distutils.core

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
                distutils.core.setup(
                    ext_modules=ext,  # 将Cython.Build.cythonize返回的结果传进去
                    script_args=['build']
                )
                print(f"Compiling {full_path}...")
                print(f"full path: {full_path}")

if __name__ == '__main__':
    directory_to_compile = './src-python'
    compile_py_files(directory_to_compile)
