import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import styles from '../css/CardProductoAdmin.module.css'
import URI from '../../URIs'
import ListonOferta from "./ListonOferta";


export const CardProductoAdmin = (props) => {

    const URIAdmins = URI.productosAdmins

    const confirmacionEliminacion = async (id) => {
        await fetch(`${URIAdmins}/${id}`)
        props.avisoDeEliminacion()
    }

    const eliminarProducto = () => {
        Swal.fire({
            text: 'Estas seguro de que deseas eliminar este producto?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: "rgb(141, 42, 255);"
        })
            .then(res => {
                if (res.isDismissed) {
                    return;
                } else {
                    confirmacionEliminacion(props.id)
                    Swal.fire({
                        text: 'Producto eliminado',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        timer: 3000,
                        timerProgressBar: true,
                        confirmButtonColor: "rgb(141, 42, 255);"
                    })
                }
            })
    }

    // Variables de búsqueda
    const [name, setName] = useState("")
    const [search, setSearch] = useState("")
    useEffect(() => {
        props.search !== undefined && setSearch(props.search.toLowerCase().trim())
        props.name !== undefined && setName(props.name.toLowerCase().trim())
    }, [props.search, props.name])

    const [searchSinAcentos, setSearchSinAcentos] = useState("")
    const [nameSinAcentos, setNameSinAcentos] = useState("")

    // Name sin acentos
    useEffect(() => {
        const reemplazarAcentosEnName = (cadena) => {
            var chars = {
                "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u",
                "à": "a", "è": "e", "ì": "i", "ò": "o", "ù": "u", "ñ": "n",
                "Á": "A", "É": "E", "Í": "I", "Ó": "O", "Ú": "U",
                "À": "A", "È": "E", "Ì": "I", "Ò": "O", "Ù": "U", "Ñ": "N"
            }
            var expr = /[áàéèíìóòúùñ]/ig;
            var res = cadena.replace(expr, function (e) { return chars[e] });
            setNameSinAcentos(res)
        }
        reemplazarAcentosEnName(name)
    }, [name])

    // Search sin acentos
    useEffect(() => {
        const reemplazarAcentosEnSearch = (cadena) => {
            var chars = {
                "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u",
                "à": "a", "è": "e", "ì": "i", "ò": "o", "ù": "u", "ñ": "n",
                "Á": "A", "É": "E", "Í": "I", "Ó": "O", "Ú": "U",
                "À": "A", "È": "E", "Ì": "I", "Ò": "O", "Ù": "U", "Ñ": "N"
            }
            var expr = /[áàéèíìóòúùñ]/ig;
            var res = cadena.replace(expr, function (e) { return chars[e] });
            setSearchSinAcentos(res)
        }
        reemplazarAcentosEnSearch(search);
    }, [search])
    // 

    return (
        <Card
            style={{ width: '18rem' }}
            className={
                nameSinAcentos.includes(searchSinAcentos)
                    ? `${styles.generalContainer}`
                    : `${styles.generalContainerHidden}`
            }
        >
            <ListonOferta
                oferta={props.oferta}
            />

            <div className={styles.containerImg} style={{ backgroundImage: `url(${props.img})` }} />

            <Card.Body className={styles.cardContainer}>
                <div className={styles.flexItem}>
                    <Card.Title>{props.name}</Card.Title>
                    <hr />
                    <Card.Text className={styles.descriptionProd}>
                        {props.description}
                    </Card.Text>
                    <hr />
                    <Card.Text>
                        Venta por <span className={styles.unity}>{props.unity}</span>
                    </Card.Text>
                    <Card.Text>
                        Cantidad disponible {props.quantity}
                    </Card.Text>
                    <Card.Text>
                        Agregado en las categorías:
                    </Card.Text>
                    {
                        props.categorys.map(cat => (
                            <p
                                className={styles.categorys}
                                key={cat._id}
                            >
                                -{cat.value}
                            </p>
                        ))
                    }
                    <Card.Text>
                        $ {props.price}
                    </Card.Text>
                </div>
                <div className={styles.flexItem}>
                    <div className={styles.containerButtons}>
                        {/* Edición de producto */}
                        <Link to={`/editar-producto/${props.id}`}>
                            <button className={styles.btnEditar}>
                                Editar
                            </button>
                        </Link>
                        {/*  */}
                        {/* Botón de eliminación de producto */}
                        <button className={styles.btnEliminar} onClick={eliminarProducto}>Eliminar</button>
                        {/*  */}
                    </div>
                </div>

            </Card.Body>
        </Card>
    )
}
