const fs = require('fs');
const path = require('path');

function getImageExtensions() {
  return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
}

function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return getImageExtensions().includes(ext);
}

function scanDirectory(dirPath, baseAssetsPath) {
  const folders = [];

  try {
    const items = fs.readdirSync(dirPath);
    const images = [];
    const subDirectories = [];

    items.forEach(item => {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isFile() && isImageFile(item)) {
        images.push(item);
      } else if (stat.isDirectory()) {
        subDirectories.push(item);
      }
    });

    if (images.length > 0) {
      const relativePath = path.relative(baseAssetsPath, dirPath).replace(/\\/g, '/');
      folders.push({
        path: relativePath === '' ? 'assets' : `assets/${relativePath}`,
        images
      });
    }

    subDirectories.forEach(subDir => {
      const subDirPath = path.join(dirPath, subDir);
      const subFolders = scanDirectory(subDirPath, baseAssetsPath);
      folders.push(...subFolders);
    });

  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
  }

  return folders;
}

function generateImageManifest() {
  const publicPath = path.join(process.cwd(), 'public');
  const assetsPath = path.join(publicPath, 'assets');

  console.log('Scanning assets directory:', assetsPath);

  if (!fs.existsSync(assetsPath)) {
    console.error('Assets directory not found at:', assetsPath);
    process.exit(1);
  }

  const folders = scanDirectory(assetsPath, assetsPath);
  const validFolders = folders.filter(folder => folder.images.length > 0);

  const manifest = {
    success: true,
    folders: validFolders,
    totalFolders: validFolders.length,
    totalImages: validFolders.reduce((total, folder) => total + folder.images.length, 0),
    generatedAt: new Date().toISOString()
  };

  const outputPath = path.join(publicPath, 'image-manifest.json');
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));

  console.log(`Generated image manifest with ${manifest.totalFolders} folders and ${manifest.totalImages} images`);
  console.log(`Output: ${outputPath}`);
}

generateImageManifest();
