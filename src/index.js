import React from "react";
import { render } from "react-dom";

function App() {
    return <button type="button" class="btn btn-primary">Primary</button>
}

render(<App />, document.getElementById("root"));
