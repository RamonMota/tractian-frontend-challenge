import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Asset, Company, CompanyLocation, getCompanies, getCompanyAssets, getCompanyLocations } from '../../services/companyService';
import { Collapse } from 'react-collapse';
import locationIcon from '../../assets/location.svg'
import boxIcon from '../../assets/cubeOutline.svg'
import smallBoxIcon from '../../assets/codepen.svg'
import boltIcon from '../../assets/bolt.svg'
import ellipseRedIcon from '../../assets/ellipseRed.svg'
import ellipseGreenIcon from '../../assets/ellipseGreen.svg'

import './list-items.scss'
import { mergeLocationAssets, refactorAsset, refactorLocations } from '../../services/treeViewBuild';
import { Search } from '../search/search';
import { searchInHierarchy } from '../../utils/searchIn-hierarchy';


export const ListItems = () => {

    const [selectedCompany, setSelectedCompany] = useState<number | string>("");
    const [locations, setLocations] = useState<CompanyLocation[]>([]);
    const [asset, setAsset] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(false);
    const [resultSearch, setResultSearch] = useState<Asset[]>([]);

    const refactoredLocations = refactorLocations(locations);
    const refactoredAsset = refactorAsset(asset);
    const combinedArray = [...refactoredLocations, ...refactoredAsset]
    const assetWithLocation = mergeLocationAssets(combinedArray);
    const [openItems, setOpenItems] = useState({});

    useEffect(() => {
        async function fetchCompanies() {
            const data = await getCompanies();
            if (data.length > 0) setSelectedCompany(data[0].id);
        }
        fetchCompanies();
    }, []);

    useEffect(() => {
        if (selectedCompany !== "") {
            setLoading(true);
            getCompanyLocations(selectedCompany)
                .then(setLocations)
                .finally(() => setLoading(false));
            getCompanyAssets(selectedCompany)
                .then(setAsset)
                .finally(() => setLoading(false));
        }
    }, [selectedCompany]);

    const handleCorrectIcon = (item) => {
        if (item.status !== null && item.sensorType) {
            return smallBoxIcon
        }
        else if (item.children[0]?.parentId && item.children[0]?.sensorType && item.children[0]?.status) {
            return boxIcon
        }
        else return locationIcon
    }

    const handleCorrecStatusIcon = (item) => {
        if (item.sensorType === "energy") {
            return boltIcon
        } else if (item.sensorType === "vibration") {
            return ellipseGreenIcon
        }
    }

    const toggleCollapse = (id) => {
        setOpenItems((prevOpenItems) => ({
            ...prevOpenItems,
            [id]: !prevOpenItems[id],
        }));
    };

    const renderLocation = (location) => {
        const hasChildren = location.children && location.children.length > 0
        const isOpen = openItems[location.id] || false;

        return (
            <li key={location.id}>
                <a className='content-item' onClick={() => toggleCollapse(location.id)}>
                    {hasChildren &&
                        <svg className={isOpen ? 'rotate-open' : ''} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M9.15167 2.14294H8.31461C8.25769 2.14294 8.20412 2.17085 8.17064 2.21661L4.99988 6.58714L1.82912 2.21661C1.79564 2.17085 1.74207 2.14294 1.68515 2.14294H0.848094C0.775549 2.14294 0.733139 2.22553 0.775549 2.28469L4.71082 7.70991C4.85367 7.90634 5.14608 7.90634 5.28783 7.70991L9.22309 2.28469C9.26662 2.22553 9.22421 2.14294 9.15167 2.14294Z" />
                        </svg>
                    }
                    <div className='d-flex align-items-center gap-xs'>
                        <img src={handleCorrectIcon(location)} alt="icon" />
                        <p>{location.name.toUpperCase()}</p>
                        {handleCorrecStatusIcon(location) &&
                            <img src={handleCorrecStatusIcon(location)} alt="icon status" />
                        }
                    </div>
                </a>

                {hasChildren && (
                    <Collapse isOpened={isOpen}>
                        <ul className='content-item-children'>
                            {location.children.map((child) => renderLocation(child))}
                        </ul>
                    </Collapse>
                )}
            </li>
        );
    };

    const handleSearchResult = (search: string) => {
        const filtered = searchInHierarchy(assetWithLocation, search)
        setResultSearch(filtered)
        if (search === '') {
            setOpenItems({})
        }
    }

    return (
        <>
            <Search handleSearch={(search) => handleSearchResult(search)} />
            <ul className='content-list-items'>
                {assetWithLocation.length > 0 ?
                    <>
                        {resultSearch.length > 0 ?
                            <>
                                {resultSearch.sort((a, b) => (b.children?.length || 0) - (a.children?.length || 0))
                                    .map((location) => renderLocation(location))
                                }
                            </>
                            :
                            <>
                                {assetWithLocation.sort((a, b) => (b.children?.length || 0) - (a.children?.length || 0))
                                    .map((location) => renderLocation(location))
                                }
                            </>
                        }
                    </>
                    :
                    [...Array(15)].map((_, i) => (
                        <div className='skelleton-list' key={i} />
                    ))
                }
            </ul>
        </>
    );
}
