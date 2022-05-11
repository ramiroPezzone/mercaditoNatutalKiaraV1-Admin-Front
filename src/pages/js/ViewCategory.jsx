import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import URIs from '../../URIs'
import axios from 'axios'
import styles from '../css/ViewCategory.module.css'
import { FlexContainer } from '../../components/js/FlexContainer';
import { CardProductoAdmin } from '../../components/js/CardProductoAdmin';
import { Loading } from '../../components/js/Loading';



const ViewCategory = () => {

    const { id } = useParams()

    const [productsByCategory, setProductsByCategory] = useState([])

    const [cargaCompleta, setCargaCompleta] = useState(false)

    useEffect(() => {
        (async () => {
            const productsByCategory = await axios.get(`${URIs.viewCategory}/${id}`)
            setProductsByCategory(productsByCategory.data)
            setCargaCompleta(true)
        })()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (productsByCategory.length === 0 && cargaCompleta === true) {
        return (
            <div className={styles.containerViewCategory}>
                <div className={styles.containerBtnsSuperiores}>
                    <div className={styles.containerVolverAtras}>
                        <Link to='/categorys'>
                            ⮪ Volver a ver productos por categoría
                        </Link>
                    </div>
                </div>

                <div className={styles.containerGraloading}>
                    <div className={styles.containerViewCategory}>
                        <h5 className={styles.tituloViewCategory}>Productos de la categoría: {id}
                        </h5>
                        <h5 className={styles.noHayProductos}>No hay productos disponibles para esta categoría</h5>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className={styles.containerViewCategory}>
            <div className={styles.containerBtnsSuperiores}>
                <div className={styles.containerVolverAtras}>
                    <Link to='/categorys'>
                        ⮪ Volver a ver productos por categoría
                    </Link>
                </div>
            </div>

            <h5 className={styles.tituloViewCategory}>Productos de la categoría: {id}</h5>

            {
                cargaCompleta === false && productsByCategory.length === 0 && <Loading />
            }

            <FlexContainer>
                {
                    productsByCategory.map((prod) => (
                        <CardProductoAdmin
                            key={prod._id}
                            id={prod._id}
                            name={prod.name}
                            img={prod.image}
                            description={prod.description}
                            price={prod.price}
                            unity={prod.unity}
                            categorys={prod.categorys}
                        />
                    ))
                }
            </FlexContainer>
        </div>
    )

}

export default ViewCategory