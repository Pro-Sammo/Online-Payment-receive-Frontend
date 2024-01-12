"use client";

import React from "react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { Toaster, toast } from "sonner";

function Page() {
  const [name, setName] = React.useState("");
  const [roll, setRoll] = React.useState("");
  const [registration, setRegistration] = React.useState("");
  const [shift, setShift] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const variant = "flat";

  const createHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/studentregister`,
        {
          name,
          roll,
          registration,
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
      setName("");
      setRoll("");
      setRegistration("");
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
            type="number"
            value={roll}
            variant={variant}
            onValueChange={setRoll}
            label="Roll"
            placeholder="Enter Roll Number Here..."
          />
          <Input
            isRequired
            isClearable
            type="number"
            value={registration}
            variant={variant}
            onValueChange={setRegistration}
            label="Registration"
            placeholder="Enter Registration Number Here..."
          />
          <div>
            <Select
              isRequired={true}
              variant={variant}
              size="lg"
              label="Select Shift"
              placeholder="Select Shift"
              selectedKeys={[shift]}
              defaultSelectedKeys={["1st"]}
              onChange={(e) => setShift(e.target.value)}
            >
              <SelectItem key={"1st"} value={"1st"} textValue="1st">
                <p className="dark:text-white">
                  1<sup>st</sup>
                </p>
              </SelectItem>
              <SelectItem key={"2nd"} value={"2nd"} textValue="2nd">
                <p className="dark:text-white">
                  2<sup>nd</sup>
                </p>
              </SelectItem>
            </Select>
          </div>

          <div>
            <Select
              variant={variant}
              isRequired={true}
              size="lg"
              label="Select Semester"
              placeholder="Select Semester"
              selectedKeys={[department]}
              onChange={(e) => setDepartment(e.target.value)}
            >
              {/* ["cst","civil","power","mechanical","rac","electrical"] */}
              <SelectItem key={"cst"} value={"cst"} textValue="cst">
                cst
              </SelectItem>
              <SelectItem key={"civil"} value={"civil"} textValue="civil">
                civil
              </SelectItem>
              <SelectItem
                key={"electrical"}
                value={"electrical"}
                textValue="electrical"
              >
                electrical
              </SelectItem>
              <SelectItem
                key={"mechanical"}
                value={"mechanical"}
                textValue="mechanical"
              >
                mechanical
              </SelectItem>
              <SelectItem key={"power"} value={"power"} textValue="power">
                power
              </SelectItem>
              <SelectItem key={"rac"} value={"rac"} textValue="rac">
                rac
              </SelectItem>
            </Select>
          </div>

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
