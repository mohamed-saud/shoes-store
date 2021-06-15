import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Section from "./components/Section";
import { DataProvider } from "./components/Context";
import { AuthProvider } from "./context/authContect";
class App extends React.Component {
  render() {
    return (
      <DataProvider>
        <AuthProvider>
          <div className="app">
            <Router>
              <Header />
              <Section />
            </Router>
          </div>
        </AuthProvider>
      </DataProvider>
    );
  }
}

export default App;
