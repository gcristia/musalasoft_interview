import PropTypes from 'prop-types'
import { useDate } from '../../hooks/useDate'
import axios from 'axios'
import { useContext } from 'react'
import { GatewayContext } from '../../context/GatewayContext'

export const DeviceCard = ({ device, gatewayId }) => {
  const { _id, uid, vendor, status, createdAt } = device
  const { gateways, onGatewaysChange } = useContext(GatewayContext)

  const date = useDate(createdAt)

  const deleteDevice = async () => {
    try {
      const { data, status } = await axios.delete(`https://musalasoft-interview-backned.vercel.app/api/v1/devices/${gatewayId}/device/${_id}`)

      if (status === 200) {
        const newGateway = [...gateways]
        const indexGateway = newGateway.findIndex(gateway => gateway._id === gatewayId)
        const indexDevice = newGateway[indexGateway].devices.findIndex(device => device._id === data._id)

        newGateway[indexGateway].devices.splice(indexDevice, 1)

        onGatewaysChange(newGateway)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className='col-4 py-2'>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>
            <i className='bi bi-info-circle-fill'></i>
          </h5>
          <p>UID : {uid}</p>
          <p>VENDOR : {vendor}</p>
          <p>DATE CREATE: {date}</p>
          <p>STATUS : {status ? 'ONLINE' : 'OFFLINE'}</p>
          {/* <button type='button' className='btn btn-primary btn-sm mx-1'>
            Edit
          </button> */}
          <button type='button' className='btn btn-danger btn-sm mx-1' onClick={deleteDevice}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

DeviceCard.propTypes = {
  device: PropTypes.object.isRequired,
  gatewayId: PropTypes.string.isRequired
}
