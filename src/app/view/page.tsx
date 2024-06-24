"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Edit } from "./dialog";
const page = () => {
  const [records, setRecords] = useState<any>();
  const [trigger, settrigger] = useState(true);
  const { toast } = useToast()
  useEffect(() => {
    (async() => {
        const res = await axios.get("http://localhost:8080/api/v1/view");
        setRecords(res.data.records);
    })()
  }, [trigger])

  const deleteuser =async (email: String) => {
    const conf = window.confirm("do you wanna to delete user"+email+" ?");
    
    if(!conf) return 0;
    
    
  }

  const updateUser = async (email:string, newName:string) => {
    try{
      await axios.post("http://localhost:8080/api/v1/update", {email, newName});
      settrigger(!trigger);
      toast({
        title: "User update",
        description: `user name update from to `
      })
    } catch (e) {
      toast({
        title: "User not updated",
        description: "error while updating user"
      })

    }
  }
  return (
    <div className="grid place-items-center w-full h-screen ">
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