"use client";
import React from "react";
import axios from "axios";
import { Select, SelectItem, Input, Button } from "@nextui-org/react";

const Page = () => {
  const [semester, setSemester] = React.useState("");
  const [shift, setShift] = React.useState("");
  const [fee, setFee] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payment`,
        {
          email: email,
          semester: semester,
          shift: shift,
          feetype: fee,
          amount: amount,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data)
      .then((result) => window.location.replace(result.url))
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full min-h-screen  bg-no-repeat bg-fixed overflow-x-hidden dark:text-white dark:bg-black py-8">
      <h2 className="text-center  text-green-500 text-3xl font-bold pb-11 py-5">
        Pay Your Fee Online
      </h2>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col items-center justify-center w-full  gap-4 flex-wrap lg:px-40 md:px-40">
          <div className="flex flex-col w-60 lg:w-80">
            <Input
              isRequired={true}
              variant="flat"
              size={"lg"}
              type="email"
              label="Enter Your Email"
              value={email}
              onValueChange={setEmail}
            />
          </div>
          <div className="flex w-60  flex-col gap-2 lg:w-80">
            <Select
              variant="flat"
              isRequired={true}
              size="lg"
              label="Select Semester"
              placeholder="Select Semester"
              selectedKeys={[semester]}
              defaultSelectedKeys={["1st"]}
              onChange={(e) => setSemester(e.target.value)}
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
              <SelectItem key={"3rd"} value={"3rd"} textValue="3rd">
                <p className="dark:text-white">
                  3<sup>rd</sup>
                </p>
              </SelectItem>
              <SelectItem key={"4th"} value={"4th"} textValue="4th">
                <p className="dark:text-white">
                  4<sup>th</sup>
                </p>
              </SelectItem>
              <SelectItem key={"5th"} value={"5th"} textValue="5th">
                <p className="dark:text-white">
                  5<sup>th</sup>
                </p>
              </SelectItem>
              <SelectItem key={"6th"} value={"6th"} textValue="6th">
                <p className="dark:text-white">
                  6<sup>th</sup>
                </p>
              </SelectItem>
              <SelectItem key={"7th"} value={"7th"} textValue="7th">
                <p className="dark:text-white">
                  7<sup>th</sup>
                </p>
              </SelectItem>
              <SelectItem key={"8th"} value={"8th"} textValue="8th">
                <p className="dark:text-white">
                  8<sup>th</sup>
                </p>
              </SelectItem>
            </Select>
          </div>
          <div className="flex w-60  flex-col gap-2 lg:w-80">
            <Select
              isRequired={true}
              variant="flat"
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
          <div className="flex w-60  flex-col gap-2 lg:w-80">
            <Select
              isRequired={true}
              variant="flat"
              size="lg"
              label="Select Fee Type"
              placeholder="Select Shift"
              selectedKeys={[fee]}
              defaultSelectedKeys={["1st"]}
              onChange={(e) => setFee(e.target.value)}
            >
              <SelectItem
                key={"Session Fee"}
                value={"Session Fee"}
                textValue="Session Fee"
              >
                <p className="dark:text-white">Session Fee</p>
              </SelectItem>
              <SelectItem
                key={"Exam Fee"}
                value={"Exam Fee"}
                textValue="Exam Fee"
              >
                <p className="dark:text-white">Exam Fee</p>
              </SelectItem>
            </Select>
          </div>
          <div className="flex flex-col w-60 lg:w-80">
            <Input
              isRequired={true}
              variant="flat"
              size={"lg"}
              type="text"
              label="Enter Fees Amount"
              placeholder="e.g. 1570"
              value={amount}
              onValueChange={setAmount}
            />
          </div>
        </div>
        <div className="w-full flex justify-center mt-8">
          <Button
            className="mx-auto"
            type="submit"
            color="primary"
            variant="shadow"
            size="lg"
            isLoading={loading}
          >
            Payment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
