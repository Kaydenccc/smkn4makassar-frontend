import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useConfirmation } from "@/context/context.createabsen";

export function DialogDefault() {
  const { confirmation, hideConfirmation } = useConfirmation();

  return (
    <>
      <Dialog open={confirmation.show} size="xs">
        <DialogHeader>{confirmation.title}</DialogHeader>
        <DialogBody>{confirmation.message}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            className="mr-1"
            onClick={hideConfirmation}
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={confirmation.onConfirm}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
