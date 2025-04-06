import QuestionPage from "@/pages/Question";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
    return (
        <div className="bg-primary text-content-primary">
            <BrowserRouter>
                <Routes>
                    <Route path='/questions/:slug' element={<QuestionPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
