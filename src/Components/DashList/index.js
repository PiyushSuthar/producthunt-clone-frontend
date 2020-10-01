import React from 'react'
import { Link } from 'react-router-dom'
import styles from './dashlist.module.css'

const DashList = ({ data = [] }) => {

    return (
        <ul className={ styles.dashlist_container }>
            {data.map((data, index) => (
                <Link to={ data.link } key={ index } className={ styles.dashList_list_link } ><li className={ styles.dashList_list } >{data.text}</li></Link>
            )) }
        </ul>
    )
}

export default DashList
