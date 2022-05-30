import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage } from '../components/gateway/HomePage'
import { NotFoundPage } from '../components/shared/NotFoundPage'

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}
