import React,{useState} from 'react'
import FormInput from '../form-input/form-input.component';
import "../sign-in-form/sign-in-form.styles.scss"
import { signInAuthUserWithEmailAndPassword,signInWithGooglePopup ,createUserDocumnetFromAuth} from '../../utils/firebase.utils';
import Button from '../button/button.component';

const SignIn = () => {

const defaultFieldNames = {
  
    email:"",
    password:"",
    
}

const resetFormFields = () => {
  setFieldNames(defaultFieldNames);
}

const signInWithGoogle = async () => {
  const {user} = await signInWithGooglePopup();
 await createUserDocumnetFromAuth(user)
};



const [fieldNames,setFieldNames] = useState(defaultFieldNames);
const {email,password} = fieldNames;
 
const handleChange = (event) =>{
    const {name,value} = event.target;
   
    setFieldNames({...fieldNames,[name]:value})

}

const handleSubmit = async (event) => {
  event.preventDefault()



  try{
    const response = await signInAuthUserWithEmailAndPassword(email,password)
    console.log(response)

    resetFormFields();

  }catch(error){
    switch(error.code){
      case "auth/invalid-login-credentials":
        alert("Invalid Credentials");
        console.log(error);
        break;
      default:
        console.log(error);
    }
    
   
  }

}


  return (
    <div className='sign-up-container'>
    <h2>Already have an account?</h2>
    <span > Sign up with Email and Password</span>
    <form onSubmit={handleSubmit}>

  

    <FormInput
    label='Email'
    type="email" required name='email' value={email} onChange={handleChange}
    />

    <FormInput
    label='Password'
    type="password" required name='password' value={password} onChange={handleChange}
    />

    <divc className="buttons-container">
    <Button type='submit'> Sign In</Button>
    <Button  buttonType="google" onClick={signInWithGoogle}> Google Sign In</Button>
    
    </divc>
    
   
    </form>
    
    
    </div>
  )
}

export default SignIn