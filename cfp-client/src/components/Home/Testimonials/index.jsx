import { ParagraphContainer } from "../../../shared/utils/Paragraph/style";
import { SubTitleContainer } from "../../../shared/utils/SubTitle/style";
import {
  HomeContent,
  HomeHeading,
  HomeSection,
  TestimonialCard,
  TestimonialsGrid,
} from "./style";

const testimonials = [
  {
    author: "John Doe",
    text: "O Rastreador de Despesas mudou a forma como gerencio minhas finanças. É simples e eficaz!",
  },
  {
    author: "Jane Smith",
    text: "Adoro como posso definir orçamentos e acompanhar meus gastos. Recomendo muito!",
  },
];

export default function Testimonials() {
  return (
    <HomeSection>
      <HomeContent>
        <HomeHeading>
          <SubTitleContainer css={{ fontSize: "2rem" }}>
            O Que Nossos Usuários Dizem
          </SubTitleContainer>
        </HomeHeading>

        <TestimonialsGrid>
          {testimonials.map((item) => (
            <TestimonialCard key={item.author}>
              <ParagraphContainer css={{ lineHeight: 1.6 }}>
                {item.text}
              </ParagraphContainer>
              <p className="text-green-800 mt-4 font-semibold">- {item.author}</p>
              <img
                src="/review.jpg"
                alt={item.author}
                className="text-green-800 mt-4 rounded-full mx-auto h-12 w-12"
              />
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </HomeContent>
    </HomeSection>
  );
}
