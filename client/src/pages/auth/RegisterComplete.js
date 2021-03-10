import React,{ useState, useEffect } from 'react'
import {auth} from '../../firebase'
import {useDispatch, useSelector} from 'react-redux'

import {toast } from 'react-toastify'

//call function createorupdate userr
import {createorupdateuser} from '../../functions/auth'


const RegisterComplete =({history})=>{
    const [email,setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const {user} = useSelector((state)=>({...state}))

   let dispatch =useDispatch()
    useEffect(()=>{
        setEmail(window.localStorage.getItem('emailForRegistration'))
    }, [])

const handleSubmit = async (e)=>{
  e.preventDefault()
//validation
if(!email || !Password){
    toast.error('Email and password is required')
    return;
}

if(Password.length < 6){
    toast.error('Password must be at least 6 characters')
    return;
}

  try {
      const result = await auth.signInWithEmailLink(
          email,
          window.location.href
      )

      
      
 
  if(result.user.emailVerified){
          //remove user email from local storage
         window.localStorage.removeItem('emailForRegistration')
         //toast.success("Hurrah! Reg process is complete...You are redirect to Home Page")


          //get user id token
 
          let user = auth.currentUser
          await user.updatePassword(Password)
          const idTokenResult = await user.getIdTokenResult()
          //redux store

           console.log('user', user, 'idTokenResult', idTokenResult)
           createorupdateuser(idTokenResult.token)
           .then( res => {
               dispatch({
                  
                   type: 'LOGGED_IN_USER',
                   payload : {
                       name : res.data.name,
                      email : res.data.email,
                      token : idTokenResult.token,
                      role : res.data.role,
                      _id : res.data._id
           
                   }
                })
           })
           .catch(err => console.log(err))
       
          //redirect
         history.push('/')
} 
} catch (error) {
    console.log(error);
    toast.error(error.message)
}
}
const completeregisterform =()=>{
    return (
        <form onSubmit={handleSubmit}>
           <input type="email" className="form-control"
            value={email} 
          disabled
                
            />

        <input type="password" className ="form-control" value={Password}
        
        onChange={(e)=> setPassword(e.target.value)}
        placeholder="Enter Password"
        autoFocus/>




            <button type="submit" className="btn btn-raised">Complete Registeration</button>
        </form>
    )
}

    return(
        <div className ="container p-5">
            <div className ="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Complete Registeration Process</h4>
                   
                    {completeregisterform()}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete