import '../../styles/pages/NotFoundPage.scss'
import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <>
      <div className='page-not-found pt-5'>
        <div className='bg-light shadow'>
          <h2>
            4<i className='bi bi-bug'></i>4
          </h2>
          <h3 className='mt-4'>Opps! Page Not Found</h3>
          <div className='mt-5'>
            <Link to='/'>
              <button type='button' className='btn m-2 m-md-0 btn-primary'>
                <i className='bi bi-house-door-fill'></i> Back Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
