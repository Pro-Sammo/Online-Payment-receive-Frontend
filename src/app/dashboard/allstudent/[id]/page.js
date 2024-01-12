"use client";

import React, { useEffect } from "react";
import { Input, Button, Card } from "@nextui-org/react";
import axios from "axios";
import { Toaster, toast } from "sonner";

const Page = ({ params }) => {
  const [name, setName] = React.useState("");
  const [roll, setRoll] = React.useState("");
  const [registration, setRegistration] = React.useState("");
  const [shift, setShift] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    async function getStudentInfo() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/searchstudent/${params.id}`
        );
        const data = response.data;
        setName(data.user.name);
        setRoll(data.user.roll);
        setRegistration(data.user.registration);
        setShift(data.user.shift);
        setDepartment(data.user.department);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    getStudentInfo();
  }, []);

  const updateProfile = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/updatestudentprofile/${params.id}`,
        {
          name,
          shift,
          department,
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
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const variant = "flat";
  return (
    <>
      <div className="w-full h-full ">
        <Toaster richColors />
        <form
          className="flex flex-col gap-4 w-2/5 mx-auto pt-5"
          onSubmit={updateProfile}
        >
          <Input
            isRequired
            type="text"
            value={name}
            variant={variant}
            onValueChange={setName}
            label="Name"
            placeholder="Enter name here..."
          />
          <div>
            <label htmlFor="shift">Select Shift</label>
            <select
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
              value={shift}
              id="shift"
              onChange={(e) => setShift(e.target.value)}
            >
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
            </select>
          </div>

          <div>
            <label htmlFor="department">Select Department</label>
            <select
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
              value={department}
              id="department"
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="cst">cst</option>
              <option value="civil">civil</option>
              <option value="electrical">electrical</option>
              <option value="mechanical">mechanical</option>
              <option value="power">power</option>
              <option value="rac">rac</option>
            </select>
          </div>

          <Button
            isLoading={loading}
            radius="sm"
            variant="flat"
            color="primary"
            type="submit"
            disable={loading}
          >
            Update
          </Button>
        </form>
      </div>
    </>
  );
};

export default Page;
