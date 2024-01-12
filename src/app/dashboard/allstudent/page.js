"use client";

import React, { useMemo } from "react";
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
import { useDisclosure } from "@nextui-org/react";
import useSWR, { mutate } from "swr";
import { Toaster, toast } from "sonner";
import axios from "axios";
import Model from "@/components/ModelComponent";
import {
  Trash2,
  SearchIcon,
  PencilLine,
  CalendarClockIcon,
} from "lucide-react";
import Link from "next/link";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page() {
  const [page, setPage] = React.useState(1);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [roll, setRoll] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getallstudent?page=${page}&rowperpage=${rowsPerPage}&roll=${roll}`,
    fetcher,
    {
      keepPreviousData: true,
      refreshInterval: 10000,
    }
  );

  const pages = useMemo(() => {
    return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
  }, [data?.count, rowsPerPage]);

  const loadingState =
    isLoading || data?.user.length === 0 ? "loading" : "idle";

  if (error) {
    toast.error("No Students Found");
  }

  const studentDeleteHandler = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/deletestudent?id=${id}`
      );
      const data = response.data;
      toast.success(data.message);

      mutate(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getallstudent?page=${page}&rowperpage=${rowsPerPage}&roll=${roll}`
      );
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const onClear = React.useCallback(() => {
    setRoll("");
    setPage(1);
  }, []);

  return (
    <div className="w-full h-full">
      <div className="flex justify-end w-full pr-8 py-3">
        <Input
          isClearable
          placeholder="Search by roll..."
          type="text"
          size="md"
          color="primary"
          className="max-w-[20%]"
          startContent={<SearchIcon />}
          variant="bordered"
          radius="sm"
          value={roll}
          onValueChange={setRoll}
          onClear={() => onClear()}
        />
        <select
          name="Row Per Page"
          id=""
          className="rounded ml-3 outline-none"
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(e.target.value)}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </div>
      <Model
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        itemData={selectedItem}
        mutate={mutate}
        rowsPerPage={rowsPerPage}
        page={page}
        roll={roll}
      />
      <Toaster richColors />
      <Table
        aria-label="Example table with client async pagination"
        className="px-8"
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn key="ID">ID</TableColumn>
          <TableColumn key="Full_Namet">Full Name</TableColumn>
          <TableColumn key="Department">Department</TableColumn>
          <TableColumn key="Shift">Shift</TableColumn>
          <TableColumn key="Roll_Number">Roll Number</TableColumn>
          <TableColumn key="Registration_Number">
            Registration Number
          </TableColumn>
        </TableHeader>
        <TableBody
          items={data?.user ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow key={item?._id}>
              <TableCell>{item._id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell className="uppercase">{item?.department}</TableCell>
              <TableCell>{item?.shift}</TableCell>
              <TableCell>{item.roll}</TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <div>{item.registration}</div>
                  <div>
                    <Tooltip
                      key={item?._id}
                      delay={1000}
                      color="primary"
                      content="Edit Profile"
                    >
                      <Button
                        isIconOnly
                        color="primary"
                        variant="light"
                        redius="sm"
                        size="sm"
                        key={item?._id}
                      >
                        <Link href={`/dashboard/allstudent/${item?._id}`}>
                          <PencilLine />
                        </Link>
                      </Button>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip
                      delay={1000}
                      key={item?._id}
                      color="warning"
                      content="Payment History"
                    >
                      <Button
                        isIconOnly
                        color="warning"
                        variant="light"
                        redius="sm"
                        size="sm"
                        key={item?._id}
                        onPress={() => {
                          setSelectedItem(item);
                          onOpen();
                        }}
                      >
                        <CalendarClockIcon />
                      </Button>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip
                      delay={1000}
                      key={item?._id}
                      color="danger"
                      content="Delete Account"
                    >
                      <Button
                        key={item?._id}
                        isIconOnly
                        color="danger"
                        variant="light"
                        redius="sm"
                        size="sm"
                        onClick={() =>
                          toast("Sure! Are you sure you want to delete?", {
                            action: {
                              label: "Delete",
                              onClick: () => studentDeleteHandler(item._id),
                            },
                          })
                        }
                      >
                        <Trash2 />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
