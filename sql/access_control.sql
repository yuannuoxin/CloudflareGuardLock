-- Cloudflare Guard Lock (CGL) - D1 数据库初始化脚本
-- 完全兼容 SQLite 语法，可直接在 D1 控制台执行

-- 1. 删除旧表（若存在，避免冲突）
DROP TABLE IF EXISTS cgl_access_control;

-- 2. 创建核心表（D1 支持 CURRENT_TIMESTAMP 自动生成时间）
CREATE TABLE IF NOT EXISTS cgl_access_control
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    hostname    TEXT    NOT NULL,
    valid_until INTEGER NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address  TEXT,
    user_agent  TEXT
);

-- 3. 核心组合索引（覆盖查询条件：hostname + valid_until，优化查询速度）
CREATE INDEX IF NOT EXISTS cgl_idx_hostname_valid_until
    ON cgl_access_control (hostname, valid_until DESC);
-- 降序优先匹配最近未过期记录

-- 4. 辅助索引（优化排序和审计查询）
CREATE INDEX IF NOT EXISTS cgl_idx_created_at
    ON cgl_access_control (created_at DESC);
CREATE INDEX IF NOT EXISTS cgl_idx_ip_address
    ON cgl_access_control (ip_address);

-- 5. 测试数据（可选，验证表创建成功）
INSERT INTO cgl_access_control (hostname, valid_until, ip_address, user_agent)
VALUES ('test.example.com',
        strftime('%s', 'now') * 1000 + 300000,
        '192.168.1.1',
        'Mozilla/5.0 (Test) CGL/1.0');