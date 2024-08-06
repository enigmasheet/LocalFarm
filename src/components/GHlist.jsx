// src/components/GHlist.jsx
import {useState,useEffect} from 'react'
import GHcard from './GHcard'
import axios from 'axios'

const GHlist = () => {
 
    const [GHs,setGHs] = useState([])
  
    useEffect(()=>{
      const getGHs=  async()=>{
        try{
          const res = await axios.get('http://localhost:3000/greenhouses')
          setGHs(res.data)
        }
        catch(error){
          console.log(error)
        }
      }
      getGHs()
    },[])
    return (
      <div>
         {
          GHs?.map(GH =>(
            <GHcard key={GH.id} GH={GH} />
          ) )
         }
      </div>
    )
  }
export default GHlist