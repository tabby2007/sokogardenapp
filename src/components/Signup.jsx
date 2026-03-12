import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
  //Initialize the hooks
  const [username, setUsername]= useState("");
  const[email, setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[phone,setPhone] = useState("");

  //Define the three states an application will move to
  const[loading,setLoading]=useState("");
  const[success,setSuccess]=useState("");
  const[error,setError]=useState("");

  //Below is a function that will handle the submit action
  const handleSubmit =async(e)=>{
    //Below we prevent our site from reloading
    e.preventDefault()

    //Update our loading hook with a message that will be displayed to the users who are trying to register
    setLoading("Please wait as registration continues...")

    try{
      //create a form data object that will enable you to capture the four details entered on the form
      const formdata= new FormData();

      //Insert the four details(username, email, password, phone) in terms of key-value pairs
      formdata.append("username", username);
      formdata.append("email",email);
      formdata.append("password",password);
      formdata.append("phone",phone);

      //By use of axios, we can access the method post
      const response =await axios.post("https://tabbyondego.alwaysdata.net/api/signup",formdata)

      //set back the loading to default
      setLoading("");

      //Just incase everything goes on weel, update the success hook with a message
      setSuccess(response.data.Message)

      //Clear your hooks
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");

       setTimeout(() => {
    setSuccess("");
  }, 5000);

    }
    catch(error){
      //Set the loading back to default
      setLoading("");

      //Update the error hook with the message given back from the response
      setError(error.message)
    }
  }


  return (
    <div className='row justify-content-center mt-4'>
        <div className="card col-md-6 shadow p-4">
          <h1 className='text-primary'>Sign Up</h1>

          <h5 className="text-warning"> {loading}</h5>
          <h3 className="text-success">{success}</h3>
          <h4 className="text-danger">{error}</h4>

          <form onSubmit={handleSubmit}>

            <input type="text"
            placeholder='Enter the username'
            className='form-control'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required /> <br />

            {/* {username} */}

            <input type="email"
            placeholder='Enter the email address'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)} /> <br />

            {/* {email} */}

            <input type="password"
            placeholder='Enter the password'
            className='form-control' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}/> <br />

            {/* {password} */}

            <input type="tel"
            placeholder='Enter the mobile phone number'
            className='form-control'
            value={phone}
            onChange={(e) => setPhone(e.target.value)} /> <br />

            {/* {phone} */}

            <input type="submit" value="Signup" className='btn btn-primary' /> <br /><br />

            Already have an account? <Link to={'/signin'}>signin</Link>
          </form>
        </div>
    </div>
  )
}

export default Signup;