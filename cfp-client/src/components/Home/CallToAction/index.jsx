import { Link } from "react-router-dom";
import Button from "../../../shared/utils/Button";
import { ParagraphContainer } from "../../../shared/utils/Paragraph/style";
import { TitleContainer } from "../../../shared/utils/Title/style";
import { HomeContent, HomeHeading, HomeSection } from "./style";

export default function CallToAction() {
  return (
    <HomeSection>
      <HomeContent>
        <HomeHeading>
          <TitleContainer>Comece Hoje</TitleContainer>
          <ParagraphContainer css={{ fontSize: "1.125rem", marginBottom: "1.5rem" }}>
            Junte-se a milhares de usuários que estão gerenciando melhor suas despesas
            com o Rastreador de Despesas.
          </ParagraphContainer>

          <Link to="/signup" className="inline-block">
            <Button onClick={() => { }} text="Inscreva-se Agora" type="greenButton" />
          </Link>
        </HomeHeading>
      </HomeContent>
    </HomeSection>
  );
}
