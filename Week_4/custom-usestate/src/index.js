import React from "react"
import ReactDOM from "react-dom"
import "./index.css"


const App = () => {

  return (
    <div>
        <div>
            <h1>Count A: 1 </h1>
            <button>Subtract</button>
            <button>Add</button>
        </div>
        <div>
            <h1>Count B: -1 </h1>
            <button>Subtract</button>
            <button>Add</button>
        </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))


