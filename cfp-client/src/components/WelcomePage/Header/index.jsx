import { Link } from "react-router-dom"
import { SpanContainer } from "../../../shared/utils/Span/style"
import { SubTitleContainer } from "../../../shared/utils/SubTitle/style"
import ExternalLink from "../../../shared/utils/ExternalLink";
import Buttons from "./Buttons";

export default function Header() {
    return (
        <header
            className={`bg-green-200 shadow-md py-4 sticky top-0 z-1`}
        >
            <div className="flex justify-between items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center">
                    <Link to="/">
                        <SubTitleContainer>
                            Controle de Finanças
                        </SubTitleContainer>
                    </Link>
                    <SpanContainer>
                        <ExternalLink href="https://taylor-teixeira.vercel.app/">
                            desenvolvido por T&T
                        </ExternalLink>
                    </SpanContainer>
                </div>

                <Buttons />
            </div>
        </header>
    )
}
