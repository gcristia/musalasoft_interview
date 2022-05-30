import '../../styles/pages/Loading.scss'

export const Loading = () => {
  return (
    <section className='loader-root'>
      <div className='loader-container'>
        <div className='loader-label'>
          <div className='circular-spinner'></div>
          <span>Loading ...</span>
        </div>
      </div>
    </section>
  )
}
