import { Link } from "react-router-dom";
import Button from "../../../../shared/utils/Button";
import { colors } from "../../../../shared/utils/Colors";
import { ButtonsContainer } from "./style";


export default function Buttons() {
    return (
        <ButtonsContainer>
            <Link to="/signup">
                <Button onClick={() => { }} text={"Cadastrar"} color={colors().green} hoverColor={colors().darkgreen} />
            </Link>
            <Link to="/signin">
                <Button onClick={() => { }} text={"Entrar"} color={colors().green} hoverColor={colors().darkgreen} />
            </Link>
        </ButtonsContainer>
    )
}