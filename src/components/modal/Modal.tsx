import React, { ReactNode, MouseEventHandler } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: MouseEventHandler;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative bg-[#d1d7e0] rounded-lg p-8 max-w-3xl w-full overflow-y-auto max-h-screen">
            <button
              className="absolute top-10 right-10 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" /><path d="M9 9l6 6m0 -6l-6 6" /></svg>
            </button>
            {children}
          </div>
        </div>
      );
};

export default Modal;
