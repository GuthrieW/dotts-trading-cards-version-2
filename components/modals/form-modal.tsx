import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'

type FormModalProps = {
  children: any
  title: string
  toggleModal: Function
  submitButtonText: string
}

const FormModal = ({
  children,
  title,
  toggleModal,
  submitButtonText,
}: FormModalProps) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-2xl relative flex flex-col w-full bg-neutral-600 outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-neutral-800 rounded-t">
              <h3 className="text-3xl font-semibold">{title}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => toggleModal()}
              >
                <span className="bg-transparent opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  <XMarkIcon className="text-white" />
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">{children}</div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default FormModal
