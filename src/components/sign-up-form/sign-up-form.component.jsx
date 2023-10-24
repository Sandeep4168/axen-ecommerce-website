import React,{useState} from 'react'
import FormInput from '../form-input/form-input.component';
import "../sign-up-form/sign-up-form.styles.scss"
import { createAuthUserWithEmailAndPassword ,createUserDocumnetFromAuth} from '../../utils/firebase.utils';
import Button from '../button/button.component';

const SignUp = () => {

const defaultFieldNames = {
    displayName:"",
    email:"",
    password:"",
    confirmPassword :""
}

const resetFormFields = () => {
  setFieldNames(defaultFieldNames);
}

const [fieldNames,setFieldNames] = useState(defaultFieldNames);
const {displayName,email,password,confirmPassword} = fieldNames;
 
const handleChange = (event) =>{
    const {name,value} = event.target;
   
    setFieldNames({...fieldNames,[name]:value})

}

const handleSubmit = async (event) => {
  event.preventDefault()

  if(password !== confirmPassword){
    alert("Passwords do not match")
  }

  try{

    const {user} = await createAuthUserWithEmailAndPassword(email,password)
   
    await createUserDocumnetFromAuth(user,{displayName})
    resetFormFields()

  }catch(error){
    if(error.code === "auth/email-already-in-use"){
      alert("Cannot create user,user already exists")
    }else{
      console.log("user create encountered error",error)
    }
   
  }

}


  return (
    <div className='sign-up-container'>
    <h2>Don't have an account?</h2>
    <span > Sign up with Email and Password</span>
    <form onSubmit={handleSubmit}>

    <FormInput
    label='Name'
    type="text" required name='displayName' value={displayName}  onChange={handleChange}
    />

    <FormInput
    label='Email'
    type="email" required name='email' value={email} onChange={handleChange}
    />

    <FormInput
    label='Password'
    type="password" required name='password' value={password} onChange={handleChange}
    />

    <FormInput
    label='Confirm Password'
     type="password" required name='confirmPassword' value={confirmPassword} onChange={handleChange}
    />

    <Button type='submit'> Sign Up</Button>
    </form>
    
    
    </div>
  )
}

export default SignUp