"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Filter } from "lucide-react";
import { DialogForm, FilterProperties } from "..";
import { DialogBoxProps } from "@/types";
import clsx from "clsx"; // ✅ Import clsx for className merging

interface ExtendedDialogBoxProps extends DialogBoxProps {
  className?: string; // ✅ Add className as optional prop
}

const DialogBox = ({ type = "contact", filters, setFilters, className }: ExtendedDialogBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);  // 🟢 Add state to control dialog open/close

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={clsx(
        type === "filter" ? "filter-class self-center" : `text-sand-soft border-sand-soft btn-class`,
        className // ✅ Merge custom className if provided
      )}>
        {type === "filter" ? <Filter /> : "Get in Touch"}
      </DialogTrigger>
      <DialogContent className="bg-sand-soft rounded-lg py-6 px-4">
        <DialogHeader>
          <DialogTitle>
            {type === "filter" ? "Filter Properties" : "Contact Us"}
          </DialogTitle>
          {type === "contact" && (
            <DialogDescription>
              Don&apos;t worry, we won&apos;t share your details.
            </DialogDescription>
          )}
        </DialogHeader>
        {type === "filter" ? (
          filters && setFilters ? (
            <FilterProperties
              filters={filters}
              setFilters={setFilters}
              setOpen={setIsOpen}  // 🟢 Pass setIsOpen directly to close the dialog
            />
          ) : (
            <p className="text-center text-gray-500">Filters are unavailable.</p>
          )
        ) : (
          <DialogForm />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
