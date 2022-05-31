import { Button, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import { GatewayContext } from '../../context/GatewayContext'
import axios from 'axios'

export const AddDeviceModal = ({ show, handleClose, gatewayId }) => {
  const [uid, setUid] = useState(1)
  const [vendor, setVendor] = useState('')
  const [status, setStatus] = useState(false)
  const [save, setSave] = useState(false)

  const { gateways, onGatewaysChange, showAlert, setAlertMessage, setIsError } = useContext(GatewayContext)

  const handleSubmit = e => {
    setSave(true)
    e.preventDefault()
    addDeviceToGateway({ uid, vendor, status })
  }

  useEffect(() => {
    if (show) {
      setUid(1)
      setVendor('')
      setStatus(false)
    }
  }, [show])

  const addDeviceToGateway = async ({ uid, vendor, status: statusDevice }) => {
    try {
      const { data, status } = await axios.request({
        data: {
          uid,
          vendor,
          status: statusDevice
        },
        method: 'POST',
        url: `https://musalasoft-interview-backend.vercel.app/api/v1/devices/${gatewayId}/create`
      })

      if (status === 201) {
        const newGateway = [...gateways]
        newGateway.find(gateway => gateway._id === gatewayId).devices.push(data)
        onGatewaysChange(newGateway)
        setSave(false)
        handleClose()
        setIsError(false)
        setAlertMessage('Successfully Device Created')
        showAlert()
      }
    } catch (error) {
      console.error(error)
      setSave(false)
      handleClose()
      setIsError(true)
      setAlertMessage(error.response.data.message)
      showAlert()
    }
  }

  return (
    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Add Device to Gateway</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>UID</label>
            <input
              type='number'
              value={uid}
              onChange={({ target }) => setUid(+target.value)}
              placeholder='UID'
              min='1'
              className='form-control'
              aria-describedby='deviceHelp'
              autoComplete='off'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Vendor</label>
            <input
              type='text'
              value={vendor}
              onChange={({ target }) => setVendor(target.value)}
              placeholder='Name'
              className='form-control'
              aria-describedby='vendorHelp'
              autoComplete='off'
              required
            />
            <div className={vendor.length < 2 ? '' : 'd-none'}>
              <p className='text-danger my-2'>Must be at least 2 chars long.</p>
            </div>
          </div>
          <div className='mb-3'>
            <label className='form-label'>Status</label>
            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                value={status ? 1 : 0}
                onChange={() => setStatus(!status)}
                aria-describedby='statusHelp'
              />
              <label className='form-check-label'>{status ? 'ONLINE' : 'OFFLINE'}</label>
            </div>
          </div>
          <div className='d-flex justify-content-end'>
            <Button className='mx-2' variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' type='submit' disabled={vendor.length < 2}>
              {!save
                ? (
                <div>Save</div>
                  )
                : (
                <div>
                  <span className='spinner-border spinner-border-sm mx-1' role='status' aria-hidden='true'></span>
                  Loading...
                </div>
                  )}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}
AddDeviceModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  gatewayId: PropTypes.string.isRequired
}
