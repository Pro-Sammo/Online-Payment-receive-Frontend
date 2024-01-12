"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <Button>
          <Link href={"/payment"}>payment</Link>
        </Button>
      </div>
    </>
  );
}
