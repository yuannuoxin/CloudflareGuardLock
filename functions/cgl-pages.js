// 导入 CGL 核心验证函数
import {handleAuth} from '../cgl-core.js';

// Pages 入口函数（支持所有 Pages 写法）
export async function onRequest(context) {
    const {request, env, next} = context;
    // 调用 CGL 验证，通过 next() 转发到原项目
    return handleAuth({
        request,
        env,
        next // Pages 专属：转发到原项目逻辑（静态页面/自定义函数/框架路由）
    });
}

// 兼容 Pages 的 export default { fetch } 写法
export default {
    async fetch(request, env, ctx) {
        return handleAuth({
            request,
            env,
            next: () => fetch(request, {headers: request.headers, method: request.method, body: request.body})
        });
    }
};