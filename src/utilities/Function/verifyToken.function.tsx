import Swal from "sweetalert2";

const swalFire = () => {
  Swal.fire({
    title: "Token has expired.",
    text: "Please login.",
    icon: "warning",
    allowOutsideClick: false,
    allowEscapeKey: false,
  });
};

export const VerifyToken = () => {
  swalFire();
};
