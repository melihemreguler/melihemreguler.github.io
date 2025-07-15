import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface ImageFolder {
  path: string;
  images: string[];
}

function getImageExtensions(): string[] {
  // Only include web-supported image formats
  return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
}

function isImageFile(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase();
  return getImageExtensions().includes(ext);
}

function scanDirectory(dirPath: string, baseAssetsPath: string): ImageFolder[] {
  const folders: ImageFolder[] = [];
  
  try {
    const items = fs.readdirSync(dirPath);
    const images: string[] = [];
    const subDirectories: string[] = [];
    
    // Separate files and directories
    items.forEach(item => {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isFile() && isImageFile(item)) {
        images.push(item);
      } else if (stat.isDirectory()) {
        subDirectories.push(item);
      }
    });
    
    // If current directory has images, add it as a folder
    if (images.length > 0) {
      const relativePath = path.relative(baseAssetsPath, dirPath).replace(/\\/g, '/');
      folders.push({
        path: relativePath === '' ? 'assets' : `assets/${relativePath}`,
        images
      });
    }
    
    // Recursively scan subdirectories
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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Add CORS headers for development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const publicPath = path.join(process.cwd(), 'public');
    const assetsPath = path.join(publicPath, 'assets');
    
    console.log('Looking for assets in:', assetsPath); // Debug log
    
    // Check if assets directory exists
    if (!fs.existsSync(assetsPath)) {
      console.error('Assets directory not found at:', assetsPath);
      return res.status(404).json({ error: 'Assets directory not found' });
    }

    const folders = scanDirectory(assetsPath, assetsPath);
    
    // Filter out folders with no web-supported images
    const validFolders = folders.filter(folder => folder.images.length > 0);
    
    console.log('Found folders:', validFolders.length); // Debug log

    res.status(200).json({
      success: true,
      folders: validFolders,
      totalFolders: validFolders.length,
      totalImages: validFolders.reduce((total, folder) => total + folder.images.length, 0),
      skippedFolders: folders.length - validFolders.length
    });
    
  } catch (error) {
    console.error('Error scanning assets:', error);
    res.status(500).json({ error: 'Failed to scan assets directory', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}
