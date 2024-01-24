import axios from "../../api/authAxios";

function Test() {

    const request = axios
        .get(`/users/hello`)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });

    return (
        <div>
            테스트페이지
        </div>
    );
}

export default Test;