import PropTypes from 'prop-types'
import { useState } from 'react'
import { AddGatewayModal } from '../shared/AddGatewayModal'

export const DashboardCard = ({ gatewayTotal, deviceTotal }) => {
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  return (
    <div className='row'>
      <div className='col-lg-6 col-ms-6'>
        <div className='d-flex justify-content-around align-items-center card-counter primary'>
          <i className='bi bi-hdd-rack-fill'></i>
          <div className='d-flex flex-column align-items-center'>
            <span className='count-numbers'>{gatewayTotal}</span>
            <span className='count-name'>Gateways</span>
          </div>
        </div>
      </div>

      <div className='col-lg-6 col-ms-6'>
        <div className='d-flex justify-content-around align-items-center card-counter success'>
          <i className='bi bi-pc'></i>
          <div className='d-flex flex-column align-items-center'>
            <span className='count-numbers'>{deviceTotal}</span>
            <span className='count-name'>Devices</span>
          </div>
        </div>
      </div>
      <div className='col-lg-6 col-ms-6'>
        <button type='button' className='btn btn-primary btn-sm mx-1' onClick={handleShow}>
          Add Gateway
        </button>
      </div>
      <AddGatewayModal show={showModal} handleClose={handleClose} />
    </div>
  )
}

DashboardCard.propTypes = {
  gatewayTotal: PropTypes.number.isRequired,
  deviceTotal: PropTypes.number.isRequired
}
