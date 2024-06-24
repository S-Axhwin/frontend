"use client"
import { useUser } from "@clerk/nextjs";
import axios from "axios"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Edit } from "./dialog";
import something from "../something1.png"
//frontend/src/app/something.png
import redi from "./redi";
import Image from "next/image";
const page = () => {
  const { user, isLoaded } = useUser();
  if(!isLoaded) return "Loading";
  if(isLoaded && !user) redi();
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
    
    try{
      await axios.post("http://localhost:8080/api/v1/delete", {email});
      settrigger(!trigger);
      toast({
        title: "User deleted",
        description: `user deleted bruh!`
      })
    } catch (e) {
      toast({
        title: "User not deleted",
        description: "error while deleting user"
      })

    }
  }

  const updateUser = async (email:string, newName:string) => {
    try{
      await axios.post("http://localhost:8080/api/v1/update", {email, newName});
      settrigger(!trigger);
      toast({
        title: "User update",
        description: `user name update from to `
      });
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
            <div key={ind} className="bg-slate-900 border-2 p-3 rounded-xl flex justify-between">
                <div className="m-auto">
                  {item.name} : {item.email}
                </div>
                <Edit updateUser={updateUser} email={item.email} />
                <Image src={something} alt="delete" className="w-[1.5rem] m-2 "  onClick={() => {
                  deleteuser(item.email)
                }} />
            </div>
        )
    })}
    </div>
    </div>

  )
}

export default page