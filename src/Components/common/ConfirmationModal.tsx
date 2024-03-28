
const ConfirmationModal: React.FC<any>= ({onConfirm,onCancel,message}) => {
  return (
    <>
    <div
      id="popup-modal"
      tabIndex={-1}
      className=" overflow-y-auto overflow-x-hidden mx-auto my-auto fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-gray-700 rounded-md shadow">
          <button
          onClick={onCancel}
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
            data-modal-hide="popup-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-400 ">
             {message}
            </h3>
            <button
            onClick={onConfirm}
              data-modal-hide="popup-modal"
              type="button"
              className="text-white bg-[#007562] hover:bg-[#0e5e51] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Yes
            </button>
            <button
            onClick={onCancel}
              data-modal-hide="popup-modal"
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium  text-[#007562] focus:outline-none bg-white rounded-lg border border-[#007562] hover:text-white hover:bg-[#007562] focus:z-10 focus:ring-4 focus:ring-gray-100 "
            >
            cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
  
  )
}

export default ConfirmationModal
