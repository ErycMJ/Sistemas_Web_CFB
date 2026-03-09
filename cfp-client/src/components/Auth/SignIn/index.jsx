import { Link, Navigate } from "react-router-dom";
import { useSignIn } from "../../../hooks/auth";
import Button from "../../../shared/utils/Button";
import { ParagraphContainer } from "../../../shared/utils/Paragraph/style";
import { TitleContainer } from "../../../shared/utils/Title/style";
import { AuthDivider, AuthFooter, AuthForm, AuthInput, AuthPageContainer } from "./style";

export default function SignIn() {
  const { currentUser, handleChange, handleSubmit } = useSignIn();

  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <AuthPageContainer>
      <TitleContainer css={{ textAlign: "center", marginBottom: "1.25rem" }}>Entrar</TitleContainer>

      <AuthForm onSubmit={handleSubmit}>
        <AuthInput type="email" placeholder="E-mail" id="email" onChange={handleChange} />
        <AuthInput type="password" placeholder="Senha" id="password" onChange={handleChange} />

        <div className="flex justify-center my-2">
          <Button text="Entrar" type="greenButton" />
        </div>

        <AuthDivider>OU</AuthDivider>
      </AuthForm>

      <AuthFooter>
        <ParagraphContainer>Não tem uma conta?</ParagraphContainer>
        <Link to="/signup">
          <span className="text-blue-700">Cadastre-se</span>
        </Link>
      </AuthFooter>
    </AuthPageContainer>
  );
}
