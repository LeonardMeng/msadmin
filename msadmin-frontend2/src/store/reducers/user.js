import {getToken} from "../../utils/auth";

const initUserInfo = {
    username: "",
    role: "",
    avatar:"",
    token: getToken(),
};

export default function user(state = initUserInfo) {

}
