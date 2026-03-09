import { Link, Navigate } from "react-router-dom";
import { useSignUp } from "../../../hooks/auth";
import Button from "../../../shared/utils/Button";
import { ParagraphContainer } from "../../../shared/utils/Paragraph/style";
import { TitleContainer } from "../../../shared/utils/Title/style";
import { AuthDivider, AuthFooter, AuthForm, AuthInput, AuthPageContainer } from "./style";

export default function SignUp() {
  const { currentUser, handleChange, handleSubmit } = useSignUp();

  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <AuthPageContainer>
      <TitleContainer css={{ textAlign: "center", marginBottom: "1.25rem" }}>
        Cadastre-se
      </TitleContainer>

      <AuthForm onSubmit={handleSubmit}>
        <AuthInput type="text" placeholder="Nome de usuário" id="username" onChange={handleChange} />
        <AuthInput type="email" placeholder="E-mail" id="email" onChange={handleChange} />
        <AuthInput type="password" placeholder="Senha" id="password" onChange={handleChange} />
        <AuthInput type="text" placeholder="Telefone" id="mobile" onChange={handleChange} />

        <div className="flex justify-center my-2">
          <Button text="Cadastre-se" type="greenButton" />
        </div>

        <AuthDivider>OU</AuthDivider>
      </AuthForm>

      <AuthFooter>
        <ParagraphContainer>Já tem uma conta?</ParagraphContainer>
        <Link to="/signin">
          <span className="text-blue-700">Entrar</span>
        </Link>
      </AuthFooter>
    </AuthPageContainer>
  );
}
