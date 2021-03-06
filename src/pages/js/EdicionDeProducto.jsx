import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from '../css/EdicionDeProducto.module.css'
import Swal from 'sweetalert2'

const URI = require('../../URIs')

export const EdicionDeProducto = () => {

  useEffect(() => {
    document.title = `Administración de productos`;
  });

  const idProd = useParams().id

  // LOCAL
  const URIProdInd = `${URI.edicionProducto}/${idProd}`
  const guardarEdicion = `${URI.guardarEdicionProducto}/${idProd}`

  const [producto, setProducto] = useState({})

  useEffect(() => {
    (async () => {
      const res = await axios.get(URIProdInd)
      const resData = res.data
      setProducto(resData)
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleInputChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value })
  }
  const handleCheckChange = (e) => {
    console.log(e.target.checked);
    setProducto({ ...producto, "oferta": e.target.checked })
  }

  const enviarFormulario = async (e) => {
    e.preventDefault()
    await axios.post(guardarEdicion, {
      producto
    })
    Swal.fire({
      title: 'Producto editado',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      timer: 3000,
      timerProgressBar: true,
      confirmButtonColor: "rgb(141, 42, 255);"
    })
  }

  return (
    <div className={styles.containerNewProduct}>
      <div className={styles.containerVolverAtras}>
        <Link to='/productos'>
          Volver atrás
        </Link>
      </div>
      <h2 style={{ textAlign: 'center' }}>Formulario de edición de producto</h2>
      <div className="containerForm">
        <div className={styles.containerTitulos}>
          <h4 className={styles.editando}>Editando</h4>
          <h4 className={styles.subEditando}> {producto.name}</h4>
        </div>
        <form
          className={styles.containerFormNewProd}
          onSubmit={enviarFormulario}
        >
          <div className={styles.itemForm}>
            <label htmlFor="name">Nombre</label>
            <input
              name="name"
              type="text"
              value={`${producto.name}`}
              onChange={handleInputChange}
              autoComplete='name'
            />
          </div>

          <div className={styles.itemForm}>
            <label htmlFor="description">Descripción</label>
            <textarea
              type="text"
              name="description"
              value={`${producto.description}`}
              onChange={handleInputChange}
              autoComplete='off'
            />
          </div>

          <div className={styles.containerCantidadUnidad}>
            <div className={styles.itemForm}>
              <label htmlFor="quantity">Cantidad</label>
              <input
                type="number"
                name="quantity"
                value={`${producto.quantity}`}
                onChange={handleInputChange}
                autoComplete='off'
              />
            </div>

            <div className={styles.itemForm}>
              <label htmlFor="unity">Unidad</label>
              <input
                type="text"
                name="unity"
                value={`${producto.unity}`}
                onChange={handleInputChange}
                autoComplete='off'
              />
            </div>
          </div>

          <div className={styles.itemForm}>
            <label htmlFor="price">Precio</label>
            <input
              type="number"
              name="price"
              value={`${producto.price}`}
              onChange={handleInputChange}
              autoComplete='off'
            />
          </div>

          <div className={`${styles.containerCheckOferta}`}>
            <label htmlFor="oferta"><h5>Marcar como oferta</h5></label>
            <input
              type="checkbox"
              name='oferta'
              onChange={handleCheckChange}
              checked={producto.oferta === true ? true : false}
            />
          </div>


          <hr />

          <button type="submit">Guardar</button>
        </form>

      </div>
    </div>
  )
}
