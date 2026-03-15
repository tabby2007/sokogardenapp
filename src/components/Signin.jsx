import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {

  //Define the two hooks for capturing/storing the users input
  const[email,setEmail]= useState("");
  const[password,setPassword]= useState();

  //Declare the three additional hooks
  const[loading,setLoading]=useState("");
  const[success,setSuccess]=useState("");
  const[error,setError]=useState("");

  //below we have the useNavigate hook to redirect us to another page on successful login
  const navigate = useNavigate()

  //below is the function to handle the sirgrin action
  const handleSubmit = async (e)=>{
    //prevent the site from reloading
    e.preventDefault()

    //update the loading hook with a message
    setLoading("Please wait while we aunthenticate your account...")

    try{
      //create a formData object that will hold the email and the password
      const formdata = new FormData()

      //Insert/append the email and the password on the formData created
      formdata.append("email",email)
      formdata.append("password",password);

      //interact with the axios for the response
      const response= await axios.post("https://tabbyondego.alwaysdata.net/api/signin",formdata)

      //Set loading back to default
      setLoading("");

      //Check whether the user exists as part of your response from the API
      if(response.data.user){
        //if user is there, definetly he details entered during sign in are correct
        // setSuccess("Login successful")

        // Store user details in local storage
    localStorage.setItem("user", JSON.stringify(response.data.user));

        //if it is successful, let a person get redirected to another page
        navigate("/")

      }
      else{
        //user is not found, that means the credentials entered on the form are incorrect
        setError("Login failed. Please try again...")
      }
    }
    catch(error){
      //set loading back to default
      setLoading("")

      //Update the error hook with message
      setError("Oops,something went wrong.Try again...")
    }
  }

  return (
    <div className='row justify-content-center mt-4'>
        <div className='col-md-6 card shadow p-4'>
          <h1 className='text-primary'>Sign In</h1>
          <h5 className="text-info">{loading}</h5>
          <h3 className="text-success">{success}</h3>
          <h4 className="text-danger">{error}</h4>

          <form onSubmit={handleSubmit}>
            <input type="email"
            placeholder='Enter the email address'
            className='form-control'
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}/> <br />
            {/* {email} */}

            <input type="password"
            placeholder='Enter the password here'
            className='form-control'
            required
            value={password}
            onChange={(e) =>setPassword(e.target.value)} /> <br />
            {/* {password} */}

            <input type="submit"
            value= "Sign In"
            className='btn btn-primary'/> <br /> <br />

            Already have an account? <Link to={'/signin'}>signin</Link>
          </form>
        </div>
    </div>
  )
}

export default Signin;