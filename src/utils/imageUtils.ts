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

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      const allFolders = await getImageFolders();
      // Filter out folders with no images (e.g., those with only HEIC files)
      this.folders = allFolders.filter(folder => folder.images.length > 0);
      this.isInitialized = true;
      
      if (this.folders.length > 0) {
        // Disable initial preloading to reduce browser load
        // this.preloadRandomImages(1);
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
    if (this.preloadedImages.has(imagePath)) return;
    
    const img = new Image();
    
    // Set timeout for large images
    const timeout = setTimeout(() => {
      console.warn(`Preload timeout for image: ${imagePath}`);
    }, 10000); // 10 second timeout
    
    img.onload = () => {
      clearTimeout(timeout);
      this.preloadedImages.add(imagePath);
      console.log(`Successfully preloaded: ${imagePath}`);
    };
    
    img.onerror = (error) => {
      clearTimeout(timeout);
      console.warn(`Failed to preload image: ${imagePath}`, error);
    };
    
    // Add crossOrigin attribute for better compatibility
    img.crossOrigin = 'anonymous';
    img.src = imagePath;
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
      
      setTimeout(() => {
        const nextImage = this.getRandomImagePath();
        if (nextImage && nextImage !== imagePath) {
          this.preloadImage(nextImage);
        }
      }, 2500);
    }
    
    return imagePath;
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
}
