import React, { useEffect } from "react";
import axios from "../../api/authAxios";
import { useResetRecoilState } from "recoil";
import { UserState } from "../../global/UserState";

function LogoutButton() {

    const resetUserState = useResetRecoilState(UserState);

    useEffect(() => {
        const request = axios
            .get(`/auth/sign-out`)
            .then((res) => {
                console.log(res);
                resetUserState();
                window.location.href = 'http://localhost:3000/login';
            })
            .catch((err) => {
                console.log(err);
                resetUserState();
                window.location.href = 'http://localhost:3000/login';
            });
    }, []);
}

export default LogoutButton;