import { useEffect, useState, useRef } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import styles from '../css/NewProduct.module.css'
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import Swal from 'sweetalert2'
import ErrorMessage from "../../components/js/ErrorMessage";


const URIs = require('../../URIs')


export const NewProduct = () => {


    useEffect(() => {
        document.title = `Administración de productos`;
    });

    const URIAgregarProd = URIs.productosAdmins

    // Fetch de las categorías
    const [categorys, setCategorys] = useState([])

    useEffect(() => {
        (async () => {
            const categorysDB = await axios.get(URIs.categorys)
            setCategorys(categorysDB.data)
        })()
    }, [])

    const animarComponentes = makeAnimated()

    const [inputCategorysError, setInputCategorysError] = useState(false)
    const [inputNameError, setInputNameError] = useState(false)
    let [inputCategory, setInputCategory] = useState([])
    const handleCategoryChange = (e) => {
        let valoresSeleccionados = JSON.stringify(e)
        setInputCategory(valoresSeleccionados)
    }

    const logSession = sessionStorage.getItem('sessionLog')
    const logLocal = localStorage.getItem('localLog')

    const checkbox = useRef()

    if (logSession === false || logLocal === false) {
        <LoginPage />
    }

    return (
        <div className={styles.containerNewProduct}>
            <div className={styles.containerVolverAtras}>
                <Link to='/productos'>
                    ⮪ Volver al listado de productos
                </Link>
            </div>
            <h2 style={{ textAlign: 'center' }}>Formulario de nuevo producto</h2>
            <div className="containerForm">
                <Formik
                    initialValues={{ name: '', description: '', quantity: '', oferta: false, price: '', image: '', unity: '', categorys: inputCategory }}
                    onSubmit={async (values, { resetForm }) => {
                        let data = new FormData()
                        data.append('name', values.name)
                        data.append('description', values.description)
                        data.append('quantity', values.quantity)
                        data.append('oferta', values.oferta)
                        data.append('price', values.price)
                        data.append('image', values.image)
                        data.append('unity', values.unity)
                        data.append('categorys', inputCategory)

                        if (inputCategory.length === 0) {
                            setInputCategorysError(true)
                            return
                        } else {
                            setInputCategorysError(false)
                        };

                        if (values.name === "") {
                            setInputNameError(true)
                            return
                        } else {
                            setInputNameError(false)
                        };

                        try {
                            await fetch(`${URIAgregarProd}`, {
                                method: 'post',
                                headers: new Headers({ Accept: 'application/json' }),
                                body: data
                            });
                        } catch (error) {
                            console.log(error);
                        }
                        Swal.fire({
                            title: 'Producto agregado satisfactoriamente',
                            icon: 'success',
                            confirmButtonText: 'Aceptar',
                            timer: 3000,
                            timerProgressBar: true,
                            confirmButtonColor: "rgb(141, 42, 255);"
                        })
                        resetForm()
                        checkbox.current.checked = false
                    }
                    }
                >
                    {formProps => (
                        <Form encType="multipart/form-data" className={styles.containerFormNewProd}>
                            <div className={styles.itemForm}>
                                <label htmlFor="category">Categoría(s)</label>
                                <Select
                                    name='categorys'
                                    options={categorys}
                                    components={animarComponentes}
                                    isMulti
                                    onChange={handleCategoryChange}
                                    placeholder="Seleccionar categoría(s)"
                                />
                            </div>
                            <Link to='/editar-categorys' className={styles.btnEditarCategorys}>
                                Editar categorías
                            </Link>
                            {
                                inputCategorysError &&
                                <ErrorMessage
                                    msg="Selecciona al menos una categoría"
                                />
                            }
                            <hr />
                            <div className={styles.itemForm}>
                                <label htmlFor="name">Nombre</label>
                                <input
                                    type="text"
                                    name='name'
                                    {...formProps.getFieldProps('name')}
                                />
                                {
                                    inputNameError &&
                                    <ErrorMessage
                                        msg="No olvides colocarle nombre"
                                    />
                                }

                            </div>

                            <div className={styles.itemForm}>
                                <label htmlFor="description">Descripción</label>
                                <textarea
                                    type="text"
                                    name='description'
                                    {...formProps.getFieldProps('description')}
                                />
                            </div>

                            <div className={styles.containerCantidadUnidad}>
                                <div className={styles.itemForm}>
                                    <label htmlFor="quantity">Cantidad</label>
                                    <input
                                        type="number"
                                        name='quantity'
                                        {...formProps.getFieldProps('quantity')}
                                    />
                                </div>

                                <div className={styles.itemForm}>
                                    <label htmlFor="unity">Venta por</label>
                                    <input
                                        type="text"
                                        name='unity'
                                        {...formProps.getFieldProps('unity')}
                                    />
                                </div>
                            </div>

                            <div className={styles.itemForm}>
                                <label htmlFor="price">Precio</label>
                                <input
                                    type="number"
                                    name='price'
                                    {...formProps.getFieldProps('price')}
                                />
                            </div>


                            <div className={styles.itemForm}>
                                <label htmlFor="image">Imagen</label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={e => { formProps.setFieldValue('image', e.target.files[0]) }}
                                />
                            </div>

                            <div className={`${styles.containerCheckOferta}`}>
                                <label htmlFor="oferta"><h5>Marcar como oferta</h5></label>
                                <input
                                    type="checkbox"
                                    name='oferta'
                                    ref={checkbox}
                                    {...formProps.getFieldProps('oferta')}
                                />
                            </div>

                            <hr />

                            <button type="submit" className={styles.btnGuardar}>
                                Guardar
                            </button>
                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    )
}
