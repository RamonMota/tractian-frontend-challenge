import brand from '../../assets/logo_TRACTIAN.svg'
import gold from '../../assets/gold.svg'
import './header.scss'
import { useEffect, useState } from 'react';
import { getCompanies, ICompany } from '../../services/companyService';
import { useCompany } from '../../context/companyContext';
import { useFilterAssetContext } from '../../context/FilterAssetContext';

export const Header = () => {
    const [companyList, setCompanyList] = useState<ICompany[]>([])
    const { company, setCompany } = useCompany();
    const { setFilter } = useFilterAssetContext();


    useEffect(() => {
        async function fetchCompanies() {
            const data = await getCompanies();
            setCompanyList(data)
            setCompany(data[0])
        }
        fetchCompanies();
    }, []);

    const handleChangeCompane = (comp: ICompany) => {
        setCompany(comp)
        setFilter('')
    }

    return (
        <header className="content-header">
            <img src={brand} alt="brand" />
            <div className='d-flex gap-sm'>
                {companyList?.length > 0 ?
                    companyList.map((comp, i) => (
                        <button
                            key={comp.id}
                            onClick={() => handleChangeCompane(comp)}
                            className={`btn-header ${comp.id === company?.id ? 'selected' : ''}`}>
                            <img src={gold} alt="icon" />
                            {comp.name} Unit
                        </button>
                    ))
                    :
                    [...Array(3)].map((_, i) => <div className='skelleton-button' key={i} />)
                }
            </div>
        </header>
    )
}
