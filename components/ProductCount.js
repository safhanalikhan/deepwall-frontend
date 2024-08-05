import {useState , useEffect } from 'react'

const ProductCount = ({quantity}) => {
  const [count,setCount] = useState(1)
  const updateTextField = (e) => {
    setCount(e.target.value)
  }

  useEffect(() => {
    quantity(count)
  },[count])
  
  return (
    <div className='ProductCount  d-flex align-items-center  btn border-1 border-dark col-3 justify-content-between rounded-pill' >
        <div className='px-2 ' onClick={() => {
          if(count > 1){
            setCount(count - 1)
          }
        }}><i className="bi bi-dash-lg"></i></div>
        <div className='px-3' >{count}</div>
        <div className='px-2' onClick={() => setCount(count + 1)} ><i className="bi bi-plus-lg"></i></div>
    </div>
  )
}

export default ProductCount 