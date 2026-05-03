import { createContext, useEffect } from 'react';

import React from 'react';
import axios from 'axios';
const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartitems, setcartitems] = React.useState([]);
    useEffect(() => {
        localStorage.setItem("cartitems", JSON.stringify(cartitems));
    }, [cartitems]);
    
    const [Token , setToken] = React.useState("");
    const [food_list, setfood_list] = React.useState([]);

    const addtocart = async (itemid) => {
        if(!cartitems[itemid]){
            // console.log(itemid)
            setcartitems((prev)=>({...prev,[itemid]:1}));
        }
        else{
            setcartitems((prev)=>({...prev,[itemid]:prev[itemid]+1}));
        }
        if(Token)
        {
            try {
                const response=await axios.post("http://localhost:4000/api/cart/add",{
                    _id:itemid
                },{
                    headers:{
                        Token
                    }
                });
                if(response.status!==200)
                {
                    console.log("Failed to add item to cart");
                    return;
                }
                // console.log("Item added to cart successfully");
            } catch (error) {
                console.log("Failed to add item to cart",error);
            }
        }
        
    };
    const removefromcart = async (itemid) => {
        if(cartitems[itemid]){
            setcartitems((prev)=>({...prev,[itemid]:prev[itemid]-1}));
        }
        if(Token)
        {
            try {
                const response=await axios.post("http://localhost:4000/api/cart/remove",{
                    _id:itemid
                },{
                    headers:{
                        Token
                    }
                });
                if(response.status!==200)
                {
                    console.log("Failed to remove item from cart");
                    return;
                }
                // console.log("Item removed from cart successfully");
            } catch (error) {
                console.log("Failed to remove item from cart",error);
            }
        }
    }
    // const loadcartdata=async()=>{
    //     if(Token)
    //     {
            
    //             const response=await axios.get("http://localhost:4000/api/cart/items",
    //                 {headers: {
    //                     token:Token
    //                 }}
    //             );
    //             // console.log(response.data);
    //             if(response.status!==200)
    //             {
    //                 console.log("Failed to load cart data");
    //                 return;
    //             }

    //             console.log("Cart data loaded successfully",response.data.cartData);
    //             setcartitems(response.data.cartData);
                
            
    //     }
    // }
    // useEffect(() => {
    //     console.log(cartitems);

    // }, [cartitems]);

    

    const fetchfoodlist=async()=>{
        try {
            const response=await axios.get("http://localhost:4000/api/food/list");
                if(response.status!==200)
                {
                    console.log("Failed to fetch food list items");
                    return;
                }
                // console.log(response.data.foods.data);
            setfood_list(response.data.foods.data);
        } catch (error) {
            console.log("Failed to fetch food list",error);
        }
    }
    useEffect(() => {
        async function loadTokenAndCart() {
            await fetchfoodlist();
        const storedToken = localStorage.getItem("token");
        if(storedToken){
            setToken(storedToken);
            console.log("Token loaded from localStorage:", storedToken);
            // await loadcartdata();
            // console.log("Cart data loaded after token set");
            

            
        }}
        loadTokenAndCart();
    },[])
    

    const gettotalcartamount=()=>{
        let totalamount=0;
        for(let item in cartitems)
        {
            if(cartitems[item]>0)
            {
                let iteminfo=food_list.find((food)=>food._id===item);
                totalamount+=cartitems[item]*iteminfo.price;
            }
        }
        return totalamount;
    }
    const contextvalue = {
        // Define your global state and functions here
        food_list,
        cartitems,
        setcartitems,
        addtocart,
        removefromcart,
        gettotalcartamount,
        Token,setToken

    };


    return (
        <StoreContext.Provider value={contextvalue}>
            {props.children}
        </StoreContext.Provider>
    );
}
export { StoreContextProvider , StoreContext}