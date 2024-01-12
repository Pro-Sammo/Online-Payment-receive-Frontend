"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Button,
  Input,
  Tooltip,
} from "@nextui-org/react";
import { Toaster, toast } from "sonner";
import React from "react";
import axios from "axios";
import useSWR, { mutate } from "swr";

function Page() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getalladmin`,
    fetcher,
    {
      keepPreviousData: true,
      refreshInterval: 10000,
    }
  );
  const loadingState =
    isLoading || data?.admin.length === 0 ? "loading" : "idle";

  console.log(data);

  const changeRole = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/changeadminrole?id=${id}`
      );
      const data = await response.data;
      toast.success(data.message);
      mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getalladmin`);
    } catch (error) {
      // console.log(error.response)
      // toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Toaster richColors />
      <Table
        aria-label="Example table with client async pagination"
        className="px-8 py-8"
      >
        <TableHeader>
          <TableColumn key="created_At">Created At</TableColumn>
          <TableColumn key="ID">ID</TableColumn>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="email">Email</TableColumn>
          <TableColumn key="Role">Role</TableColumn>
          <TableColumn key="Switch_Role">Switch Role</TableColumn>
        </TableHeader>
        <TableBody
          items={data?.admin ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow key={item?._id}>
              <TableCell>
                {new Date(item?.createdAt).toISOString().slice(0, 10)}
              </TableCell>
              <TableCell>{item?._id}</TableCell>
              <TableCell>{item?.name}</TableCell>
              <TableCell>{item?.email}</TableCell>
              <TableCell>{item?.role}</TableCell>
              <TableCell>
                <Button
                  key={item?._id}
                  redius="sm"
                  color="primary"
                  onClick={() => changeRole(item._id)}
                >
                  {item?.role === "user" ? "Admin" : "User"}
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default Page;
