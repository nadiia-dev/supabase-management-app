"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { useProducts } from "@/context/products-context";

const StatusChangeConfirm = ({
  id,
  status,
  open,
  setOpen,
}: {
  id: string;
  status: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { changeStatus } = useProducts();
  const handleChange = () => {
    changeStatus.mutate({ id: id, status });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to change your product status to {status}?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently change your
            product status.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleChange}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StatusChangeConfirm;
