import MainNavbar from "../components/MainNavbar";

function ContactPage() {
    return (
        <div className="contact-page">
            <MainNavbar />

            <section className="contact-page-section">
                <div className="site-container narrow">
                    <p className="section-kicker">CONTACT</p>
                    <h1 className="contact-page-title">Ask anything about Korea travel</h1>
                    <p className="contact-page-text">
                        You can connect this page to email, Instagram DM, or a real contact form later.
                    </p>

                    <div className="contact-page-card">
                        <p>Email: hello@example.com</p>
                        <p>Instagram: @koreaeasytrip</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ContactPage;