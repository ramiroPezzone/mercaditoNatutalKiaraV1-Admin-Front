import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import URIs from '../../URIs'
import styles from "../css/Categorys.module.css"
import { Loading } from '../../components/js/Loading';

const Categorys = () => {

    const [categorys, setCategorys] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        (async () => {
            const categorysDB = await axios.get(URIs.categorys)
            setCategorys(categorysDB.data)
            setLoaded(true)
        })()
    }, [])

    return (
        <div className={styles.containerGralCategorys}>

            <div className={styles.containerBtnEditarCategorys}>
                <Link to="/editar-categorys" className={styles.btnEditarCategorys}>
                    Editar categorías
                </Link>
            </div>

            <hr />

            {
                loaded === false && categorys.length === 0 && <Loading />
            }

            <div className={styles.containerCardsCategorys}>
                {
                    categorys.map(cat => (
                        <Link className={styles.cardCategory} key={cat._id} to={`/viewCategory/${cat.label}`}>
                            {cat.label}
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Categorys