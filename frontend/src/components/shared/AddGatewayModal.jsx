import { Button, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { GatewayContext } from '../../context/GatewayContext'

export const AddGatewayModal = ({ show, handleClose }) => {
  const [serial, setSerial] = useState('')
  const [ipv4, setIpv4] = useState('')
  const [name, setName] = useState('')
  const [save, setSave] = useState(false)

  const { gateways, onGatewaysChange, showAlert, setAlertMessage, setIsError } = useContext(GatewayContext)

  const regexIPv4 = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/

  const handleSubmit = e => {
    setSave(true)
    e.preventDefault()
    addGateway({ serial, ipv4, name })
  }

  useEffect(() => {
    if (show) {
      setSerial('')
      setName('')
      setIpv4('')
    }
  }, [show])

  const addGateway = async ({ serial, ipv4, name }) => {
    try {
      const { data, status } = await axios.request({
        data: {
          serial,
          name,
          ipv4
        },
        method: 'POST',
        url: 'https://musalasoft-interview-backend.vercel.app/api/v1/gateways/create'
      })

      if (status === 201) {
        const newGateway = [...gateways, data]
        onGatewaysChange(newGateway)
        setSave(false)
        handleClose()
        setIsError(false)
        setAlertMessage('Successfully Gateway Created')
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
        <Modal.Title>Add Gateway</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>Serial Number</label>
            <input
              type='text'
              value={serial}
              onChange={({ target }) => setSerial(target.value)}
              placeholder='Serial Number'
              minLength='10'
              className='form-control'
              aria-describedby='serialHelp'
              autoComplete='off'
              required
            />
            <div className={serial.length < 10 ? '' : 'd-none'}>
              <p className='text-danger my-2'>Must be at least 10 chars long.</p>
            </div>
          </div>
          <div className='mb-3'>
            <label className='form-label'>Name</label>
            <input
              type='text'
              value={name}
              onChange={({ target }) => setName(target.value)}
              placeholder='Name'
              className='form-control'
              aria-describedby='nameHelp'
              autoComplete='off'
              required
            />
            <div className={name.length < 5 ? '' : 'd-none'}>
              <p className='text-danger my-2'>Must be at least 5 chars long.</p>
            </div>
          </div>
          <div className='mb-3'>
            <label className='form-label'>IPv4</label>
            <input
              type='text'
              value={ipv4}
              onChange={({ target }) => setIpv4(target.value)}
              placeholder='IPv4'
              className='form-control'
              aria-describedby='ipv4Help'
              autoComplete='off'
              required
            />
            <div className={regexIPv4.test(ipv4) ? 'd-none' : ''}>
              <p className='text-danger my-2'>IPv4 Incorrect.</p>
            </div>
          </div>
          <div className='d-flex justify-content-end'>
            <Button className='mx-2' variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button
              variant='primary'
              type='submit'
              disabled={
                serial === '' ||
                serial.length < 10 ||
                ipv4 === '' ||
                name === '' ||
                name.length < 5 ||
                !regexIPv4.test(ipv4)
              }
            >
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
AddGatewayModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}
