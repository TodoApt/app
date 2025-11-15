"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const FullScreenDialog = ({
  open,
  children,
  title,
  actions,
}: {
  open: boolean;
  children: React.ReactNode;
  title: React.ReactNode;
  actions?: React.ReactNode;
}) => {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="z-50 flex flex-col h-full sm:h-auto sm:max-h-[90vh] max-w-screen rounded-none sm:rounded-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">{children}</div>

        <DialogFooter>{actions}</DialogFooter>

        <DialogDescription className={"hidden"}>{title}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default FullScreenDialog;
