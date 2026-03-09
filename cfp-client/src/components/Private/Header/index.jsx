import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHeader } from "../../../hooks/layout/useHeader";
import { ParagraphContainer } from "../../../shared/utils/Paragraph/style";
import { SubTitleContainer } from "../../../shared/utils/SubTitle/style";
import {
  PrivateHeaderActions,
  PrivateHeaderContainer,
  PrivateHeaderContent,
  PrivateHeaderUser,
} from "./style";

export default function PrivateHeader() {
  const { currentUser } = useSelector((state) => state.user);
  const { greeting } = useHeader();

  const username = currentUser?.user?.username || currentUser?.username || "Usuário";

  return (
    <PrivateHeaderContainer>
      <PrivateHeaderContent>
        <div>
          <SubTitleContainer css={{ color: "#065F46", fontSize: "1.25rem" }}>
            Painel Financeiro
          </SubTitleContainer>
          <ParagraphContainer>{greeting}, {username}</ParagraphContainer>
        </div>

        <PrivateHeaderActions>
          <Link to="/profile">
            <PrivateHeaderUser>Perfil</PrivateHeaderUser>
          </Link>
          <Link to="/signout">
            <PrivateHeaderUser>Sair</PrivateHeaderUser>
          </Link>
        </PrivateHeaderActions>
      </PrivateHeaderContent>
    </PrivateHeaderContainer>
  );
}
