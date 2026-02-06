'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

const AuthButtons = () => {
  const [loading, setLoading] = useState<boolean>(false)
  return (
    <div className="flex gap-3 flex-1 md:flex-row flex-col">
      <Link href={"/signup"} className="flex-1" >
        <Button className="w-full cursor-pointer bg-slate-900 text-white hover:bg-slate-800 dark:bg-secondary dark:text-secondary-foreground"
          onClick={() => setLoading(true)}
          disabled={loading}
        >
          Sign up
        </Button>
      </Link>

      <Link href={"/login"} className="flex-1">
        <Button className="w-full cursor-pointer"
          onClick={() => setLoading(true)}
          disabled={loading}
        >
          Log in
        </Button>
      </Link>
    </div >
  )
}

export default AuthButtons