import React from 'react'
import styles from '../css/ImagenCard.module.css'

const ImagenCard = ({ img }) => {
    return (
        <div className={styles.containerImg} style={{ backgroundImage: `url(${img})` }} />
    )
}

export default ImagenCard