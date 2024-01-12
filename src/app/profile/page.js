"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";
import axios from "axios";
export default function Page() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    function getmyprofile() {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getmyprofile`, {
          withCredentials: true,
        })
        .then((response) => response.data)
        .then((data) => setUser(data.user))
        .catch((error) => console.log(error));
    }
    getmyprofile();
  }, []);

  return (
    <>
      <div className="px-6">
        <div className="w-full flex flex-col justify-center  items-center border border-gray-500 rounded-md py-2 bg-gray-200 dark:bg-black dark:text-white">
          <p className="text-2xl font-sans">This is profile page</p>
          <p className="text-xl">
            Name: <span className="font-semibold">{user.name}</span>{" "}
          </p>
          <p className="text-xl">
            Roll: <span className="font-semibold">{user.roll}</span>
          </p>
          <p className="text-xl">
            Registration Number:{" "}
            <span className="font-semibold">{user.registration}</span>
          </p>
        </div>
        <div className="py-6">
          <h1 className="text-center text-2xl py-2">Payment History</h1>
          {user?.allpayment?.length > 0 ? (
            <Table
              aria-label="Example static collection table"
              className="px-2"
            >
              <TableHeader>
                <TableColumn>PAYMENT DATE</TableColumn>
                <TableColumn>STUDENT NAME</TableColumn>
                <TableColumn>Email Address</TableColumn>
                <TableColumn>ROLE NUMBER</TableColumn>
                <TableColumn>SEMESTER</TableColumn>
                <TableColumn>SHIFT</TableColumn>
                <TableColumn>TRANSECTION ID</TableColumn>
                <TableColumn>FEE TYPE</TableColumn>
                <TableColumn>PAYMENT AMOUNT</TableColumn>
                <TableColumn>PAYMENT STATUS</TableColumn>
              </TableHeader>
              <TableBody>
                {user?.allpayment?.map((data) => {
                  return (
                    <TableRow key={data._id}>
                      <TableCell>
                        {new Date(data.createdAt).toISOString().slice(0, 10)}
                      </TableCell>
                      <TableCell>{data.name}</TableCell>
                      <TableCell>{data.email}</TableCell>
                      <TableCell>{data.roll}</TableCell>
                      <TableCell>{data.semester}</TableCell>
                      <TableCell>{data.shift}</TableCell>
                      <TableCell>{data.transection_Id}</TableCell>
                      <TableCell>{data.feetype}</TableCell>
                      <TableCell>{data.payment_amount}</TableCell>
                      <TableCell>
                        <Chip
                          color={
                            data.payment_status == "success"
                              ? "success"
                              : "danger"
                          }
                        >
                          {data.payment_status}
                        </Chip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <h1 className="text-center">No Payment Yet</h1>
          )}
        </div>
      </div>
    </>
  );
}
