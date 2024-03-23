import React, { ReactNode, MouseEventHandler } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: MouseEventHandler;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg p-8 max-w-3xl w-full overflow-y-auto max-h-screen">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.707 10l4.647-4.646a.5.5 0 01.708.708L11.707 10l4.646 4.646a.5.5 0 01-.708.708L10 10.707l-4.646 4.647a.5.5 0 01-.708-.708L9.293 10 4.646 5.354a.5.5 0 01.708-.708L10 9.293l4.646-4.647a.5.5 0 01.708.708L10.707 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {children}
          </div>
        </div>
      );
};

export default Modal;
