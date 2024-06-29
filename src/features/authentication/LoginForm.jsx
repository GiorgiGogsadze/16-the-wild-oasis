import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";

// import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
// import { useNavigate } from "react-router-dom";
import { loginFacebook, loginGoogle } from "../../services/apiAuth";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";

function LoginForm() {
  const [email, setEmail] = useState("giorgi@gogsadze.com");
  const [password, setPassword] = useState("123456");
  const { login, isLoggingIn } = useLogin();

  // const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormRowVertical label="Email address">
          <Input
            type="email"
            id="email"
            // This makes this form better for password managers
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoggingIn}
          />
        </FormRowVertical>
        <FormRowVertical label="Password">
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoggingIn}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button size="large">
            {!isLoggingIn ? "Login" : <SpinnerMini />}
          </Button>
        </FormRowVertical>
      </Form>
      {/* <LoginSocialFacebook
        appId="2353623"
        scope="public_profile"
        onResolve={(res) => {
          console.log(res);
          navigate("/");
        }}
        onRejects={(err) => {
          console.log(err);
        }}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook> */}
      {/* <LoginSocialGoogle
        client_id={
          "445758568-i3l4cp1b2846p7phol1t7b2.apps.googleusercontent.com"
        }
        scope="openid profile email"
        discoveryDocs="claims_supported"
        onResolve={({ data }) => {
          console.log(data);
          navigate("/");
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <GoogleLoginButton />
      </LoginSocialGoogle> */}
      {/* <GoogleLogin
        onSuccess={(res) => {
          const userData = jwtDecode(res.credential);
          console.log(userData);
          navigate("/");
        }}
        onError={(err) => {
          console.log(err);
        }}
      /> */}
      <FacebookLoginButton
        onClick={() => {
          loginFacebook();
        }}
      />
      <GoogleLoginButton
        onClick={() => {
          loginGoogle();
        }}
      />
    </>
  );
}

export default LoginForm;
