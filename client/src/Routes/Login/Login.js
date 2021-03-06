import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/user_action";
import { withRouter } from "react-router-dom";
// import { GoogleLogin } from "react-google-login";
// import './Login.css';
function Login(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = event => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = event => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = event => {
    event.preventDefault(); //페이지 refresh 방지

    let body = {
      email: Email,
      password: Password,
    };

    //redux action => loginUser는 action이름
    dispatch(loginUser(body)).then(response => {
      console.log(response.payload);
      if (response.payload.loginSuccess) {
        window.localStorage.setItem("userId", response.payload.userId); //
        props.history.push("/");
      } else {
        alert("로그인 실패");
      }
    });
  };

  // const responseGoogle = (response) => {
  //   console.log(response);
  // };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={onSubmitHandler}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="이메일 주소 또는 전화번호"
              value={Email}
              onChange={onEmailHandler}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="비밀번호"
              value={Password}
              onChange={onPasswordHandler}
            />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />

              {/* <GoogleLogin
                clientId="456699879153-8fq6596vepc2sm6207tn2frootqmgrku.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              /> */}
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            로그인
          </button>
          <br />
          <a href="/sign-up">회원이 아니신가요?</a>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);
