import React from 'react'
import { Link } from 'react-router-dom'
import styles from './dashlist.module.css'

const DashList = () => {

    return (
        <ul className={styles.dashlist_container}>
            {Array(5).fill(0).map((b, index) => (
                <Link className={styles.dashList_list_link} ><li className={styles.dashList_list} key={ index }>Test</li></Link>
            )) }
        </ul>
    )
}

export default DashList
