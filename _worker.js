// 导入 CGL 核心验证函数
import { handleAuth } from './cgl-core.js';

// -------------------------- 你的原有 Worker 核心逻辑（完全不动）--------------------------
async function originalWorkerLogic(request, env, ctx) {
    const url = new URL(request.url);

    // 示例：原 Worker 是反向代理
    if (url.pathname.startsWith("/proxy")) {
        const targetUrl = url.searchParams.get("url");
        if (!targetUrl) return new Response("缺少 targetUrl 参数", { status: 400 });
        return fetch(targetUrl, {
            headers: request.headers,
            method: request.method,
            body: request.body,
            redirect: "follow"
        });
    }

    // 示例：原 Worker 是 API 接口
    if (url.pathname === "/api/hello") {
        return new Response(JSON.stringify({ message: "Hello from Worker!" }), {
            headers: { "Content-Type": "application/json" }
        });
    }

    // 示例：原 Worker 是静态页面
    return new Response(`
    <html>
    <head><title>Worker 示例页面</title></head>
    <body style="text-align:center; margin-top: 100px; color: #333;">
      <h2>✅ Worker 功能正常运行</h2>
      <p>验证逻辑已通过 CGL 集成，原功能无改动</p>
    </body>
    </html>
  `, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
// -------------------------- 原有逻辑结束 --------------------------

// Worker 通用入口（export default { fetch } 写法）
export default {
    async fetch(request, env, ctx) {
        // 调用 CGL 验证，验证通过后执行原逻辑
        return handleAuth({
            request,    // 原始请求对象
            env,        // Worker 环境变量（含 R1 数据库绑定）
            ctx,        // Worker 上下文（用于 waitUntil 等）
            originalLogic: originalWorkerLogic // 你的原有核心逻辑
        });
    }
};