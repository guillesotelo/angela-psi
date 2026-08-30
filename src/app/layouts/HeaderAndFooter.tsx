"use client";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const WithHeaderAndFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default WithHeaderAndFooter;
