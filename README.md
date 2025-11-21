## 🟩 PS Font Packager

**A Photoshop ExtendScript (JSX) for collecting and packaging project fonts.**

---

### ℹ️ Metadata

| Key | Value |
| :--- | :--- |
| **Plugin Name** | PS Font Packager (PS字体打包收集脚本) |
| **Author** | Vino |
| **Website** | [https://vinofx.com](https://vinofx.com) |
| **GitHub** | [https://github.com/vinceofx](https://github.com/vinceofx) |
| **License** | MIT License |

---

### 🌟 Key Features

This script automates the tedious process of packaging font files used in a large PSD document.

* **Robust Fuzzy Matching:** Uses an advanced algorithm to reliably match the font's internal PostScript name (e.g., `Arial-BoldMT`) to its system filename (e.g., `arialbd.ttf`).
* **Chinese Font Optimization:** Includes special mapping for common Chinese system fonts (e.g., `YouYuan` to `SIMYOU`) and handles common suffixes like `GBK`.
* **Simple Output:** Copies all found font files to a single folder named `Collected_Fonts` on your Desktop.
* **No Dependencies:** Pure ExtendScript, no need for external libraries or panels (UXP/CEP).

### 🚀 Installation & Usage

1.  **Download:** Download the script file (`PSFontPackager.jsx`) from the GitHub repository.
2.  **Open PSD:** Open the Photoshop document (`.psd`) containing the fonts you wish to collect.
3.  **Run Script:** In Photoshop, navigate to `File > Scripts > Browse...` and select the downloaded `.jsx` file.
4.  **Confirm:** Confirm the dialog box to start the search and copy process.
5.  **Retrieve:** Find your packaged fonts in the `Collected_Fonts` folder on your Desktop.

### 💻 Compatibility

| Application | OS | Version |
| :--- | :--- | :--- |
| **Adobe Photoshop** | Windows | CC 2018 and newer |
| **Adobe Photoshop** | macOS | CC 2018 and newer |

---

## 🇨🇳 PS Font Packager 中文说明

**一款用于收集和打包项目字体的 Photoshop ExtendScript (JSX) 脚本。**

---

### ℹ️ 项目元数据

| 键名 | 值 |
| :--- | :--- |
| **插件名称** | PS Font Packager (PS字体打包收集脚本) |
| **作者** | Vino |
| **网站** | [https://vinofx.com](https://vinofx.com) |
| **GitHub** | [https://github.com/vinceofx](https://github.com/vinceofx) |
| **许可证** | MIT License |

---

### 🌟 核心功能

本脚本旨在自动化处理大型 PSD 文档中字体文件的收集和打包工作。

* **强大的模糊匹配:** 采用高级算法，能够可靠地匹配字体的内部 PostScript 名称（例如 `Arial-BoldMT`）与实际的系统文件名（例如 `arialbd.ttf`）。
* **中文字体优化:** 内置了对常用中文字体（如幼圆 `YouYuan` 到 `SIMYOU`）的特殊命名映射，并处理了常见的 `GBK` 等后缀。
* **输出简单:** 将所有找到的字体文件拷贝到桌面上的一个名为 `Collected_Fonts` 的文件夹中。
* **无依赖性:** 纯 ExtendScript 脚本，无需依赖外部库或插件面板（UXP/CEP）。

### 🚀 安装与使用

1.  **下载:** 从 GitHub 仓库下载脚本文件（`PSFontPackager.jsx`）。
2.  **打开文档:** 在 Photoshop 中打开需要收集字体的 PSD 文件。
3.  **运行脚本:** 在 Photoshop 中，导航至菜单 `文件 > 脚本 > 浏览...`，选择并运行下载的 `.jsx` 文件。
4.  **确认:** 确认弹出的对话框，开始搜索和拷贝过程。
5.  **查找:** 收集完成的字体文件位于您的桌面文件夹 `Collected_Fonts` 中。

### 💻 兼容性

| 应用程序 | 操作系统 | 版本要求 |
| :--- | :--- | :--- |
| **Adobe Photoshop** | Windows | CC 2018 及更高版本 |
| **Adobe Photoshop** | macOS | CC 2018 及更高版本 |

---

### 📜 许可证与贡献

本项目采用 **MIT 许可证**。请注意作者的开源精神声明：

> 本工具完全免费开源。请勿拉取后二次封装成收费程序，希望尊重开源精神。感谢您的支持与使用！