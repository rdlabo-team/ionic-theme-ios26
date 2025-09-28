const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, 'src');
const outDir = path.resolve(__dirname, 'dist/css');

// 出力先ディレクトリがなければ作る
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// src ディレクトリの .scss ファイルを取得
const scssFiles = fs.readdirSync(srcDir).filter(f => f.endsWith('.scss'));

scssFiles.forEach(file => {
  const srcPath = path.join(srcDir, file);
  const fileName = path.basename(file, '.scss');
  const outPath = path.join(outDir, `${fileName}.min.css`);

  console.log(`Building ${srcPath} → ${outPath}`);
  execSync(`npx sass ${srcPath} ${outPath} --style=compressed`, { stdio: 'inherit' });
});

console.log('All SCSS files compiled successfully!');
