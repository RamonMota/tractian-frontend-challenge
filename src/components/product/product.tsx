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
                <div className='d-flex align-items-center gap-sm'>
                    <img className='img-description' src="" alt="" />
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
