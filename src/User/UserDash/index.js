import React from 'react'
import DashList from '../../Components/DashList'
import WhiteBgContainer from '../../Components/WhiteBackContainer'
import Base from '../../Core/Base'
import styles from './userDash.module.css'

const UserDashboard = () => {

    const MainDash = () => (
        <div className={ styles.MainDashContainer }>
            <div className={ styles.sidebar }>
                <DashList />
            </div>
            <div className={ styles.MainArea }>
                Some Other stuff here
            </div>
        </div>
    )

    return (
        <Base>
            <div className={ styles.introContainer }>
                <h3 className={ styles.heading }>Dashboard</h3>
                <p className={ styles.description }>Do Your Not so lovely Stuff here!</p>
            </div>
            <WhiteBgContainer>
                <MainDash />
            </WhiteBgContainer>
        </Base>
    )
}

export default UserDashboard
