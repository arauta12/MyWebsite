import Navbar from "../Navigation/Navbar";
import './Layout.css';

function Layout ({ ref, children }) {

    return (
    <>
        <header ref={ref}>
            <Navbar />
        </header>
        <main>
            {children}
        </main>
    </>
    );
}

export default Layout;
