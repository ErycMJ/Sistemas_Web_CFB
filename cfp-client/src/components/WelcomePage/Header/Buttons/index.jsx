import { Link } from "react-router-dom";
import Button from "../../../../shared/utils/Button";
import { ButtonsContainer } from "./style";


export default function Buttons() {
    return (
        <ButtonsContainer>
            <Link to="/signup">
                <Button onClick={() => { }} text={"Cadastrar"} type={"greenButton"} />
            </Link>
            <Link to="/signin">
                <Button onClick={() => { }} text={"Entrar"} type={"greenButton"} />
            </Link>
        </ButtonsContainer>
    )
}