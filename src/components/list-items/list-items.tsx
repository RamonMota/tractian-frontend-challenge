import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Asset, CompanyLocation, getCompanyAssets, getCompanyLocations } from '../../services/companyService';
import { Collapse } from 'react-collapse';
import locationIcon from '../../assets/location.svg'
import boxIcon from '../../assets/cubeOutline.svg'
import smallBoxIcon from '../../assets/codepen.svg'
import boltIcon from '../../assets/bolt.svg'
import ellipseGreenIcon from '../../assets/ellipseGreen.svg'
import ellipseRedIcon from '../../assets/ellipseRed.svg'

import './list-items.scss'
import { mergeLocationAssets, refactorAsset, refactorLocations } from '../../services/treeViewBuild';
import { Search } from '../search/search';
import { searchInHierarchy } from '../../utils/searchIn-hierarchy';
import { useCompany } from '../../context/companyContext';

interface IOpenCollapseItems {
    [key: string]: boolean;
}

export const ListItems = () => {
    const { company } = useCompany();
    const [locations, setLocations] = useState<CompanyLocation[]>([]);
    const [asset, setAsset] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(false);
    const [resultSearch, setResultSearch] = useState<Asset[]>([]);

    const refactoredLocations = refactorLocations(locations);
    const refactoredAsset = refactorAsset(asset);
    const combinedArray = [...refactoredLocations, ...refactoredAsset]
    const assetWithLocation = mergeLocationAssets(combinedArray);
    const [openItems, setOpenItems] = useState<IOpenCollapseItems>({});
    const [search, setSearch] = useState<string>()

    useEffect(() => {
        if (search === '') {
            setOpenItems({});
        } else if (search) {

            const filtered = searchInHierarchy(assetWithLocation, search);

            handleOpenItensSearch(filtered)
            setResultSearch(filtered);
        }
    }, [search]);

    useEffect(() => {
        if (company) {
            setLoading(true);
            getCompanyLocations(company.id)
                .then(setLocations)
                .finally(() => setTimeout(() => setLoading(false), 10))
            getCompanyAssets(company.id)
                .then(setAsset)
                .finally(() => setTimeout(() => setLoading(false), 10));
        }
    }, [company]);

    const toggleCollapse = (id: string) => {
        setOpenItems((prevOpenItems) => ({
            ...prevOpenItems,
            [id]: !prevOpenItems[id],
        }));
    };

    const handleCorrectIcon = (item: Asset) => {
        const firstChild = item.children?.[0]
        if (item.status !== null && item.sensorType) {
            return smallBoxIcon
        }
        else if (firstChild?.parentId && firstChild?.sensorType && firstChild?.status) {
            return boxIcon
        }
        else return locationIcon
    }

    const handleCorrecStatusIcon = (item: Asset) => {
        if (item.sensorType === "energy") {
            return boltIcon
        } else if (item.sensorType === "vibration" && item.status === "alert") {
            return ellipseRedIcon
        } else if (item.sensorType === "vibration" && item.status === "operating") {
            return ellipseGreenIcon
        }
    }

    const renderListItems = (itemList: Asset) => {
        const hasChildren = itemList.children && itemList.children.length > 0
        const isOpen = openItems[itemList.id ?? ""] || false

        return (
            <li key={itemList.id}>
                <a className='content-item' onClick={() => toggleCollapse(itemList.id ?? "")}>
                    {hasChildren &&
                        <svg className={isOpen ? 'rotate-open' : ''} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M9.15167 2.14294H8.31461C8.25769 2.14294 8.20412 2.17085 8.17064 2.21661L4.99988 6.58714L1.82912 2.21661C1.79564 2.17085 1.74207 2.14294 1.68515 2.14294H0.848094C0.775549 2.14294 0.733139 2.22553 0.775549 2.28469L4.71082 7.70991C4.85367 7.90634 5.14608 7.90634 5.28783 7.70991L9.22309 2.28469C9.26662 2.22553 9.22421 2.14294 9.15167 2.14294Z" />
                        </svg>
                    }
                    <div className='d-flex align-items-center gap-xs'>
                        <img src={handleCorrectIcon(itemList)} alt="icon" />
                        <p>{itemList.name?.toUpperCase()}</p>
                        {handleCorrecStatusIcon(itemList) &&
                            <img src={handleCorrecStatusIcon(itemList)} alt="icon status" />
                        }
                    </div>
                </a>

                {hasChildren && (
                    <Collapse isOpened={isOpen}>
                        <ul className='content-item-children'>
                            {itemList.children?.map((child) => renderListItems(child))}
                        </ul>
                    </Collapse>
                )}
            </li>
        );
    };

    const handleOpenItensSearch = (itemList: Asset[]) => {
        const newOpenItems: IOpenCollapseItems = {};

        const markOpenItems = (items: Asset[]) => {
            items.forEach(item => {
                if (item.id && item.children?.length) {
                    newOpenItems[item.id] = true;
                    markOpenItems(item.children);
                }
            });
        };

        markOpenItems(itemList);
        setOpenItems(newOpenItems);
    }

    const renderResults = () => {
        if (loading) return [...Array(15)].map((_, i) => <div className='skelleton-list' key={i} />);

        if (search) {
            return resultSearch.length > 0
                ? sortedLocations(resultSearch).map(renderListItems)
                : <p>Nenhum resultado encontrado</p>;
        }

        return sortedLocations(assetWithLocation).map(renderListItems);
    };

    const sortedLocations = (list: Asset[]) =>
        list.sort((a, b) => (b.children?.length || 0) - (a.children?.length || 0));

    return (
        <>
            <Search handleSearch={(search) => setSearch(search)} />
            <ul className='content-list-items'>
                {renderResults()}
            </ul>
        </>
    );
}
