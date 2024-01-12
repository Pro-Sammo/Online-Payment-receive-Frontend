"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
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
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function Model({
  isOpen,
  onOpenChange,
  itemData,
  mutate,
  page,
  rowsPerPage,
  roll,
}) {
  const transectionDeleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/deletetransection/${id}`
      );
      const data = response.data;
      toast.success(data.message);
      mutate(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getallstudent?page=${page}&rowperpage=${rowsPerPage}&roll=${roll}`
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  // /deletetransection/:id
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Payment History
            </ModalHeader>
            <ModalBody>
              {itemData?.allpayment?.length > 0 ? (
                <Table
                  aria-label="Example static collection table"
                  className="px-2"
                >
                  <TableHeader>
                    <TableColumn>PAYMENT DATE</TableColumn>
                    <TableColumn>STUDENT NAME</TableColumn>
                    <TableColumn>Email Address</TableColumn>
                    <TableColumn>SEMESTER</TableColumn>
                    <TableColumn>SHIFT</TableColumn>
                    <TableColumn>TRANSECTION ID</TableColumn>
                    <TableColumn>FEE TYPE</TableColumn>
                    <TableColumn>PAYMENT AMOUNT</TableColumn>
                    <TableColumn>PAYMENT STATUS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {itemData?.allpayment?.map((data) => {
                      return (
                        <TableRow key={data.transection_Id}>
                          <TableCell>
                            {new Date(data.createdAt)
                              .toISOString()
                              .slice(0, 10)}
                          </TableCell>
                          <TableCell>{data.name}</TableCell>
                          <TableCell>{data.email}</TableCell>
                          <TableCell>{data.semester}</TableCell>
                          <TableCell>{data.shift}</TableCell>
                          <TableCell>{data.transection_Id}</TableCell>
                          <TableCell>{data.feetype}</TableCell>
                          <TableCell>{data.payment_amount}</TableCell>
                          <TableCell>
                            <div className="flex gap-4">
                              <Chip
                                color={
                                  data.payment_status == "success"
                                    ? "success"
                                    : "danger"
                                }
                              >
                                {data.payment_status}
                              </Chip>
                              <Button
                                key={data?._id}
                                isIconOnly
                                color="danger"
                                variant="light"
                                redius="sm"
                                size="sm"
                                onClick={() =>
                                  toast(
                                    "Sure! Are you sure you want to delete?",
                                    {
                                      action: {
                                        label: "Delete",
                                        onClick: () =>
                                          transectionDeleteHandler(data._id),
                                      },
                                    }
                                  )
                                }
                              >
                                <Trash2 />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <h1 className="text-center">No Payment Yet</h1>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
