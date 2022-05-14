import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import styles from '../css/ProductosAdmins.module.css'
import { CardProductoAdmin } from "../../components/js/CardProductoAdmin";
import { FlexContainer } from "../../components/js/FlexContainer";
import { Loading } from "../../components/js/Loading";
import BtnTop from "../../components/js/BtnTop";
import SearchBar from "../../components/js/SearchBar";
const URI = require('../../URIs')

export const ProductosAdmins = (props) => {

  const URiAdminsProds = URI.productosAdmins

  useEffect(() => {
    document.title = `Administración de productos`;
  });

  const [productos, setProductos] = useState([]);

  const [productoEliminado, setProductoEliminado] = useState(false)

  const [cargaCompleta, setCargaCompleta] = useState(false)

  const eliminacionDeProducto = () => {
    setProductoEliminado(!productoEliminado)
  }

  useEffect(() => {
    (async () => {
      const res = await axios.get(URiAdminsProds);
      setProductos(res.data);
      setCargaCompleta(true)
    })();
  }, [productoEliminado]); // eslint-disable-line react-hooks/exhaustive-deps

  // Lógica para el cierre de sesión
  const [sesionIniciada, setSesionIniciada] = useState(true)

  const cerrarSesion = () => {
    if (sessionStorage.getItem('sessionLog')) {
      sessionStorage.removeItem('sessionLog')
    }
    if (localStorage.getItem('localLog')) {
      localStorage.removeItem('localLog')
    }
    setSesionIniciada(false)
  }

  useEffect(() => {
    if (sesionIniciada === false) {
      props.avisoDeCierre()
    }
  }, [sesionIniciada, props])
  // 

  // Search logic

  const [search, setSearch] = useState("")

  const searchParams = (e) => {
    setSearch(e.target.value)
  }
  // 

  if (productos.length === 0 && cargaCompleta === false) {
    return (
      <div className={styles.containerProductosAdmin}>
        <div className={styles.containerGraloading}>
          <Loading />
        </div>
      </div>)

  }

  return (
    <div className={styles.containerProductosAdmin}>
      <div className={styles.containerCerrarSesion}>
        <div className={styles.btnCerrarSesion} onClick={cerrarSesion} title="Cerrar sesión"/>
      </div>

      <h3 className={styles.tituloSection}>Listado general de productos</h3>

      <SearchBar searchParams={searchParams} />

      <div className={styles.containerBtns}>
        <button variant="info" className={`${styles.btnsAdmins} ${styles.btnNvoProd}`}>
          <Link to={'/nuevo-producto'}>
            <div className={styles.containerBtnAgregarNvoProd}>
              <div className={styles.signoMas} />
              Agregar nuevo producto
            </div>
          </Link>
        </button>
      </div>
      <FlexContainer>
        {
          productos.length === 0
          && 'No existen productos'
        }

        {
          productos.map((prod) => (
            <CardProductoAdmin
              key={prod._id}
              id={prod._id}
              name={prod.name}
              description={prod.description}
              price={prod.price}
              unity={prod.unity}
              quantity={prod.quantity}
              categorys={prod.categorys}
              img={prod.image}
              avisoDeEliminacion={eliminacionDeProducto}
              oferta={prod.oferta}
              search={search}
            />
          ))
        }
      </FlexContainer>
      <BtnTop />
    </div>
  )
}
