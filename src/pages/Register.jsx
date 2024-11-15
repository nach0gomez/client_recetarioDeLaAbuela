import { FormLogin } from "../components/login/FormLogin"


export function Register(){
    return <div>
        <h1>Register</h1>
        <FormLogin route="/register/" method="register"/>
    </div>
}