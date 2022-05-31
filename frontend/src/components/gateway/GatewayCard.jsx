import { DeviceCard } from './DeviceCard'
import PropTypes from 'prop-types'
import axios from 'axios'
import { GatewayContext } from '../../context/GatewayContext'
import { useContext, useEffect, useState } from 'react'
import { AddDeviceModal } from '../shared/AddDeviceModal'
import { DeviceContext } from '../../context/DeviceContext'

export const GatewayCard = ({ gateway }) => {
  const [showModal, setShowModal] = useState(false)
  const [gatewayDevices, setGatewayDevices] = useState([])

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  const { _id, serial, name, ipv4, devices } = gateway

  useEffect(() => {
    setGatewayDevices(devices)
  }, [devices])

  const { gateways, onGatewaysChange } = useContext(GatewayContext)

  const deleteGateway = async () => {
    try {
      const { data, status } = await axios.delete(`https://musalasoft-interview-backend.vercel.app/api/v1/gateways/${_id}`)

      if (status === 200) {
        const newGateways = gateways.filter(gateway => gateway._id !== data._id)

        onGatewaysChange(newGateways)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className='card mb-4'>
      <div className='card-header d-flex justify-content-between align-items-center bg-dark'>
        <div>
          <span className='badge bg-primary'>GATEWAY</span>
        </div>
        <div>
          {/* <button type='button' className='btn btn-primary btn-sm mx-1'>
            Edit
          </button> */}
          <button type='button' className='btn btn-danger btn-sm mx-1' onClick={() => deleteGateway()}>
            Delete
          </button>
        </div>
      </div>
      <div className='card-body'>
        <div className='d-flex justify-content-around align-items-center'>
          <p>
            <span className='badge bg-secondary'>SERIAL #</span> {serial}
          </p>

          <p>
            <span className='badge bg-secondary'>NAME</span> {name}
          </p>

          <p>
            <span className='badge bg-secondary'>IPv4</span> {ipv4}
          </p>
        </div>
        <DeviceContext.Provider value={{ gatewayDevices, setGatewayDevices }}>
          <div className='card'>
            <div className='card-header'>
              <span className='badge bg-dark'>Devices {gatewayDevices.length}/10</span>
              <button
                type='button'
                className='btn btn-secondary btn-sm mx-1'
                disabled={gatewayDevices.length === 10}
                onClick={handleShow}
              >
                Add
              </button>
            </div>
            <div className='card-body'>
              <div className='row'>
                {gatewayDevices.map(device => (
                  <DeviceCard key={device._id} device={device} gatewayId={_id} />
                ))}
              </div>
            </div>
          </div>
          <AddDeviceModal gatewayId={_id} show={showModal} handleClose={handleClose} />
        </DeviceContext.Provider>
      </div>
    </div>
  )
}

GatewayCard.propTypes = {
  gateway: PropTypes.object.isRequired
}
