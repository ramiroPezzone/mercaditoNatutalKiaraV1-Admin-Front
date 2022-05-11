import { useEffect, useState } from 'react'
import { LoginPage } from './LoginPage'
import { ProductosAdmins } from './ProductosAdmins'
import { useParams } from "react-router-dom";
import Categorys from './Categorys';
import { HomePage } from './HomePage';
import { Ofertas } from './Ofertas';
import { NewProduct } from './NewProduct';

export const AdminsPage = () => {

    const params = useParams()

    const logSession = sessionStorage.getItem('sessionLog')
    const logLocal = localStorage.getItem('localLog')

    const [avisoDeInicio, setAvisoDeInicio] = useState(false)
    const [avisoDeCierre, setAvisoDeCierre] = useState(false)

    const [logueado, setLogueado] = useState(false)
    useEffect(() => {
        (logSession === 'ok' || logLocal === 'ok') && setLogueado(true)
    }, [avisoDeInicio, avisoDeCierre]) // eslint-disable-line react-hooks/exhaustive-deps

    const inicioIsTrue = () => {
        setAvisoDeInicio(!avisoDeInicio)
    }
    const cierreIsTrue = () => {
        setAvisoDeCierre(!avisoDeCierre)
        setLogueado(!logueado)
    }

    if (params.ruta === undefined) {
        return (
            <HomePage />
        )
    }

    if (logueado === false) {
        return (
            <LoginPage
                avisoDeInicio={inicioIsTrue}
            />
        )
    }

    if (logueado === true && params.ruta === 'productos') {
        return (
            <ProductosAdmins
                avisoDeCierre={cierreIsTrue} />
        )
    }

    if (logueado === true && params.ruta === 'ofertas') {
        return (
            <Ofertas
                avisoDeCierre={cierreIsTrue} />
        )
    }

    if (logueado === true && params.ruta === 'categorys') {
        return (
            <Categorys
                avisoDeCierre={cierreIsTrue} />
        )
    }

    if (logueado === true && params.ruta === 'nuevo-producto') {
        return (
            <NewProduct
                avisoDeCierre={cierreIsTrue} />
        )
    }
}
