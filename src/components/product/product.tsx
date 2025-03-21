import React from 'react'
import './product.scss'
import bolt from '../../assets/bolt.svg'
import sensor from '../../assets/sensor.svg'
import router from '../../assets/outlineRouter.svg'

export const Product = () => {
    return (
        <div className='content-product'>
            <div className='title-product'>
                <h2>MOTOR RT COAL AF01</h2>
                <img src={bolt} alt="icon status" />
            </div>
            <div className='content-description'>
                <div className='d-flex align-items-center gap-md'>
                    <div className='img-description' >
                        <svg xmlns="http://www.w3.org/2000/svg" width="31" height="32" viewBox="0 0 31 32" fill="none">
                            <path d="M30.807 13.2973L30.7988 13.2645L26.1969 1.57095C25.9918 0.910596 25.3807 0.455322 24.6875 0.455322H6.03361C5.33634 0.455322 4.71701 0.918799 4.52013 1.58735L0.217593 13.162L0.205288 13.1907L0.197085 13.2235C0.143765 13.4245 0.127358 13.6295 0.156069 13.8305C0.151968 13.8961 0.147866 13.9618 0.147866 14.0274V29.035C0.148951 29.6961 0.412033 30.3297 0.879467 30.7972C1.3469 31.2646 1.98057 31.5277 2.64162 31.5288H28.3666C29.7406 31.5288 30.8604 30.409 30.8645 29.035V14.0274C30.8645 13.9741 30.8645 13.9208 30.8604 13.8756C30.8768 13.6747 30.8604 13.4819 30.807 13.2973ZM18.6746 11.5336L18.6623 12.1776C18.6295 14.0192 17.358 15.2579 15.5 15.2579C14.5936 15.2579 13.8143 14.9666 13.2524 14.4129C12.6904 13.8592 12.3828 13.0881 12.3664 12.1776L12.3541 11.5336H3.9131L7.17384 3.60532H23.5473L26.8983 11.5336H18.6746ZM3.29376 14.6836H9.74552C10.7422 17.0256 12.8627 18.4079 15.5041 18.4079C16.8863 18.4079 18.1701 18.0223 19.2078 17.2922C20.1184 16.6524 20.8279 15.7583 21.2873 14.6836H27.7063V28.3788H3.29376V14.6836Z" fill="#55A6FF" />
                        </svg>
                        <p>Adicionar imagem do Ativo</p>
                    </div>
                    <div className='d-flex flex-column gap-xl w-100'>
                        <div className='content-text'>
                            <label>Tipo de Equipamento</label>
                            <p>Motor Elétrico (Trifásico)</p>
                        </div>
                        <span className='line-border' />
                        <div className='content-text'>
                            <label>Responsáveis</label>
                            <div className='d-flex align-items-center gap-xs'>
                                <span>E</span>
                                <p>Elétrica</p>
                            </div>
                        </div>
                    </div>
                </div>
                <span className='line-border w-100' />
                <div className='d-flex'>
                    <div className='content-text'>
                        <label>Sensor</label>
                        <div className='d-flex align-items-center gap-xs'>
                            <img src={sensor} alt="icon sensor" />
                            <p>HIO4510</p>
                        </div>
                    </div>
                    <div className='content-text'>
                        <label>Receptor</label>
                        <div className='d-flex align-items-center gap-xs'>
                            <img src={router} alt="icon router" />
                            <p>EUH4R27</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
