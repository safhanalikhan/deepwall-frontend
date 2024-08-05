import {useState , useEffect} from 'react';
import styled , {keyframes } from 'styled-components';
import Link from 'next/link';

function SweetAlert({message , dis , setdis}){

    // useEffect(()=> {
    //     if(dis){
    //         setTimeout(()=> {
    //             setdis(false)
    //         }, 3000)
    //     }
    // }
    // ,[dis])
    const fadedown = keyframes`
        from {
            right: -100%;
        }
        to {
            right: 0%;
        }
    `;
    const Alert = styled.div`
        animation: ${fadedown} 0.3s linear 1;
        position:fixed;
        bottom:20px;
        right:20px;
        // height:20px;
        color:#d9121f;
        background-color:#fff;
        border-radius:5px;
        display:${dis ? "flex" : "none"};
        align-items:center ;
        gap:15px;
        z-index:1000;
        box-shadow:2px 5px 20px #00000020;
        .close-btn{
            background-color:#e3e3f599;
            height: 30px;
            width: 30px;
            display: grid;
            border-radius: 50%;
            place-items: center;
            cursor:pointer
        }
    }
    `;
    const CartLink = styled(Link)`
        // display: block;
        color:#c6101c;
        padding: 10px 0;
        margin-left:0.5rem;
        font-weight:500;
        text-decoration:undeline;
        @media screen and (min-width: 768px) {
            padding:0;
        }
    `;


  return (
    dis ?
    <Alert className='px-3 py-2  ' >
        <i className="bi bi-hand-thumbs-up"></i>
        <div className='me-5' > {message} <CartLink href={'/cart'}> view cart  </CartLink></div>
        <div className='close-btn ' onClick={()=>setDisplay(false)} >
            <i className="bi bi-x fs-5"></i>
        </div>
    </Alert>
    : false
    
  )
}

export default SweetAlert