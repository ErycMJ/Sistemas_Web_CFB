import { ParagraphContainer } from "../../../shared/utils/Paragraph/style";
import { SubTitleContainer } from "../../../shared/utils/SubTitle/style";
import { TitleContainer } from "../../../shared/utils/Title/style";
import {
  FeatureImage,
  FeatureRow,
  FeatureText,
  HomeContent,
  HomeHeading,
  HomeSection,
} from "./style";

const features = [
  {
    title: "Mantenha o controle do seu dinheiro em um só lugar",
    description:
      "Conecte suas contas de mais de 17.000 instituições financeiras e visualize suas transações conectadas em um só lugar.",
    image: "/OIG5.jpeg",
    reverseOnDesktop: false,
  },
  {
    title: "Defina Orçamentos e Alcance Metas",
    description:
      "Defina orçamentos mensais e acompanhe seus gastos para garantir que você se mantenha no caminho certo com suas metas financeiras.",
    image: "/OIG4.jpeg",
    reverseOnDesktop: true,
  },
  {
    title: "Analise Seus Gastos",
    description:
      "Obtenha insights sobre seus padrões de gastos com relatórios detalhados e gráficos visuais para tomar decisões financeiras informadas.",
    image: "/OIG6.jpeg",
    reverseOnDesktop: false,
  },
];

export default function Features() {
  return (
    <HomeSection tone="soft">
      <HomeContent>
        <HomeHeading>
          <TitleContainer>Nossas Funcionalidades</TitleContainer>
        </HomeHeading>

        {features.map((feature) => (
          <FeatureRow key={feature.title} reverseOnDesktop={feature.reverseOnDesktop}>
            <FeatureImage src={feature.image} alt={feature.title} />
            <FeatureText>
              <SubTitleContainer css={{ marginBottom: "1rem", fontSize: "1.75rem" }}>
                {feature.title}
              </SubTitleContainer>
              <ParagraphContainer css={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
                {feature.description}
              </ParagraphContainer>
            </FeatureText>
          </FeatureRow>
        ))}
      </HomeContent>
    </HomeSection>
  );
}