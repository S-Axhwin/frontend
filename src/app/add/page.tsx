"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useState } from "react"

import axios from "axios";
import action from "./action";

const page = () => {

  const [formData, setformData] = useState<any>();
  const handleSubmit = async () => {
    
  }

  const handleChanges = (e:any) => {
    e.preventDefault();
    const topic = e.target.name;
    const value = e.target.value;
    setformData({...formData, [topic]: value});
    
  }

  const checkState = async (e:any) => {
    e.preventDefault();
    console.log(formData);
    const res = await axios.post("http://localhost:8080/api/v1/add", {...formData});
    action();
  }
  return (
    <div className="grid w-full h-screen place-items-center">
        <form onSubmit={checkState} className="flex flex-col gap-3">
            <Input
            placeholder="enter emp name"
            onChange={handleChanges}
            name="name"/>
            <Input
            placeholder="enter emp email"
            onChange={handleChanges}
            name="email"/>

            <Button className="flex w-full">Add User</Button>
        </form>
    </div>
  )
}

export default page