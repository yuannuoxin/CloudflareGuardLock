# 自动创建 functions 目录，下载 CGL 核心文件（替换为你的仓库 Raw 链接）
mkdir -p functions && \
curl -o functions/cgl-pages.js "https://raw.githubusercontent.com/yuannuoxin/CloudflareGuardLock/refs/heads/master/functions/cgl-pages.js" && \
curl -o functions/[[catchall]].js "https://raw.githubusercontent.com/yuannuoxin/CloudflareGuardLock/refs/heads/master/functions/[[catchall]].js" && \
curl -o cgl-core.js "https://raw.githubusercontent.com/yuannuoxin/CloudflareGuardLock/refs/heads/master/cgl-core.js" && \
# 原项目的构建命令（保持不变，替换为原项目的构建命令）
#原项目的构建命令