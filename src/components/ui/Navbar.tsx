"use client"
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  const {isLoaded, user} = useUser();
  console.log(isLoaded, user);
  if(!user) return <div className="flex justify-end p-4"><SignInButton /></div>
  return (
    <div>
    <header className="flex justify-between p-5  z-100">
    
    <div>
        <ul className="flex gap-3">
            <Link href={"/"}>Home</Link>
            <Link href={"/view"}>View</Link>
            <Link href={"/add"}>Add</Link>
        </ul>
    </div>
    <div>
        <SignedOut>
        </SignedOut>
        <SignedIn><UserButton /></SignedIn>
    </div>
    </header>
    </div>
  )
}

export default Navbar