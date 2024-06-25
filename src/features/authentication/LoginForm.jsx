import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";

import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

function LoginForm() {
  const [email, setEmail] = useState("giorgi@gogsadze.com");
  const [password, setPassword] = useState("123456");
  const { login, isLoggingIn } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password });
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
      <LoginSocialFacebook
        appId="971533981434350"
        onResolve={(res) => {
          console.log(res);
        }}
        onRejects={(err) => {
          console.log(err);
        }}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>
    </>
  );
}

export default LoginForm;
