const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const ignore = require('ignore');

function activate(context) {
    async function exportProjectCode(update = false) {
        // Get workspace root path
        const rootPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!rootPath) {
            vscode.window.showErrorMessage("No workspace folder open.");
            return;
        }

        // Let user choose file format
        const format = await vscode.window.showQuickPick(
            ['DOCX', 'TXT', 'MD'], 
            { placeHolder: 'Select output format' }
        );
        if (!format) return;

        // Configure format-specific settings
        const config = {
            DOCX: { ext: 'docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
            TXT: { ext: 'txt', mime: 'text/plain' },
            MD: { ext: 'md', mime: 'text/markdown' }
        }[format];

        // Setup ignore patterns
        const ig = ignore();
        const gitignorePath = path.join(rootPath, '.gitignore');
        if (fs.existsSync(gitignorePath)) {
            const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
            ig.add(gitignoreContent.split(/\r?\n/));
        }

        // File collection with filtering
        const getAllFiles = function(dirPath, arrayOfFiles = []) {
            const files = fs.readdirSync(dirPath);
            files.forEach(file => {
                const fullPath = path.join(dirPath, file);
                if (fs.statSync(fullPath).isDirectory()) {
                    getAllFiles(fullPath, arrayOfFiles);
                } else {
                    const relativePath = path.relative(rootPath, fullPath);
                    if (!ig.ignores(relativePath) && /\.(js|ts|py|java|html|css|json|md|txt)$/i.test(fullPath)) {
                        arrayOfFiles.push(fullPath);
                    }
                }
            });
            return arrayOfFiles;
        };

        const files = getAllFiles(rootPath);

        // Generate format-specific content
        let content;
        switch(format) {
            case 'DOCX':
                content = new Document({
                    creator: "Project Code Exporter",
                    title: "Exported Project Code",
                    sections: files.map(file => ({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({ 
                                        text: `File: ${path.relative(rootPath, file)}`, 
                                        bold: true 
                                    })
                                ],
                            }),
                            ...fs.readFileSync(file, 'utf8')
                                .split(/\r?\n/)
                                .map(line => new Paragraph({ 
                                    children: [new TextRun(line)] 
                                }))
                        ]
                    }))
                });
                break;

            case 'TXT':
                content = files.map(file => 
                    `=== ${path.relative(rootPath, file)} ===\n` +
                    fs.readFileSync(file, 'utf8')
                ).join('\n\n');
                break;

            case 'MD':
                content = files.map(file => 
                    `## \`${path.relative(rootPath, file)}\`\n` +
                    '```\n' +
                    fs.readFileSync(file, 'utf8') +
                    '\n```'
                ).join('\n\n');
                break;
        }

        // Write output file
        const outputPath = path.join(rootPath, `ProjectCode.${config.ext}`);
        
        if (format === 'DOCX') {
            const buffer = await Packer.toBuffer(content);
            fs.writeFileSync(outputPath, buffer);
        } else {
            fs.writeFileSync(outputPath, content);
        }

        vscode.window.showInformationMessage(
            update ? `ProjectCode.${config.ext} updated!` 
                   : `Project code exported to ProjectCode.${config.ext}`
        );
    }

    // Register commands
    const disposableExport = vscode.commands.registerCommand('codeExporter.generate', () => exportProjectCode(false));
    const disposableUpdate = vscode.commands.registerCommand('codeExporter.update', () => exportProjectCode(true));

    context.subscriptions.push(disposableExport, disposableUpdate);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};