import { ToastContainer, toast } from "react-toastify";

const ToastSuccess = (message) => {
    return toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
    });
}

const ToastError = (message) => {
    return toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
    });
}

const ToastWarning = (message) => {
    return toast.warning(message, {
        position: toast.POSITION.TOP_LEFT,
    });
}

const ToastInfo = (message) => {
    return toast.info("Information Notification !", {
        position: toast.POSITION.BOTTOM_CENTER,
    });
}

export { ToastSuccess, ToastError, ToastInfo, ToastWarning }
// toast("Default Notification !", {
//     position: toast.POSITION.BOTTOM_LEFT,
// });

// toast("Custom Style Notification with css class!", {
//     position: toast.POSITION.BOTTOM_RIGHT,
//     className: "foo-bar",
// });