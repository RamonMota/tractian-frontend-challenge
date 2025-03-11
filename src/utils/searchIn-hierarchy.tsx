import { Asset } from "../services/companyService";

  export const searchInHierarchy = (items: Asset[], searchText: string): Asset[] => {
    if (!searchText || searchText.trim() === '') {
      return items;
    }
    
    const normalizedSearchText = searchText.toLowerCase();
    
    const search = (item: Asset, path: Asset[] = []): Asset | null => {
      const currentPath = [...path, item];
      
      const matchesSearch = item.name && item.name.toLowerCase().includes(normalizedSearchText);
      
      let childMatches: Asset[] = [];
      if (item.children && item.children.length > 0) {
        item.children.forEach(child => {
          const childMatch = search(child, currentPath);
          if (childMatch) {
            childMatches.push(childMatch);
          }
        });
      }
      
      if (matchesSearch || childMatches.length > 0) {
        const matchItem: Asset = { ...item };
        if (childMatches.length > 0) {
          matchItem.children = childMatches;
        }
        
        return matchItem;
      }
      
      return null;
    };
    return items.map(item => search(item)).filter((item): item is Asset => item !== null);
  };
