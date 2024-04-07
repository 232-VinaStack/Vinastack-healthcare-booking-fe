import React from 'react'
import styles from './symtomps.module.css'

const index = () => {
  return (
    <div className={styles.root}>
      <div className={styles.symtomp}>
        <div className={styles.symtomp_image}>
          <img className={styles.img} src="../src/assets/react.svg" alt="" />
        </div>
        <div className={styles.description}>
          <p className={styles.p}>Symtomp name</p>
        </div>
      </div>
    </div>
  )
}

export default index
