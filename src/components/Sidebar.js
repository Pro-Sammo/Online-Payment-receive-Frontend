"use client"

import { usePathname } from 'next/navigation'
import Link from "next/link";
import { Button } from "@nextui-org/react";

const Sidebar = () => {

  const pathname = usePathname()


  const variant = "light";
  const color = "primary";
  const radius = "sm";
  return (
    <>
      <div className="w-[15vw] h-full overflow-y-auto  border-r-[0.1px] border-gray-400 flex flex-col items-center gap-9 pt-4">
        <Button variant={variant} color={pathname=="/dashboard"?color:""} radius={radius}>
          <Link href="/dashboard">
            <h1 className="font-semibold text-lg">Receiving Payment</h1>
          </Link>
        </Button>
        <Button variant={variant} color={pathname=="/dashboard/search"?color:""} radius={radius}>
          <Link href="/dashboard/admin">
            <h1 className="font-semibold text-lg">Admin</h1>
          </Link>
        </Button>
        <Button variant={variant} color={pathname=="/dashboard/allstudent"?color:""} radius={radius}>
          <Link href="/dashboard/allstudent">
            <h1 className="font-semibold text-lg">All Student</h1>
          </Link>
        </Button>
        <Button variant={variant} color={pathname=="/dashboard/addstudent"?color:""} radius={radius}>
          <Link href="/dashboard/addstudent">
            <h1 className="font-semibold text-lg">Create Student</h1>
          </Link>
        </Button>
        <Button variant={variant} color={pathname=="/dashboard/createadmin"?color:""} radius={radius}>
          <Link href="/dashboard/createadmin">
            <h1 className="font-semibold text-lg">Create Admin</h1>
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Sidebar;
