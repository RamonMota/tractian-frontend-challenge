import { JSX } from "react";
import { Default } from "./pages/default/default";
import { CompanyProvider } from './context/companyContext'
import './style/global.scss'

const App = (): JSX.Element => {
    return (
        <CompanyProvider>
            <Default />
        </CompanyProvider>
    )
};

export default App;