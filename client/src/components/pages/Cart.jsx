import React from 'react'
import { useCart, useDispatchCart } from '../ContextReducer';
import {BsFillTrash3Fill } from "react-icons/bs";

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    if(data.length===0)
    {
        return (
            <div className='text-center fs-3 m-5 '>Your cart is empty!</div>
        )
    }

    let totalPrice = data.reduce((total, food)=>total+food.price, 0);

    const handleCheckOut = async() => {
        let userEmail = localStorage.getItem("userEmail");
        let res = await fetch("https://foodapp-arnm.onrender.com/orderData",
        {method:"POST", 
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({
            order_data:data,
            email:userEmail,
            order_date: new Date().toDateString()
        })
    })
    console.log("Order Res: ", res);

    if(res.status===200){
        dispatch({type:"DROP"})
    }

    }

  return (
    <div>
        <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
            <table className='table table-hover'>
                <thead className='text-success fs-4 text-center'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Option</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((food, index)=>(
                        <tr className='text-center'>
                            <th scope="row">{index+1}</th>
                            <td>{food.name}</td>
                            <td>{food.qty}</td>
                            <td>{food.size}</td>
                            <td>{food.price}</td>
                            <td><button type="button" className="btn p-0">
                          <BsFillTrash3Fill className='text-danger' onClick={()=>{dispatch({type:"REMOVE", index:index})}}/>
                            </button></td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
            <div><button className="btn bg-success mt-5" onClick={handleCheckOut}>Checkout</button></div>
        </div>
    </div>
  )
}
