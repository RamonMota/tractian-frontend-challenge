import { Header } from '../../components/header/header'
import { Search } from '../../components/search/search'
import IconBolt from '../../assets/Icon-bolt.svg'
import IconI from '../../assets/Icon-i.svg'
import './default.scss'
import { ListItems } from '../../components/list-items/list-items'
import { Product } from '../../components/product/product'

export const Default = () => {
  return (
    <div className='content-page'>
      <Header />
      <div className='content-center'>
        <div className='d-flex align-items-center justify-content-between'>
          <h2 className='content-breadcrumb'><b>Ativos</b> / Apex Unit</h2>
          <div className='d-flex align-items-center gap-xs'>
            <button className='btn-outline'>
              <img src={IconBolt} alt="icon" />
              Sensor de Energia
            </button>
            <button className='btn-outline'>
              <img src={IconI} alt="icon" />
              Crítico
            </button>
          </div>
        </div>
        <div className='d-flex gap-xs height-in'>
          <div className='content-column left-column'>
            <Search />
            <div className='p-sm'>
              <ListItems />
            </div>
          </div>
          <div className='content-column right-column'>
            <Product/>
          </div>
        </div>
      </div>
    </div>
  )
}
