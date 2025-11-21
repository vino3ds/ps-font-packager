/*
// =============================================================================
// Plugin Name: PS Font Packager (PS字体打包收集脚本)
// Version: 1.2.5
// Author: Vino
// Website: https://vinofx.com
// GitHub: https://github.com/vinceofx
// Date Created: 2023/06/01
// Date Updated: 2025/11/21
// License: MIT License
// =============================================================================
//
// 【重要声明 / Important Notice】
//
// 1. 本工具完全免费开源 (Free & Open Source)。
// 2. 请大家不要拉取后二次封装成收费程序，希望尊重开源精神！(Please do not repackage this tool for sale. Respect the open source spirit.)
// 3. 谢谢您的贡献和努力！(Thank you for your contribution and hard work!)
//
// =============================================================================
*/

#target photoshop

// --- 1. 基础工具 ---
var p = new ActionReference();

function arrayUnique(a) {
    var t = [], i = a.length;
    while (i--) {
        var f = false, n = t.length;
        while (n--) { if (a[i] === t[n]) f = true; }
        if (!f) t.push(a[i]);
    }
    return t;
}

// --- 2. 获取文档字体 PS名称 ---
function findFonts() {
    p.putEnumerated(charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    var c = executeActionGet(p).getInteger(charIDToTypeID('NmbL')) + 1, fonts = [];

    while (c--) {
        var r = new ActionReference(), descLayer;
        r.putIndex(charIDToTypeID('Lyr '), c);
        try { descLayer = executeActionGet(r); } catch (e) { continue; }
        if (!descLayer.hasKey(stringIDToTypeID('textKey'))) continue;

        var layerStyles = descLayer.getObjectValue(stringIDToTypeID('textKey')).getList(stringIDToTypeID('textStyleRange'));
        var countStyles = layerStyles.count;

        while (countStyles--) {
            var n = layerStyles.getObjectValue(countStyles).getObjectValue(stringIDToTypeID('textStyle')).getString(stringIDToTypeID('fontPostScriptName'));
            fonts.push(n);
        }
    }
    return arrayUnique(fonts).sort();
}

// --- 3. 智能模糊匹配与拷贝 ---

// 常用中文字体映射表 (PS名 -> 文件名核心)
function getMappedName(psName) {
    var map = {
        "YouYuan": "SIMYOU",      // 幼圆
        "LiSu": "SIMLI",          // 隶书
        "SimHei": "SIMHEI",       // 黑体
        "SimSun": "SIMSUN",       // 宋体
        "NSimSun": "SIMSUN",      // 新宋体
        "KaiTi": "SIMKAI",        // 楷体
        "FangSong": "SIMFANG",    // 仿宋
        "MicrosoftYaHei": "MSYH", // 微软雅黑
        "MicrosoftJhengHei": "MSJH", // 微软正黑
        "STXihei": "STXIHEI",     // 华文细黑
        "STKaiti": "STKAITI",     // 华文楷体
        "STSong": "STSONG",       // 华文宋体
        "STZhongsong": "STZHONGS",// 华文中宋
        "STFangsong": "STFANGSO", // 华文仿宋
        "STCaiyun": "STCAIYUN",   // 华文彩云
        "STHupo": "STHUPO",       // 华文琥珀
        "STLiti": "STLITI",       // 华文隶书
        "STXingkai": "STXINGKA",  // 华文行楷
        "STXinwei": "STXINWEI"    // 华文新魏
    };
    for (var key in map) {
        if (psName.indexOf(key) === 0) return map[key];
    }
    return null;
}

// 清洗字符串：去后缀、去符号、转小写
function cleanString(str) {
    var s = str.replace(/(--.*|GBK.*|Std|Pro|MT|W\d+)/gi, ""); // 去除编码后缀
    s = s.replace(/(Bold|Italic|Regular|Light|Black|Medium)/gi, ""); // 去除字重
    return s.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "").toLowerCase();
}

// 判断是否匹配
function isFuzzyMatch(psName, fileName) {
    var fName = fileName.toUpperCase();
    var pName = psName;

    // A. 映射表优先
    var mapped = getMappedName(pName);
    if (mapped && fName.indexOf(mapped) > -1) return true;

    // B. 清洗后比对
    var cleanPS = cleanString(pName);
    var cleanFile = cleanString(fileName.replace(/\.[^\.]+$/, "")); // 去除扩展名

    if (cleanPS.length < 2 || cleanFile.length < 2) return false; // 防止过短误判

    // C. 相互包含
    if (cleanFile.indexOf(cleanPS) > -1) return true;
    
    // D. 前缀容错 (如 FZYTK--GBK 匹配 FZYTK.ttf)
    if (cleanPS.indexOf(cleanFile) > -1 && cleanFile.length > 3) return true;

    return false;
}

function copyFontsToDesktop(fontNames) {
    var destFolder = new Folder(Folder.desktop + "/Collected_Fonts");
    if (!destFolder.exists) destFolder.create();

    // 定义系统字体路径
    var sysFontPaths = [];
    if (File.fs == "Windows") {
        sysFontPaths.push(new Folder("C:/Windows/Fonts"));
    } else {
        sysFontPaths.push(new Folder("/Library/Fonts"));
        sysFontPaths.push(new Folder("/System/Library/Fonts"));
        sysFontPaths.push(new Folder("~/Library/Fonts"));
    }

    var totalFiles = [];
    // 预加载文件列表
    for (var i = 0; i < sysFontPaths.length; i++) {
        if (sysFontPaths[i].exists) {
            var files = sysFontPaths[i].getFiles();
            for (var j = 0; j < files.length; j++) {
                if (files[j] instanceof File) totalFiles.push(files[j]);
            }
        }
    }

    var log = "";
    var successCount = 0;

    // 遍历查找
    for (var k = 0; k < fontNames.length; k++) {
        var psName = fontNames[k];
        var matchedForThis = false;

        for (var f = 0; f < totalFiles.length; f++) {
            var file = totalFiles[f];
            var fileName = decodeURI(file.name);

            if (isFuzzyMatch(psName, fileName)) {
                try {
                    file.copy(destFolder + "/" + fileName);
                    matchedForThis = true;
                } catch(e) {}
            }
        }
        if (matchedForThis) successCount++;
        else log += "未匹配到文件: " + psName + "\n";
    }

    return { count: successCount, log: log, dest: destFolder.fsName };
}

// --- 4. 执行 ---
if (documents.length) {
    var usedFonts = findFonts();
    if (confirm("检测到 " + usedFonts.length + " 个字体。\n是否执行【智能模糊搜索】并导出到桌面？")) {
        var result = copyFontsToDesktop(usedFonts);
        alert("处理完成！\n成功匹配: " + result.count + " 种字体。\n位置: " + result.dest + 
              (result.log ? "\n\n未找到源文件:\n" + result.log : ""));
    }
} else {
    alert('请先打开一个文档。');
}