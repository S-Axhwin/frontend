"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { Edit } from "./dialog";
const page = () => {
  const [records, setRecords] = useState<any>();
  const [trigger, settrigger] = useState(true);
  useEffect(() => {
    (async() => {
        const res = await axios.get("http://localhost:8080/api/v1/view");
        setRecords(res.data.records);
    })()
  }, [trigger])

  const deleteuser =async (email: String) => {
    const conf = window.confirm("do you wanna to delete user"+email+" ?");
    
    if(!conf) return 0;
    
    await axios.post("http://localhost:8080/api/v1/delete", {email});
    settrigger(!trigger);
  }

  const updateUser = async (email:string, newName:string) => {
    await axios.post("http://localhost:8080/api/v1/update", {email, newName})
    settrigger(!trigger);
  }
  return (
    <div className="grid place-items-center w-full h-screen">
        <div className="flex flex-col gap-3">
    {records?.map((item:any, ind:any) => {
        return (
            <div key={ind} className="bg-slate-700 p-3 rounded-xl">
                {item.name} : {item.email}
                <Edit updateUser={updateUser} email={item.email} />
            </div>
        )
    })}
    </div>
    </div>

  )
}

export default page