import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './dashlist.module.css'

const DashList = ({ data = [] }) => {
    const location = useLocation()

    return (
        <div className={ styles.dashlist_container }>
            { data.map((data, index) => (
                <Link to={ data.link } key={ index } className={ styles.dashList_list_link } ><div className={ [styles.dashList_list, location.pathname === data.link && styles.dashList_list_active].join(' ') } >{ data.text }</div></Link>
            )) }
        </div>
    )
}

export default DashList
