import { useState } from "react";
import { tokenApi } from "../../api/token.api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

export function FormLogin({ route, method }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const name = method === "login" ? "Login" : "Register";

  const handledSubmit = async (e) => {
    e.preventDefault();

    // Usar toast.promise para manejar la operación async de login
    toast.promise(
      tokenApi.post(route, { email, password }), 
      {
        loading: "Iniciando sesión...", // Mensaje de carga
        success: (res) => {
          // Si el login es exitoso
          if (method === "login") {
            login(res.data.access); // Guarda el token
            navigate("/");
            return "¡Inicio de sesión exitoso!";
          } else {
            navigate("/login");
            return "¡Registro exitoso! Por favor, inicia sesión.";
          }
        },
        error: "Error en el inicio de sesión o registro" 
      }
    );
  };

  return (
    <form onSubmit={handledSubmit}>
      <div className="container justify-content-center">
        <input
          className="form-control m-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="form-control m-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="btn btn-primary m-2" type="submit">
          {name}
        </button>
      </div>
    </form>
  );
}
