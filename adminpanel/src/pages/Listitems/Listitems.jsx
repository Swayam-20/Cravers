import React from 'react'
import './Listitems.css'
import { toast } from 'react-toastify';
import axios from 'axios';

function Listitems() {
    
    const url= 'http://localhost:4000'

    const [list, setList] = React.useState([])
    const fetchlist= async()=>{
        const res= await axios.get(`${url}/api/food/list`)

        if(res.status!==200)
        {
            toast.error("Failed to fetch food items");
            return;
        }
        const data=res.data.foods.data;
        console.log(data);
        setList(res.data.foods.data)
    }

    React.useEffect(() => {
        fetchlist();
    }, [])

    const deleteitem=async(id)=>{
        console.log(id);
        const res= await axios.post(`${url}/api/food/delete`,{id:id})
        if(res.status!==200)
        {
            toast.error("Failed to delete food item");
            return;
        }
        toast.success(res.data.message.message);
        fetchlist();
    }
    return (
    <>
    <div className="list">
        <p>All list items</p>
        <div className="list-table">
            <div className="list-table-format title">
                <b>Name</b>
                <b>Description</b>
                <b>Category</b>
                <b>Price</b>
                <b>image</b>
                <b>delete</b>
            </div>
            {
                list.map((item)=>(
                    <div key={item._id} className="list-table-format">
                        <p>{item.name}</p>
                        <p>{item.description}</p>
                        <p>{item.category}</p>
                        <p>{item.price}</p>
                        
                        <img src={`${url}/Uploads/${item.imageUrl}`} alt="" />
                        <p onClick={()=>deleteitem(item._id)} className='cursur'>❌</p>
                    </div>
                ))
            }
        </div>
    </div>
    </>
  )
}

export default Listitems