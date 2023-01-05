import { useEffect, useState } from "react";
import axios from "axios";
import { OpenAPILink } from "./API";
import "./App.css";

function App() {
  const [qustion, setQustion] = useState("");
  const [chatLogQus, setChatlogQus] = useState([]);
  const [chatLogAns, setChatlogAns] = useState([]);

  const callOpenAI = async () => {
    // console.log("inside")
    setChatlogQus([...chatLogQus, qustion]);
    // console.log(qustion)
    console.log(chatLogQus);

   await axios.post(`${OpenAPILink}/callApi`, { qustion }).then((res) => {
      console.log(res.data);
      
    
      setChatlogAns([...chatLogAns, res.data ]);
      
    });
    console.log(chatLogAns);
  };
  useEffect(() => {
    
    // console.log("useEffect", chatLog);
  }, []);

  return (
    <div className="App">
      <div className="main">
        <div className="left">
          <button>+ New chat</button>
          <button>Select AI MODEL</button>

          <div className="left-content">
            <div className="chat-history">history</div>
            <div className="menu-option">menu option</div>
          </div>
        </div>

        <div className="right">
          <div className="resultDisplay">
            { chatLogQus.map((ele, index) => {
                  return (
                    <div key={index+1}>
                      <div className="qustion section">
                        <div>
                          <i className="fa-solid fa-question"></i>
                          <p>{ele} </p>
                        </div>
                      </div>

                      <div className="answer section">
                        <div>
                          <i className="fa-solid fa-lightbulb"></i>
                          <p>
                           {chatLogAns[index]}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="How can i Help You ?"
              value={qustion}
              onChange={(e) => setQustion(e.target.value)}
            />
            <input type="submit" value="Submit" onClick={callOpenAI} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
