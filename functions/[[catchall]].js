// 捕获所有 Pages 路由，强制经过 CGL 验证
import { onRequest as cglAuth } from './cgl-pages.js';

// 直接转发到验证逻辑，Pages 自动处理路由优先级
export const onRequest = cglAuth;