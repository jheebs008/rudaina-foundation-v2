import {  toast } from 'react-toastify';


export const groups = [
  { name: "Rudaina", imagePath: "./img/pregnant-woman.jpeg" },
  { name: "Trimester-1", imagePath: "./img/trimester1.jpeg" },
  { name: "Trimester-2", imagePath: "./img/trimester2.jpeg" },
  { name: "Trimester-3", imagePath: "./img/trimester3.jpeg" },
]

export const ShowToast = (type, message) => {
  if (type === "success") {
    return toast.success(message, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      }
    );
  }
  if (type === "error") {
    return toast.error(message, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      }
    );
  }
}
