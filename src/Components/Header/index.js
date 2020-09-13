import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const HeaderContainer = styled.header`
    background-color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:center;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.1);
    padding: 5px;
`
const Logo = styled.span`
    padding: 10px 14px;
    background-color: #DA552F;
    color: white;
    border-radius: 50%;
    font-size: 20px;
    justify-self: left;
`

const Menu = styled.div`
    display: flex;
    align-items:left;
    justify-content: center;
`
const MenuItem = styled(Link)`
    padding: 5px 8px;
    text-decoration:none;
    color: black;
`
const Button = styled(Link)`
    padding: 5px 8px;
    background-color: #fff;
    border: solid 1px #e8e8e8;

`

const Header = () => {
    return (
        <HeaderContainer>
            <Logo>P</Logo>
            <Menu>
                <MenuItem to="/">Home</MenuItem>
                <MenuItem to="/">About</MenuItem>
                <MenuItem to="/">Contact</MenuItem>
            </Menu>
            <Button>Login</Button>
        </HeaderContainer>
    )
}

export default Header
