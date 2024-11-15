import { FormLogin } from "../components/login/FormLogin"

FormLogin

export function Login(){
    return <div>
        <h1 className="text-center">Inicio de Sesión</h1>
        <FormLogin route="/login" method="login"/>
    </div>
}