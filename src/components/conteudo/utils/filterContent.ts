
import { ContentItem, categoryTypeMap } from '../types';

export const filterContent = (
  contentItems: ContentItem[], 
  selectedCategory: string
): ContentItem[] => {
  return contentItems.filter(item => 
    categoryTypeMap[selectedCategory]?.includes(item.type)
  );
};
