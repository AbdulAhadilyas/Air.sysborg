
import { toast } from "react-toastify";


const showAlert = (val) => {
  localStorage.getItem("theme")
      toast(val.msg, {
        type:val?.type,
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
};
export default showAlert