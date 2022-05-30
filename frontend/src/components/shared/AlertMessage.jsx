import PropTypes from 'prop-types'

export const AlertMessage = ({ message, error }) => {
  return error
    ? (
    <div className='alert alert-danger d-flex align-items-center my-3' role='alert'>
      <i className='bi bi-exclamation-triangle-fill px-2'></i>
      <div>{message}</div>
    </div>
      )
    : (
    <div className='alert alert-success d-flex align-items-center my-3' role='alert'>
      <i className='bi bi-check-circle-fill px-2'></i>
      <div>{message}</div>
    </div>
      )
}

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired
}
