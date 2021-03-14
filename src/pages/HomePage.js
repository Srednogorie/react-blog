import Header from "../components/Header";
import Landing from "../components/Landing";
import useGlobalState from "../globalState";

function HomePage() {
    const g =   useGlobalState();
    console.log(g.s.manage.isAuthenticated);
    return (
        <div>
            <Header />
            <Landing />
        </div>
    )
}

export default HomePage;
