export const Footer = () => {
  return (
    <section className='bg-white shadow'>
      <footer className='d-flex justify-content-between align-items-center py-2 my-2'>
        <div>
          <span className='text-muted px-3'>Copyright © 2022 Gustavo Hurtado Cristia. All rights reserved.</span>
        </div>

        <ul className='nav col-md-4 justify-content-end px-5 d-flex'>
          <li className='ms-3'>
            <a className='text-dark' href='https://github.com/gcristia' target='_blank' rel='noreferrer'>
              <i className='bi bi-github'></i>
            </a>
          </li>
          <li className='ms-3'>
            <a
              className='text-dark'
              href='https://www.linkedin.com/in/gustavo-hurtado-cristia'
              target='_blank'
              rel='noreferrer'
            >
              <i className='bi bi-linkedin'></i>
            </a>
          </li>
          <li className='ms-3'>
            <a className='text-dark' href='https://twitter.com/GcristiaC' target='_blank' rel='noreferrer'>
              <i className='bi bi-twitter'></i>
            </a>
          </li>
          <li className='ms-3'>
            <a className='text-dark' href='https://www.instagram.com/gcristia.hurtado' target='_blank' rel='noreferrer'>
              <i className='bi bi-instagram'></i>
            </a>
          </li>
        </ul>
      </footer>
    </section>
  )
}
