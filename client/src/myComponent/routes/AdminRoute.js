import React,{useEffect, useState} from 'react'

import {Route, Link} from 'react-router-dom'
import {useSelector, useStore} from 'react-redux'

import LoadingToRedirect from './LoadingToRedirect'
import {currentAdmin} from '../../functions/auth'

const AdminRoute = ({children, ...rest})=>{

    const {user} = useSelector((state) => ({...state}))

    const [ok, setOk] = useState(false)

    useEffect(()=>{
        if(user && user.token){
            currentAdmin(user.token)
            .then( res=>{
                console.log("Current Admin Res", res)
                setOk(true)
            })
            .catch(err=>{
            console.log(("admin Route Err", err))
            setOk(false)
                }
            )

        }
    },[user])

    return ok ? (
         <Route {...rest} render ={()=> children}/>
        ): (
        <LoadingToRedirect />
        )
    
}

export default AdminRoute