'use client';

import React from 'react';

export type ConfirmationModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmationModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="relative z-20 min-w-xl"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-700 opacity-75 transition-opacity"
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-modal text-left shadow-xl sm:w-full sm:max-w-lg">
            <div className="bg-modal px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <h3
                    className="font-semibold leading-9 text-title text-2xl"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  <div className="mt-4">
                    <p className="text-title text-base">{message}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-modal px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-outcome px-3 py-3 text-normal font-semibold text-white shadow-sm hover:opacity-80 sm:ml-3 sm:w-auto"
                onClick={onConfirm}
              >
                Excluir
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-3 text-normal font-semibold text-title shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={onCancel}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
