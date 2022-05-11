import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import URIs from "../../URIs";
import styles from '../css/EditarCategorys.module.css'
import { Loading } from '../../components/js/Loading'

export const EditarCategorys = (props) => {

    const [categorys, setCategorys] = useState([])

    const [newCategory, setNewCategory] = useState({
        value: '',
        label: ''
    })

    const [categoryAdded, setCategoryAdded] = useState(false)
    const [categoryDeleted, setCategoryDeleted] = useState(false)
    const [error, setError] = useState(false)
    const [loaded, setLoaded] = useState(false)

    // Lógica para ver las categorías existentes
    useEffect(() => {
        (async () => {
            const categorysDB = await axios.get(URIs.categorys)
            setCategorys(categorysDB.data)
            setLoaded(true)
        })()
    }, [categoryAdded, categoryDeleted])
    // 


    // Lógica para adición de categoría
    const addCategory = () => {
        setCategoryAdded(true)
    }
    const handleChange = (e) => {
        setNewCategory({
            ...newCategory,
            [e.target.name]: e.target.value
        })
    }
    const agregar = async (e) => {
        e.preventDefault()
        console.log(newCategory.value);
        if (newCategory.value.includes("/")) {
            setError(true)
            return
        }
        setError(false)
        await axios.post(`${URIs.categorys}`, {
            value: newCategory.value.trim(),
            label: newCategory.value.trim()
        })
        setCategoryAdded(!categoryAdded)
        setNewCategory({ value: '', label: '' })
    }
    // 
    console.log(error);

    // Lógica para eliminación de categoría
    const eliminarCategory = async (id) => {
        await axios.delete(`${URIs.categorys}/${id}`)
        setCategoryDeleted(!categoryDeleted)
    }
    // 

    return (
        <div className={styles.containerEditarCategorys}>
            <div className={styles.containerBtnsSuperiores}>
                <div className={styles.containerVolverAtras}>
                    <Link to='/categorys'>
                        ⮪ Volver a ver productos por categoría
                    </Link>
                </div>
            </div>


            <h3 className={styles.titleSectionEditarCategorys}>Agregar categoría</h3>

            <form className={styles.containerFormNewCat} onSubmit={agregar}>
                <div className={styles.itemForm}>
                    <label htmlFor="value" />
                    <input
                        type="text"
                        name="value"
                        placeholder="Escribe aquí para agregar una"
                        value={newCategory.value}
                        onChange={handleChange}
                    />
                </div>
                <div className={`${styles.itemForm} ${styles.itemFormLabel}`}>
                    <label htmlFor="label" />
                    <input
                        type="text"
                        value={newCategory.value}
                        readOnly
                    />
                </div>
                <div className={`${styles.itemForm} ${styles.btnSubmit}`}>
                    <button type="submit" onClick={addCategory}>
                        <div className={styles.cruzAgregar} />
                    </button>
                </div>
            </form>
            <span
                className={
                    error === false
                        ? styles.ok
                        : styles.error
                }
            >
                La categoría no puede incluir en su nombre barras inclinadas (" / ")
            </span>

            <div className={styles.lineaDivisora} />


            {/* Mapeo de categorías existentes */}
            <h3 className={styles.titleSectionEditarCategorys}>Listado de categorías</h3>

            {
                categorys.length === 0 && loaded === false && <Loading />
            }

            {
                loaded !== false &&

                <div className={styles.listadoDeCategorys}>
                    {
                        categorys.map(cat => (
                            <div
                                key={cat._id}
                            >
                                <div
                                    className={styles.category}
                                >
                                    <div className={styles.nameCategory}>
                                        <Link className={styles.cardCategory} key={cat._id} to={`/viewCategory/${cat.label}`}>
                                            {cat.label}
                                        </Link>
                                    </div>
                                    <div className={`${styles.itemForm} ${styles.btnSubmit}`}>
                                        <button onClick={() => eliminarCategory(cat._id)}>
                                            <span title="eliminar">❌</span>
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.lineaDivisora2} />
                            </div>
                        ))
                    }
                </div>
            }
            {/*  */}
        </div>
    )
}
