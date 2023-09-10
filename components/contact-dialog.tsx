import React, { useState } from "react";
import { Modal, ModalContent, Button, useDisclosure } from "@nextui-org/react";
import GetInTouchForm from "./get-in-touch";

export default function ContactDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <span onClick={() => setIsOpen(true)}>{children}</span>
      <Modal
        className="shadow-2xl rounded-2xl border border-gray-300 dark:border-gray-800"
        size="4xl"
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(false)}
      >
        <ModalContent>
          <div className="grid lg:grid-cols-2 dark:bg-slate-950 bg-white">
            <div className="relative hidden lg:block">
              <img
                src="https://img.freepik.com/premium-photo/man-sits-desk-front-computer-with-sun-setting-him_655090-76449.jpg?w=740"
                alt="programmer"
                className="h-48 w-full lg:h-[560px] object-cover rounded-l"
              />
            </div>
            <div className="p-4 lg:p-10">
              <h3 className="text-3xl font-bold mb-4">Contacto</h3>
              <GetInTouchForm closeModal={closeModal} />
              <p className="mt-4 text-gray-500">
                Recuerda que tambien puedes llamar a mi n&uacute;mero personal{" "}
                <span className="text-blue-500">
                  <a href="tel:+51986327221">986327221</a>
                </span>
                .
              </p>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}