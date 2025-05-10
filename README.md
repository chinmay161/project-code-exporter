# 📦 Project-code-export

**Project-code-export** is a Visual Studio Code extension that allows you to export the source code of your current workspace into a single document in one of three formats: `DOCX`, `TXT`, or `Markdown (MD)`. This tool is especially useful for documentation, code reviews, teaching, and offline sharing. This tool is also useful for debugging assistance—by exporting your project into a single file and sharing it with GPT-based tools, you provide full context, allowing them to understand your codebase more clearly and offer more accurate and relevant solutions.

---

## 🚀 Features

* ✅ Export all relevant source files in a workspace.
* ✅ Supports `DOCX`, `TXT`, and `MD` output formats.
* ✅ Honors `.gitignore` rules to skip unnecessary files.
* ✅ Automatically formats the code per file with clear section headers.
* ✅ Option to update the previously generated export.

---

## 📂 Supported File Types

Only files with the following extensions are included in the export:

```
.js, .ts, .py, .java, .html, .css, .json, .md, .txt
```

---

## 📄 Output Formats

* **DOCX**: Well-structured document with file titles and formatted code sections.
* **TXT**: Plain text with clearly separated files and their contents.
* **Markdown (MD)**: Markdown document with code blocks and file headers.

---

## 🛠️ Installation

1. Clone or download this repository.
2. Open the folder in VS Code.
3. Run `npm install` to install dependencies.
4. Press `F5` to launch a new Extension Development Host window.

---

## 🧪 Usage

1. Open your project folder in VS Code.
2. Open the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
3. Type `Export Project Code` and select:

   * `Project Code Exporter: Generate` to create a new export.
   * `Project Code Exporter: Update` to refresh the existing export.
4. Choose your preferred output format (`DOCX`, `TXT`, or `MD`).
5. The exported file will be saved as `ProjectCode.ext` in your root workspace folder.

---

## 📁 Example Output

* **DOCX**: Contains sectioned paragraphs for each file.
* **TXT**:

  ```
  === src/index.js ===
  // Your code here...

  === utils/helpers.py ===
  # Python helper functions
  ```
* **MD**:

  ```md
  ## `src/index.js`
  ```

  

---

## 🔒 .gitignore Support

The extension reads the `.gitignore` file at the root of your workspace to exclude unnecessary or sensitive files from export.

---

## 🔧 Requirements

* VS Code
* Node.js & npm
* [docx](https://www.npmjs.com/package/docx) npm package

---

## 🤝 Contributing

Contributions are welcome! If you'd like to fix a bug or propose a feature, feel free to fork the project and submit a pull request.


