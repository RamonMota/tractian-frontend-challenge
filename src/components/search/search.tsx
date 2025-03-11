import { useState } from "react"
import './search.scss'
import iconSearch from '../../assets/search.svg'

export const Search = (props: {
    handleSearch: (name) => void
}) => {
    const [inputSearch, serInputSearch] = useState<string>('')

    const handleInputSearch = (e) => {
        props.handleSearch(e);
        serInputSearch(e)
    };

    return (
        <div className="content-search">
            <input
                onChange={(e) => handleInputSearch(e.target.value)}
                value={inputSearch}
                placeholder='Buscar Ativo ou Local'
                type="text"
            />
            <img className="icon-search" src={iconSearch} alt=" icon" />
        </div>
    )
}
