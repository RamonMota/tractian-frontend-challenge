import { Asset, CompanyLocation } from "./companyService";

export const refactorLocations = (
  locations: CompanyLocation[]
): CompanyLocation[] => {
  const locationMap: Record<string, CompanyLocation> = {};

  locations.forEach((location) => {
    locationMap[location.id] = { ...location, children: [] };
  });

  locations.forEach((location) => {
    if (location.parentId) {
      const parent = locationMap[location.parentId as string];
      if (parent) {
        parent.children?.push(locationMap[location.id]);
      }
    }
  });

  return locations
    .filter((location) => !location.parentId)
    .map((location) => locationMap[location.id]);
};

export const refactorAsset = (assets: Asset[]): Asset[] => {
  const assetMap: { [key: string]: Asset } = {};
  const refactAssetResult: Asset[] = [];

  assets.forEach((asset) => {
    assetMap[asset.id] = { ...asset, children: [] };
  });

  assets.forEach((asset) => {
    if (asset.parentId) {
      const parent = assetMap[asset.parentId];
      if (parent) {
        parent.children?.push(assetMap[asset.id]);
      }
    } else {
      refactAssetResult.push(assetMap[asset.id]);
    }
  });

  return refactAssetResult;
};

export const mergeLocationAssets = (assets: Asset[]): Asset[] => {
  const assetMap = new Map<string, Asset>();

  assets.forEach((asset) => {
    asset.children = asset.children || [];
    assetMap.set(asset.id!, asset);

    asset.children.forEach((child) => {
      child.children = child.children || [];
      assetMap.set(child.id!, child);
    });
  });

  const processedAssets = [...assets];

  const assetsToMove = processedAssets.filter(
    (asset) => asset.locationId && assetMap.has(asset.locationId)
  );

  assetsToMove.forEach((asset) => {
    const parentLocation = assetMap.get(asset.locationId!)!;

    if (!parentLocation.children!.some((child) => child.id === asset.id)) {
      parentLocation.children!.push(asset);
    }
  });

  return processedAssets.filter(
    (asset) => !asset.locationId || !assetMap.has(asset.locationId)
  );
};
