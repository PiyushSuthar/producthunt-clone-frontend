import React from 'react'
import DashList from '../../Components/DashList'
import WhiteBgContainer from '../../Components/WhiteBackContainer'
import Base from '../../Core/Base'
import styles from './userDash.module.css'
import { Switch, Route, Link } from 'react-router-dom'
import EditUser from './EditUser'
import ManageProducts from './manageProduct/products'

const UserDashboard = () => {

    const MainDash = () => (
        <div className={ styles.MainDashContainer }>
            <div className={ styles.sidebar }>
                <Link to="/dashboard/user"><h5 className={ styles.settingsHeader }>Dashboard</h5></Link>
                <DashList data={ [
                    { link: "/dashboard/user/edit", text: "Edit User" },
                    { link: "/dashboard/user/products", text: "Products" },
                    { link: "/dashboard/user/settings", text: "Settings" },
                ] } />
            </div>
            <div className={ styles.MainArea }>
                <Switch>
                    <Route path="/dashboard/user/edit" component={ EditUser } />
                    <Route path="/dashboard/user/products" component={ ManageProducts } />
                    <Route path="/dashboard/user/settings">
                        Settings
                    </Route>
                    <Route>Dashboard</Route>
                </Switch>
            </div>
        </div>
    )

    return (
        <Base title="नियंत्रण-पट्ट">
            <div className={ styles.introContainer }>
                <h3 className={ styles.heading }>Dashboard</h3>
                <p className={ styles.description }>Weird Stuff here!</p>
            </div>
            <WhiteBgContainer>
                <MainDash />
            </WhiteBgContainer>
        </Base>
    )
}

export default UserDashboard
