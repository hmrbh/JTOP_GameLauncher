import os
import sys
from setuptools import setup
from Cython.Build import cythonize

def compile_to_pyd(directory):
    # 遍历指定目录
    pyx_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.py'):
                # 构建完整的文件路径
                file_path = os.path.join(root, file)
                # 创建对应的 .pyx 文件路径
                pyx_file_path = file_path[:-3] + '.pyx'
                # 复制 .py 文件为 .pyx 文件
                with open(file_path, 'r') as src:
                    with open(pyx_file_path, 'w') as dst:
                        dst.write(src.read())
                pyx_files.append(pyx_file_path)

    # 使用 cythonize 编译 .pyx 文件
    extensions = cythonize(pyx_files, language_level=3)

    # 保存原始 sys.argv
    original_argv = sys.argv
    # 设置 sys.argv 为 setup() 函数所需的参数
    sys.argv = ['build_ext', '--inplace']

    # 调用 setup() 函数
    setup(
        ext_modules=extensions,
        script_args=['build_ext', '--inplace']
    )

    # 恢复原始 sys.argv
    sys.argv = original_argv

    # 删除临时的 .pyx 文件
    for pyx_file_path in pyx_files:
        os.remove(pyx_file_path)
    # 删除临时的 .c 文件
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.c'):
                os.remove(os.path.join(root, file))
                print(f"Deleted {os.path.join(root, file)}")
if __name__ == "__main__":
    # 检查是否提供了目录参数
    if len(sys.argv) > 1:
        directory_to_compile = sys.argv[1]
        print(f"Compiling all .py files in {directory_to_compile}")
        compile_to_pyd(directory_to_compile)
    else:
        print("Usage: python py2pyd.py <directory>")
