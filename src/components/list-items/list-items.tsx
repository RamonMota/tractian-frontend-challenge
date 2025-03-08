import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Asset, Company, CompanyLocation, getCompanies, getCompanyAssets, getCompanyLocations } from '../../services/companyService';
import { Collapse } from 'react-collapse';


export const ListItems = () => {

    const [companies, setCompanies] = useState<Company[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<number | string>("");
    const [locations, setLocations] = useState<CompanyLocation[]>([]);
    const [asset, setAsset] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setisOpen] = useState(false);

    useEffect(() => {
        async function fetchCompanies() {
            const data = await getCompanies();
            setCompanies(data);
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

    /* eslint-disable no-console */
     console.log('asset', asset);

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="company-select">Selecione uma empresa:</label>
                <select
                    id="company-select"
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                >
                    <option value="">Selecione...</option>
                    {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                            {company.name}
                        </option>
                    ))}
                </select>
            </div>
            <span onClick={() => setisOpen(!isOpen)}>TESTE</span>

            <Collapse isOpened={isOpen}>
                {locations.map((location) => (
                    <div key={location.id}>
                        {location.name}
                    </div>
                ))}
            </Collapse>
        </div >
    );
}