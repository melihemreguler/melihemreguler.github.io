/**
 * Replaces placeholders in translation strings with dynamic values
 * @param text - The translation text with placeholders
 * @param variables - Object containing variable values
 * @returns Processed text with replaced placeholders
 */
export const interpolateTranslation = (text: string, variables: Record<string, string | number> = {}): string => {
  let result = text;
  
  // Replace {{year}} with current year
  result = result.replace(/\{\{year\}\}/g, new Date().getFullYear().toString());
  
  // Replace other variables if provided
  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    result = result.replace(placeholder, value.toString());
  });
  
  return result;
};

/**
 * Get the current year
 * @returns Current year as string
 */
export const getCurrentYear = (): string => {
  return new Date().getFullYear().toString();
};
