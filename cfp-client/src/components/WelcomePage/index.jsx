import Footer from './Footer';
import Features from '../Home/Features';
import Testimonials from '../Home/Testimonials';
import CallToAction from '../Home/CallToAction';
import { WelcomePageContainer } from './style';
import WelcomeSection from './WelcomeSection/index';

export default function WelcomePage() {
    return (
        <WelcomePageContainer type="lightBackground">
            <WelcomeSection />
            <Features />
            <Testimonials />
            <CallToAction />
            <Footer />
        </WelcomePageContainer>
    );
}
