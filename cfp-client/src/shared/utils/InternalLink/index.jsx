import PropTypes from 'prop-types';
import { InternalLinkContainer } from './style';

export default function InternalLink({ href, text, type, children }) {
    return (
        <InternalLinkContainer to={href} type={type}>
            {children || text}
        </InternalLinkContainer>
    );
}

InternalLink.propTypes = {
    href: PropTypes.string,
    text: PropTypes.node,
    type: PropTypes.string,
    children: PropTypes.node,
};