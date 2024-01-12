"use client";

import React from "react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { Toaster, toast } from "sonner";

function Page() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const variant = "flat";

  const createHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teacherregister`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      toast.success(data.message);
      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="w-full h-full ">
        <Toaster richColors />
        <form
          onSubmit={createHandler}
          className="flex flex-col gap-4 w-2/5 mx-auto pt-5"
        >
          <Input
            isRequired
            isClearable
            type="text"
            value={name}
            variant={variant}
            onValueChange={setName}
            label="Name"
            placeholder="Enter name Here..."
          />
          <Input
            isRequired
            isClearable
            type="text"
            value={email}
            variant={variant}
            onValueChange={setEmail}
            label="Email"
            placeholder="Enter Email Here..."
          />
          <Input
            isRequired
            isClearable
            type="password"
            value={password}
            variant={variant}
            onValueChange={setPassword}
            label="password"
            placeholder="Enter Password Here..."
          />
          <Button
            isLoading={loading}
            disable={loading}
            radius="sm"
            variant="flat"
            color="primary"
            type="submit"
          >
            CREATE
          </Button>
        </form>
      </div>
    </>
  );
}

export default Page;
