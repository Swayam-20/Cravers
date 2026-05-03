import React from 'react'
import './Home.css'
import{ useState } from 'react'
import Header from '../../component/Header/Header'
import ExploreMenu from '../../component/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../component/FoodDisplay/FoodDisplay'
import AppDownload from '../../component/AppDownload/AppDownload'
function Home() {
    const[category,setcategory] = useState("All")
  return (
    <>
    <div id="home">
        <Header/>
        <ExploreMenu category={category} setcategory={setcategory}/>
        <FoodDisplay category={category}/>
        <AppDownload/>
    </div>
    </>
  )
}

export default Home