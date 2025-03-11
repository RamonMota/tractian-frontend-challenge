import brand from '../../assets/logo_TRACTIAN.svg'
import gold from '../../assets/gold.svg'
import './header.scss'
import { useEffect, useState } from 'react';
import { getCompanies, ICompany } from '../../services/companyService';
import { useCompany } from '../../context/companyContext';

export const Header = () => {
    const [companyList, setCompanyList] = useState<ICompany[]>([])
    const { company, setCompany } = useCompany();


    useEffect(() => {
        async function fetchCompanies() {
            const data = await getCompanies();
            setCompanyList(data)
            setCompany(data[0])
        }
        fetchCompanies();
    }, []);

    /* eslint-disable no-console */
     console.log('company', company);

    return (
        <header className="content-header">
            <img src={brand} alt="brand" />
            <div className='d-flex gap-sm'>
                {companyList?.length > 0 ?
                    companyList.map((comp, i) => (
                        <button
                            key={comp.id}
                            onClick={() => setCompany(comp)}
                            className={`btn-header ${comp.id === company?.id ? 'selected' : '' }`}>
                            <img src={gold} alt="icon" />
                            {comp.name} Unit
                        </button>
                    ))
                    :
                    <p>Carregando</p>
                }
            </div>
        </header>
    )
}
