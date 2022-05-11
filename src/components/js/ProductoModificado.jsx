import styles from '../css/ProductoModificado.module.css'
const ProductoModificado = (props) => {

    return (
        <div className={
            props.oculto === false
                ? `${styles.containerGralProductoModificadoOculto}`
                : `${styles.containerGralProductoModificado}`
        }
        >
            <div className={styles.containerVentanaProductoModificado}>
                <div className={styles.check} />
                <p>Producto modificado satisfactoriamente</p>
                <button onClick={props.avisoDeProductoAgregado}>Ok</button>
                <div className={styles.containerBarraTemporal} />
            </div>
        </div>
    )
}

export default ProductoModificado
