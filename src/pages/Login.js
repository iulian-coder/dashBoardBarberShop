import React from "react";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="card">
      <h1>Login page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="example" defaultValue="test" ref={register} />

        <input name="exampleRequired" ref={register} />

        <input type="submit" />
      </form>
    </div>
  );
}

export default Login;
