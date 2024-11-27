import { Toast } from "primereact/toast";

type ToastRef = React.RefObject<Toast>;
type Message = string;


export const showSuccess = (toastRef: ToastRef, message: Message): void => {
    toastRef.current?.show({
        severity: "success", 
        summary: message, 
        life: 2000
    })
}

export const showWarning = (toastRef: ToastRef, message: Message): void => {
    toastRef.current?.show({
        severity: "warn", 
        summary: message, 
        life: 2000
    })
}

export const showError = (toastRef: ToastRef, message: Message): void => {
    toastRef.current?.show({
        severity: "error", 
        summary: message, 
        life: 2000
    })
}