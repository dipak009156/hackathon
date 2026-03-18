import Api from "./Api";
import { logout as logoutAction } from "../store/slices/authslice";
import { store } from "../store/store";

export const logoutUser = async () => {
    try {

        await Api.post("/logout");
        store.dispatch(logoutAction());

    } catch (error) {
        console.error("Logout failed:", error);
    }
};

