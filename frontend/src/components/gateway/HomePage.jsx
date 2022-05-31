import '../../styles/pages/DashboardCard.scss'
import { useAxios } from '../../hooks/useAxios'
import { DashboardCard } from './DashboardCard'
import { Loading } from '../shared/Loading'
import { AlertMessage } from '../shared/AlertMessage'
import { useEffect, useState } from 'react'
import { GatewayCard } from './GatewayCard'
import { GatewayContext } from '../../context/GatewayContext'

export const HomePage = () => {
  const [errorLoading, setErrorLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState('Opps! Error')
  const [isError, setIsError] = useState(true)
  const [gateways, setGateways] = useState([])

  const { data, error, loaded } = useAxios('https://musalasoft-interview-backend.vercel.app/api/v1/gateways', 'GET', {})

  const onGatewaysChange = gateway => {
    setGateways(gateway)
  }

  const deviceCount = () => {
    let deviceTotal = 0

    gateways.forEach(({ devices }) => {
      deviceTotal += devices.length
    })

    return deviceTotal
  }

  const showAlert = () => {
    setErrorLoading(true)
    setTimeout(() => {
      setErrorLoading(false)
    }, 5000)
  }

  useEffect(() => {
    if (error) {
      showAlert()
    }
  }, [error])

  useEffect(() => {
    if (data) {
      setGateways(data)
    }
  }, [data])

  if (loaded) {
    return (
      <section>
        <GatewayContext.Provider value={{ gateways, onGatewaysChange, showAlert, setIsError, setAlertMessage }}>
          <div className='row'>
            <div className='col-4 fixed-top dashboard'>
              <DashboardCard gatewayTotal={gateways.length} deviceTotal={deviceCount()} />
              <div className={errorLoading ? '' : 'd-none'}>
                <AlertMessage error={isError} message={alertMessage} />
              </div>
            </div>
            <div className='col-8 offset-4 two'>
              <div className='row row-cols-1 py-2'>
                <div className='col'>
                  {gateways.map(gateway => (
                    <GatewayCard key={gateway._id} gateway={gateway} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GatewayContext.Provider>
      </section>
    )
  }
  return <Loading />
}
