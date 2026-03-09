import PropTypes from 'prop-types';
import { InternalLinkContainer } from './style';

export default function InternalLink({ href, text, type }) {
    return (
        <InternalLinkContainer to={href} type={type}>
            {text}
        </InternalLinkContainer>
    );
}

InternalLink.propTypes = {
    href: PropTypes.string,
    text: PropTypes.node,
    type: PropTypes.string,
};