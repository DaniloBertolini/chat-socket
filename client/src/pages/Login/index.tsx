import { useContext } from "react";
import Context from "../../context/Context";

function Login() {
  const context = useContext(Context);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (context.username && context.username.current) {
      const userNameValue = context.username.current.value;
      console.log('Nome do usuário:', userNameValue);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Chat Socket.io</h2>
      <input type="text" ref={context.username} placeholder="Digite seu nome"/>
      <button type="submit">Login</button>
    </form>
  )
}

export default Login;