import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from './Loader'

const Makepayment = () => {

    //Destructure the details passed from the Getproducts component
    //The useLocation hook allows us to get/destructure the properties passed from the previous component
    const {product} = useLocation().state || {}

    //Declare the navigate hook
    const navigate = useNavigate()

    // console.log("The details passed from getproducts are:",product)

    //Below we specify the image based url
    const img_url = "https://kbenkamotho.alwaysdata.net/static/images/"

    //Initialize hooks to manage the state of your application
    const[number,setNumber]=useState("");
    const[loading,setLoading]=useState(false);
    const[success,setSuccess]=useState("");
    const[error,setError]=useState("");
    

    //create a function that will handle the submit action
    const handleSubmit = async (e) =>{
        //Prevent the site from reloading
        e.prevent.Default()

        //update the loading hook
        setLoading(true)

        try{
            //create a form data object
            const formdata = new FormData()

            //append the data from the form data
            formdata.append("phone",number)
            formdata.append("amount",product.product_cost)

            const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/mpesa_payment",formdata)

            //Set loading back to default
            setLoading(false)

            //update the success hook with the message
            setSuccess(response.data.message)
        }
        catch(error){
            //if there is an error, response to the error
            setLoading(false)

            //update the error hook with the error message
            setError(error.message)
        }
    }


  return (
    <div className='row justify-content-center'>
        {/* <button className='btn btn-primary'>Back to Product</button> */}
        <h1 className="text-success">Make Payment - Lipa na Mpesa</h1>

        <div className="col-md-1">
            <input type="button"
            className='btn btn-primary'
            value="<--Back" 
            onClick={()=> navigate("/")}/>
        </div>

        <div className="col-md-6 card shadow p-4">
            <img src={img_url+product.product_photo} alt="Product Name" className='product_img' />

            <div className="card-body">
                <h2 className="text-info"> {product.product_name}</h2>

                <p className="text-dark">{product.product_description}</p>

                <b className='text-warning'>Kes {product.product_cost}</b> <br />

                <form onSubmit={handleSubmit}>

                    {/* Bind the loading hook */}
                    {loading && <Loader/>}
                     
                    <h3 className="text-success">{success}</h3>
                    <h4 className="text-danger">{error}</h4>

                    <input type="tel"
                    className='form-control'
                    placeholder='Enter the phone number 254xxxxxx'
                    required 
                    value={number}
                    onChange={(e)=> setNumber(e.target.value)}/> <br />
                    {/* {number} */}

                    <input type="submit"
                    value="Make Payment"
                    className='btn btn-success' />
                </form>
            </div>
        </div>
    </div>
  )
}

export default Makepayment