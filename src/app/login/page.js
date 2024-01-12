"use client";

import React from "react";
import { Button, Input, Tabs, Tab } from "@nextui-org/react";
import axios from "axios";
import { Toaster, toast } from "sonner";

const Page = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [registration, setRegistration] = React.useState("");
  const [roll, setRoll] = React.useState("");
  const [isLoading, setisLoading] = React.useState(false);

  const studentloginHandler = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      let response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/studentlogin`,
        {
          registration: registration,
          roll: roll,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let result = response.data;
      toast.success(result.message);
      window.location.reload();
      setisLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setisLoading(false);
    }
  };

  const teacherLoginHandler = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      let response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teacherlogin`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let result = response.data;
      toast.success(result.message);
      window.location.reload();
      setisLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setisLoading(false);
    }
  };

  return (
    <>
      <div className="w-sreen h-96 flex items-center flex-col">
        <Toaster richColors />
        <Tabs
          aria-label="Options"
          variant="flat"
          color="success"
          className="py-10"
          size="lg"
        >
          <Tab key="Student's Login" title="Student's Login" className="w-full">
            <form
              onSubmit={studentloginHandler}
              className="w-full h-full flex flex-col justify-center gap-4 items-center"
            >
              <Input
                label="Registration Number"
                type="text"
                size="lg"
                isRequired
                className="max-w-xs"
                variant="flat"
                value={registration}
                onValueChange={setRegistration}
              />
              <Input
                label="Roll Number"
                type="text"
                size="lg"
                isRequired
                className="max-w-xs"
                variant="flat"
                value={roll}
                onValueChange={setRoll}
              />
              <Button
                className="max-w-xs"
                color="secondary"
                variant="shadow"
                size="lg"
                type="submit"
                isLoading={isLoading}
                disable={isLoading}
                radius="sm"
              >
                Login
              </Button>
            </form>
          </Tab>
          <Tab key="Teacher's Login" title="Teacher's Login" className="w-full">
            <form
              onSubmit={teacherLoginHandler}
              className="w-full h-full flex flex-col justify-center gap-4 items-center"
            >
              <Input
                label="Email"
                type="email"
                size="lg"
                isRequired
                className="max-w-xs"
                variant="flat"
                value={email}
                onValueChange={setEmail}
              />
              <Input
                label="Password"
                type="password"
                size="lg"
                isRequired
                className="max-w-xs"
                variant="flat"
                value={password}
                onValueChange={setPassword}
              />
              <Button
                className="max-w-xs"
                color="secondary"
                variant="shadow"
                size="lg"
                type="submit"
                radius="sm"
                isLoading={isLoading}
                disable={isLoading}
              >
                Login
              </Button>
            </form>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
