import React from 'react'
import HomePageContext, { useHomePageDataFetch } from './HomePage.context'

export default function GlobalContext({ children }) {
    const HomePageState = useHomePageDataFetch()

    return (
        <HomePageContext.Provider value={ HomePageState }>
            {children }
        </HomePageContext.Provider>
    )
}