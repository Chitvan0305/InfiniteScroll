import React from 'react'

const ProductCard = ({thumbnail, id}) => {
  return (
    <div style={{backgroundColor:"#fff", width:"100%", height:"250px"}} data-id = {id}>
        <img src={thumbnail} style={{width:"100%"}} />
    </div>
  )
}

export default ProductCard