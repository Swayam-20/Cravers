import React, { useEffect } from 'react'
import './Additems.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify';
function Additems() {
  const url = "http://localhost:4000";
  const [image, setImage] = React.useState(false);
  const[data, setData] = React.useState({
      name:"",
      description:"",
      category:"salad",
      price:""
  });
  useEffect(() => {
    console.log(data);
  },[data])
  const onchangehandler=(e)=>{

    setData(data=>({...data,[e.target.name]:e.target.value}))
  }
  const onsubmithandler=async(e)=>{
    e.preventDefault();
    const formdata=new FormData();
    formdata.append("name",data.name);
    formdata.append("description",data.description);
    formdata.append("category",data.category);
    formdata.append("price",data.price);
    formdata.append("image",image);

    const response = await axios.post(`${url}/api/food/add`,formdata);
    if(response.status===200)
    {
      // alert("Food item added successfully");
      setData({
        name:"",
        description:"",
        category:"salad",
        price:""
      })
      setImage(false);
      toast.success(response.data.new_item.message);
    }
    else{
      toast.error("Failed to add food item");
    }

  }

  return (
    <div className="add">
      <form onSubmit={onsubmithandler} action="" className="flex-col">
        <div className="add-img-upload flex-col">
          <label htmlFor="image" className="custom-file-upload">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            <p>Upload Image</p>
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} id="image" type="file"  hidden required />
        </div>
        <div className="add-product-name flex-col">
          <label htmlFor="name">Product Name</label>
          <input onChange={onchangehandler} value={data.name} id="name" name="name" type="text" placeholder='Enter product name' required />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onchangehandler} value={data.description} name="description" id="description" cols="30" rows="6" placeholder='Enter product description' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <label htmlFor="category">Category</label>
            <select onChange={onchangehandler} value={data.category} name="category" id="category" required>
              <option value="">Select category</option>
              <option value="Salad">salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Deserts">Dessert</option>
              <option value="cake">cake</option>
              <option value="Pure veg">pure veg</option>
              <option value="Pasta">pasta</option>
              <option value="Noodles">noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <label htmlFor="price">Product Price</label>
            <input onChange={onchangehandler} value={data.price} id="price" name="price" type="number" placeholder='$20' required />
          </div>
          
        </div>
        <button type='submit' className="add-btn">Add Item</button>
      </form>
    </div>
  )
}

export default Additems