import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { EdicionDeProducto } from '../pages/js/EdicionDeProducto'
import { Footer } from '../components/js/Footer'
import { Navigation } from '../components/js/Navigation'
import { AdminsPage } from '../pages/js/AdminsPage'

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route exact path='/' element={<AdminsPage />} />
                <Route exact path='/:ruta' element={<AdminsPage />} />
                <Route exact path='/editar-producto/:id' element={<EdicionDeProducto />} />
            </Routes>
            <Footer />
        </BrowserRouter>

    )
}
