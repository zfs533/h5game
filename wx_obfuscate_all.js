const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

// ====================== 配置区（按需修改） ======================
// 混淆参数
const OBF_CONFIG = {
    compact: true,
    controlFlowFlattening: true,
    // controlFlowFlatteningThreshold: 0.7,
    // stringArray: true,
    // stringArrayEncoding: ["base64"],
    // rotateStringArray: true,
    // selfDefending: true,
    // renameGlobals: true,
    // renameProperties: false
};

// 递归时直接跳过的目录（全局忽略，不进入遍历）
const SKIP_SCAN_DIRS = new Set([
    "node_modules",
    // "cocos-js",
    // "src",
    "openDataContext",
    "jsb-adapter"
]);

// 【重点：整个文件夹跳过混淆】
// 相对根目录的文件夹，里面所有js全部跳过，不混淆
const SKIP_OBF_FOLDERS = [
    "cocos",       // cocos引擎文件夹整包跳过
    "vendors",      // 第三方库文件夹
    "libs",
    "plugin",
    "wx-ad-sdk"     // 微信广告sdk目录
];

// 单独跳过的文件名（匹配全名）
const SKIP_FILE_NAMES = new Set([
    "cc.js",
    "spine.asm-CuMHFj9t.js",
    // "main.js",
    // "web-adapter.js",
    "obfuscate-all.js",
    "wx_obfuscate_all.js",
    // "application.js",
    // "engine-adapter.js",
    // "first-screen.js",
    // "index.js",
]);
// =============================================================

/**
 * 判断文件路径是否在需要跳过混淆的文件夹内
 * @param {string} root 根目录
 * @param {string} filePath 文件完整绝对路径
 * @returns boolean true=跳过混淆
 */
function isInSkipFolder(root, filePath) {
    const relPath = path.relative(root, filePath);
    for (const folder of SKIP_OBF_FOLDERS) {
        // 判断相对路径是否以 文件夹名/ 开头
        if (relPath.startsWith(`${folder}${path.sep}`)) {
            return true;
        }
    }
    return false;
}

/**
 * 递归遍历目录
 * @param {string} dirPath 当前遍历目录
 * @param {string} root 根目录（用于判断跳过文件夹）
 */
function traverseDir(dirPath, root) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        // 全局跳过的目录，直接不进入
        if (entry.isDirectory()) {
            if (SKIP_SCAN_DIRS.has(entry.name)) continue;
            traverseDir(fullPath, root);
            continue;
        }

        // 只处理js文件
        if (!entry.isFile() || !entry.name.endsWith(".js")) continue;

        // 条件1：文件位于跳过混淆文件夹内 → 跳过
        if (isInSkipFolder(root, fullPath)) {
            console.log(`[跳过-引擎文件夹] ${fullPath}`);
            continue;
        }
        // 条件2：匹配黑名单文件名 → 跳过
        if (SKIP_FILE_NAMES.has(entry.name)) {
            console.log(`[跳过-黑名单文件] ${fullPath}`);
            continue;
        }

        try {
            // 读取源码并混淆
            const sourceCode = fs.readFileSync(fullPath, "utf8");
            const obfResult = JavaScriptObfuscator.obfuscate(sourceCode, OBF_CONFIG);
            const obfCode = obfResult.getObfuscatedCode();
            
            // 可选：先备份原文件（取消注释开启备份）
            // fs.copyFileSync(fullPath, fullPath + ".bak");
            
            // 覆盖原文件
            fs.writeFileSync(fullPath, obfCode, "utf8");
            console.log(`[混淆覆盖完成] ${fullPath}`);
        } catch (err) {
            console.error(`[混淆失败] ${fullPath} | 错误：${err.message}`);
        }
    }
}

// 程序入口
const rootDirectory = "./";
console.log("===== JS批量混淆工具（支持指定文件夹跳过） =====");
console.log("警告：脚本会直接覆盖原JS文件，操作前务必备份代码！\n");
traverseDir(rootDirectory, rootDirectory);
console.log("\n✅ 全部文件处理完毕！");