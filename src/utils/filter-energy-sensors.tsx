import { Asset } from "../services/companyService";

export const filterEnergySensors = (items: Asset[]): Asset[] => {
    const findEnergySensors = (item: Asset, path: Asset[] = []): Asset | null => {
        const currentPath = [...path, item];

        const isEnergySensor = item.sensorType === "energy";

        let childMatches: Asset[] = [];
        if (item.children && item.children.length > 0) {
            item.children.forEach(child => {
                const childMatch = findEnergySensors(child, currentPath);
                if (childMatch) {
                    childMatches.push(childMatch);
                }
            });
        }

        if (isEnergySensor || childMatches.length > 0) {
            const matchItem: Asset = { ...item };
            if (childMatches.length > 0) {
                matchItem.children = childMatches;
            }
            return matchItem;
        }

        return null;
    };

    return items.map(item => findEnergySensors(item)).filter((item): item is Asset => item !== null);
};