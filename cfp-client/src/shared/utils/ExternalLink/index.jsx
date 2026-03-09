import PropTypes from 'prop-types';
import { ExternalLinkContainer } from "./style";

export default function ExternalLink({ href, text, children }) {
    return (
        <ExternalLinkContainer href={href} target="_blank" rel="noopener noreferrer">
            {text || children}
        </ExternalLinkContainer>
    );
}

ExternalLink.propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.node,
    children: PropTypes.node,
};