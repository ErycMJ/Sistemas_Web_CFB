import { ParagraphContainer } from "../../../shared/utils/Paragraph/style";
import { SubTitleContainer } from "../../../shared/utils/SubTitle/style";
import {
  FaqItem,
  FaqList,
  FaqsContainer,
  FaqSummary,
  HomeHeading,
} from "./style";

const faqs = [
  {
    question: "Qual é a sua política da empresa?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla condimentum tortor eu ipsum cursus, et dictum odio gravida.",
  },
  {
    question: "Posso alterar ou cancelar meu pedido?",
    answer:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce maximus quam sit amet vestibulum luctus.",
  },
  {
    question: "Como posso entrar em contato com o atendimento ao cliente?",
    answer:
      "Integer a lectus ac tortor blandit molestie. Nunc efficitur velit sed massa auctor, eget molestie mauris luctus.",
  },
];

export default function Faqs() {
  return (
    <FaqsContainer data-aos="zoom-in">
      <HomeHeading>
        <SubTitleContainer css={{ fontSize: "2rem" }}>Perguntas Frequentes</SubTitleContainer>
      </HomeHeading>

      <FaqList>
        {faqs.map((faq) => (
          <FaqItem key={faq.question}>
            <FaqSummary>
              <SubTitleContainer css={{ color: "#065F46" }}>{faq.question}</SubTitleContainer>
              <span className="shrink-0 rounded-md bg-white p-1.5 text-green-800 sm:p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </FaqSummary>
            <ParagraphContainer css={{ marginTop: "1rem", lineHeight: 1.6 }}>
              {faq.answer}
            </ParagraphContainer>
          </FaqItem>
        ))}
      </FaqList>
    </FaqsContainer>
  );
}
