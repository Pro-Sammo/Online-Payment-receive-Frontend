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
  Chip,
} from "@nextui-org/react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page() {
  const [page, setPage] = React.useState(1);

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getalltransction?page=${page}`,
    fetcher,
    {
      keepPreviousData: true,
      refreshInterval: 10000,
    }
  );

  const rowsPerPage = 10;

  const pages = useMemo(() => {
    return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
  }, [data?.count, rowsPerPage]);

  const loadingState =
    isLoading || data?.allTheTransection.length === 0 ? "loading" : "idle";

  return (
    <Table
      aria-label="Example table with client async pagination"
      className="px-8 py-8"
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
        <TableColumn key="Payment_Date">Payment Date</TableColumn>
        <TableColumn key="Roll">Roll</TableColumn>
        <TableColumn key="semester">Semester</TableColumn>
        <TableColumn key="shift">Shift</TableColumn>
        <TableColumn key="Transection_Id">Transection_Id</TableColumn>
        <TableColumn key="Fee_Type">Fee Type</TableColumn>
        <TableColumn key="Amount">Amount</TableColumn>
        <TableColumn key="Status">Status</TableColumn>
      </TableHeader>
      <TableBody
        items={data?.allTheTransection ?? []}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {(item) => (
          <TableRow key={item?._id}>
            <TableCell>
              {new Date(item?.createdAt).toISOString().slice(0, 10)}
            </TableCell>
            <TableCell>{item?.roll}</TableCell>
            <TableCell>{item?.semester}</TableCell>
            <TableCell>{item?.shift}</TableCell>
            <TableCell>{item?.transection_Id}</TableCell>
            <TableCell>{item?.feetype}</TableCell>
            <TableCell>{item?.payment_amount}</TableCell>
            <TableCell>
              <Chip
                color={data.payment_status == "success" ? "success" : "danger"}
              >
                {item?.payment_status}
              </Chip>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
