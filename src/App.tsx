import { JSX } from "react";
import { Default } from "./pages/default/default";
import { CompanyProvider } from './context/companyContext'
import './style/global.scss'
import { FilterProvider } from "./context/FilterAssetContext";

const App = (): JSX.Element => {
    return (
        <FilterProvider>
            <CompanyProvider>
                <Default />
            </CompanyProvider>
        </FilterProvider>
    )
};

export default App;