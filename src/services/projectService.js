import Swal from "sweetalert2";
import { common_axios } from "../App";
export const getProjects = async (formdata) => {
    try {
        const res = await common_axios.post(
            "/auth-manager/auth/v1/get-twofadetails", formdata
        );
        return res;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something Went Wrong",
        });
    }
};