import { useState } from "react"
import './search.scss'
import iconSearch from '../../assets/search.svg'

export const Search = () => {
    const [inputSearch, serInputSearch] = useState<string>('')

    return (
        <div className="content-search">
            <input
                onChange={(e) => serInputSearch(e.target.value)}
                value={inputSearch}
                placeholder='Buscar Ativo ou Local'
                type="text"
            />
            <img className="icon-search" src={iconSearch} alt=" icon" />
        </div>
    )
}
