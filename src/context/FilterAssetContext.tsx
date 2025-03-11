import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ICompany } from '../services/companyService';


interface FilterAssetContextData {
    filter: string;
    setFilter: (filter: string) => void;
}

const FilterAssetContext = createContext<FilterAssetContextData | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
    const [filter, setFilter] = useState<string>('');

    return (
        <FilterAssetContext.Provider value={{ filter, setFilter }}>
            {children}
        </FilterAssetContext.Provider>
    );
};

export const useFilterAssetContext = () => {
    const context = useContext(FilterAssetContext);
    if (!context) throw new Error('useFilterAssetContext must be used within a FilterProvider');
    return context;
};