import "./index.css"
import CustomerList from "./components/elements/CustomerList";
import LotList from "./components/elements/LotList";
import CustomerForm from "./components/createForms/CustomerForm";
import LotForm from "./components/createForms/LotForm";

function App() {
    return (
        <div className="app-container">
            <div className="list-container">
                <h2>Список Кастомеров</h2>
                <div className="divider"></div>
                <CustomerList/>
                <div className="divider"></div>
                <CustomerForm/>
            </div>

            <div className="list-container">
                <h2>Список Лотов</h2>
                <div className="divider"></div>
                <LotList/>
                <div className="divider"></div>
                <LotForm/>
            </div>
        </div>
    );
}

export default App;
