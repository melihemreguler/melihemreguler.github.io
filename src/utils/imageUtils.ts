export interface ImageFolder {
  path: string;
  images: string[];
}

// Function to get all image folders and their contents from API
export const getImageFolders = async (): Promise<ImageFolder[]> => {
  try {
    console.log('Fetching image folders from API...'); // Debug log
    const response = await fetch('/api/images');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API response:', data); // Debug log
    
    if (data.success) {
      return data.folders;
    } else {
      console.error('Failed to fetch image folders:', data.error);
      return getFallbackImageFolders();
    }
  } catch (error) {
    console.error('Error fetching image folders:', error);
    return getFallbackImageFolders();
  }
};

// Fallback function with hardcoded images (as backup)
const getFallbackImageFolders = (): ImageFolder[] => {
  return [
    
  ];
};

// Random image selection algorithm
export class RandomImageSelector {
  private folders: ImageFolder[] = [];
  private lastSelectedFolderIndex: number = -1;
  private recentImages: string[] = []; // Keep track of last few images
  private maxRecentImages: number = 3; // Remember last 3 images
  private isInitialized: boolean = false;
  private preloadedImages: Set<string> = new Set();
  private preloadQueue: string[] = [];
  private loadingImages: Set<string> = new Set();

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      const allFolders = await getImageFolders();
      // Filter out folders with no images (e.g., those with only HEIC files)
      this.folders = allFolders.filter(folder => folder.images.length > 0);
      this.isInitialized = true;
      
      if (this.folders.length > 0) {
        // Preload first 5 images immediately for smoother start (increased from 3)
        this.preloadRandomImages(5);
        console.log(`Image selector initialized with ${this.folders.length} folders and ${this.getTotalImageCount()} total images`);
        console.log('Available folders:', this.folders.map(f => `${f.path} (${f.images.length} images)`));
      } else {
        console.warn('No folders with web-supported images found');
      }
    } catch (error) {
      console.error('Failed to initialize image selector:', error);
      const fallbackFolders = getFallbackImageFolders();
      this.folders = fallbackFolders.filter(folder => folder.images.length > 0);
      this.isInitialized = true;
    }
  }

  private preloadRandomImages(count: number): void {
    for (let i = 0; i < count && i < this.getTotalImageCount(); i++) {
      const imagePath = this.getRandomImagePath();
      if (imagePath) {
        this.preloadImage(imagePath);
      }
    }
  }

  private preloadImage(imagePath: string): void {
    if (this.preloadedImages.has(imagePath) || this.loadingImages.has(imagePath)) return;
    
    this.loadingImages.add(imagePath);
    const img = new Image();
    
    // Set timeout for slow connections (reduced for faster fallback)
    const timeout = setTimeout(() => {
      this.loadingImages.delete(imagePath);
      console.warn(`Preload timeout for image: ${imagePath}`);
    }, 6000); // 6 second timeout instead of 8
    
    img.onload = () => {
      clearTimeout(timeout);
      this.loadingImages.delete(imagePath);
      this.preloadedImages.add(imagePath);
      console.log(`Successfully preloaded: ${imagePath}`);
    };
    
    img.onerror = (error) => {
      clearTimeout(timeout);
      this.loadingImages.delete(imagePath);
      console.warn(`Failed to preload image: ${imagePath}`, error);
    };
    
    // Add cache headers for better performance
    img.crossOrigin = 'anonymous';
    // Add cache buster only in development
    const isDev = process.env.NODE_ENV === 'development';
    img.src = isDev ? `${imagePath}?t=${Date.now()}` : imagePath;
  }

  private getRandomImagePath(): string | null {
    if (!this.isInitialized || this.folders.length === 0) {
      return null;
    }

    let imagePath: string | null = null;
    let attempts = 0;
    const maxAttempts = 20; // Prevent infinite loop

    // Keep trying until we get a different image than recent ones
    do {
      // Select a different folder than the last one (if possible)
      let folderIndex: number;
      
      if (this.folders.length === 1) {
        folderIndex = 0;
      } else {
        do {
          folderIndex = Math.floor(Math.random() * this.folders.length);
        } while (folderIndex === this.lastSelectedFolderIndex && this.folders.length > 1);
      }

      this.lastSelectedFolderIndex = folderIndex;
      const selectedFolder = this.folders[folderIndex];
      
      // Select a random image from the selected folder
      const imageIndex = Math.floor(Math.random() * selectedFolder.images.length);
      const selectedImage = selectedFolder.images[imageIndex];
      
      imagePath = `/${selectedFolder.path}/${selectedImage}`;
      attempts++;
      
    } while (this.recentImages.includes(imagePath!) && attempts < maxAttempts);
    
    // Update the recent images list
    if (imagePath) {
      this.recentImages.push(imagePath);
      // Keep only the last few images
      if (this.recentImages.length > this.maxRecentImages) {
        this.recentImages.shift(); // Remove the oldest
      }
    }
    
    return imagePath;
  }

  getRandomImage(): string | null {
    const imagePath = this.getRandomImagePath();
    
    // Debug: Log which image is selected
    if (imagePath) {
      console.log(`Selected image: ${imagePath}`);
      console.log('Recent images:', this.recentImages);
      
      // More aggressive preloading: preload next 3 images in advance
      setTimeout(() => {
        for (let i = 0; i < 3; i++) {
          const nextImage = this.getRandomImagePath();
          if (nextImage && nextImage !== imagePath && !this.preloadedImages.has(nextImage)) {
            this.preloadImage(nextImage);
          }
        }
      }, 500); // Start preloading faster
    }
    
    return imagePath;
  }

  // Check if an image is ready to display
  isImageReady(imagePath: string): boolean {
    return this.preloadedImages.has(imagePath);
  }

  // Get a ready image (preloaded) or fallback to any available
  getReadyImage(): string | null {
    // First try to get a preloaded image
    const imagePath = this.getRandomImagePath();
    if (imagePath && this.preloadedImages.has(imagePath)) {
      return imagePath;
    }

    // If no preloaded image available, get any random image
    return this.getRandomImagePath();
  }

  // Get first available image for immediate loading (no randomization)
  getFirstAvailableImage(): string | null {
    if (!this.isInitialized || this.folders.length === 0) {
      return null;
    }
    
    // Get first folder with images
    const firstFolder = this.folders[0];
    if (firstFolder && firstFolder.images.length > 0) {
      const imagePath = `/${firstFolder.path}/${firstFolder.images[0]}`;
      console.log(`First available image: ${imagePath}`);
      
      // Preload this image immediately
      this.preloadImage(imagePath);
      
      return imagePath;
    }
    
    return null;
  }

  getFolderCount(): number {
    return this.folders.length;
  }

  getTotalImageCount(): number {
    return this.folders.reduce((total, folder) => total + folder.images.length, 0);
  }

  getLoadedImageCount(): number {
    return this.preloadedImages.size;
  }

  // Get available preloaded images count for debugging
  getPreloadedCount(): number {
    return this.preloadedImages.size;
  }

  // Get loading images count for debugging  
  getLoadingCount(): number {
    return this.loadingImages.size;
  }

  // Force preload specific number of images
  forcePreloadImages(count: number): void {
    let preloaded = 0;
    let attempts = 0;
    const maxAttempts = count * 3;
    
    while (preloaded < count && attempts < maxAttempts) {
      const imagePath = this.getRandomImagePath();
      if (imagePath && !this.preloadedImages.has(imagePath) && !this.loadingImages.has(imagePath)) {
        this.preloadImage(imagePath);
        preloaded++;
      }
      attempts++;
    }
    
    console.log(`Force preloading ${preloaded} images`);
  }
}
