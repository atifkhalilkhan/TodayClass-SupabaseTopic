import { useState } from "react";
import supabase from "./dbconfig/db"

export default function App() {
  const [listData,setListData] = useState<any[]>([])

  const post = async ()=>{
    const {error} = await supabase.from("Tickets").insert({
      title:"Test Ticket",
      status: "Pending"
    })
    console.log(error);
  }
  const get = async ()=>{
    const {data,error} = await supabase.from("Tickets").select("*")
    console.log(data);
    setListData(data || [])
  }

  const del = async (id:number)=>{
    const response = await supabase.from("Tickets").delete().eq("id",id)
    console.log(response);
    get()
  }

  return <>
    <button onClick={get}>Get</button>
    <button onClick={post}>Post</button>

    {listData.map((item) => (
      <div key={item.id}>
        <h3>{item.title}</h3>
        <p>{item.status}</p>
        <button onClick={() => del(item.id)}>Delete</button>
      </div>
    ))}
  </>
}