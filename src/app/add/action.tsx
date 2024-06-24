"use server"
import { redirect } from "next/navigation"

const action = () => {
    redirect("/view")
}
export default action