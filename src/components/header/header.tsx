import brand from '../../assets/logo_TRACTIAN.svg'
import gold from '../../assets/gold.svg'
import './header.scss'

export const Header = () => {
    return (
        <header className="content-header">
            <img src={brand} alt="brand" />
            <div className='d-flex gap-sm'>
                <button className='btn-header selected'>
                    <img src={gold} alt="icon" />
                    Apex Unit
                </button>
                <button className='btn-header'>
                    <img src={gold} alt="icon" />
                    Tobias Unit
                </button>
                <button className='btn-header'>
                    <img src={gold} alt="icon" />
                    Jaguar Unit
                </button>
            </div>
        </header>
    )
}
