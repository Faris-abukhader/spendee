import React from 'react'
import Lottie from 'react-lottie'
import errorAnimation from "../../public/lottie/error.json"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Error(props) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: errorAnimation,
      };
      function modal(){
        const MySwal = withReactContent(Swal)
        MySwal.fire({
          title:<Lottie options={defaultOptions} style={{width:'200px',height:'200px'}}/>,
          text:props.message,
          timer: 3500,
          showCancelButton:false,
          showConfirmButton:false
        })     
    }

if(props.show){modal()}
  return (<></>)
}
