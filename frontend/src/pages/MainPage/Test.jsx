import axios from "../../api/authAxios";

function Test() {
    
    const request = axios
        .get(`/users/hello`)
        .then((res) => {
            console.log(res);
            if (res.data.code === 1100) {
                localStorage.setItem("accessToken", res.data.data.accessToken);
                window.location.reload();
            } else if (res.data.code === 1101) {
                window.location.href = 'http://localhost:3000/login';
            }
        })
        .catch((err) => {
            console.log(err);

            if (err.response && err.response.status === 401) {
                // UNAUTHORIZED 응답이면 로그인 페이지로 리다이렉션
                window.location.href = 'http://localhost:3000/login';
            }
        });

    return (
        <div>
            테스트페이지
        </div>
    );
}

export default Test;