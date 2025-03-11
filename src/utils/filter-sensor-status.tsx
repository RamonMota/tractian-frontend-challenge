import { FilterItens } from "../enum/enum";
import { Asset } from "../services/companyService";


export const filterAssets = (items: Asset[], predicate: (item: Asset) => boolean): Asset[] => {
    const findMatchingAssets = (item: Asset): Asset | null => {
        const matches = predicate(item);
        
        let childMatches: Asset[] = [];
        if (item.children && item.children.length > 0) {
            item.children.forEach(child => {
                const childMatch = findMatchingAssets(child);
                if (childMatch) {
                    childMatches.push(childMatch);
                }
            });
        }

        if (matches || childMatches.length > 0) {
            const matchItem: Asset = { ...item };
            if (childMatches.length > 0) {
                matchItem.children = childMatches;
            }
            return matchItem;
        }

        return null;
    };

    return items.map(findMatchingAssets).filter((item): item is Asset => item !== null);
};

// Uso específico
export const filterEnergySensors = (items: Asset[]): Asset[] => 
    filterAssets(items, item => item.sensorType === FilterItens.ENERGY);

export const filterCriticalStatus = (items: Asset[]): Asset[] => 
    filterAssets(items, item => item.status === FilterItens.ALERT);