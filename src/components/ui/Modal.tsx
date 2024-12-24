// src/components/ui/Modal.tsx
import React from "react";
import { Card, CardContent } from "./card";
import { Button } from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // Don't render anything if modal is not open

  return (
    <Card className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <CardContent className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-lg mb-4">Email not found. Do you want to register?</h3>
        <div className="flex gap-4">
          <Button onClick={onConfirm} className="btn btn-primary">
            Yes
          </Button>
          <Button onClick={onClose} className="btn btn-secondary">
            No
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Modal;
