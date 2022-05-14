import React from 'react'
import styles from '../css/ErrorMessage.module.css'

const ErrorMessage = ({msg}) => {
  return (
    <div className={styles.containerErrorMsg}>
        <p>{msg}</p>
    </div>
  )
}

export default ErrorMessage