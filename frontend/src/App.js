import { useEffect, useState } from "react";
import axios from "axios";
import { OpenAPILink } from "./API";
import "./App.css";

function App() {
  const [qustion, setQustion] = useState("");
  // const [chatLogQus, setChatlogQus] = useState([]);
  // const [chatLogAns, setChatlogAns] = useState([]);
  const [test, settest] = useState([]);
  const [models, setModels] = useState([]);
  const [SelectedModel, setSelectedModel] = useState("text-davinci-002");

  const callOpenAI = async () => {
    // setChatlogQus([...chatLogQus, qustion]);
    
    
    await axios.post(`${OpenAPILink}/callApi`, { qustion , SelectedModel}).then((res) => {
      console.log(res.data);
      
      // setChatlogAns([...chatLogAns, res.data]);
      settest([...test ,{qustion : qustion, answer : res.data}])
      console.log(test)
    });
    setQustion("")
    // console.log(chatLogAns);
  };

  const clearchatLog=()=>{
    settest([])
    // setChatlogQus([])
    // setChatlogAns([])
  }

  useEffect(() => {
    axios.get(`${OpenAPILink}/models`).then((res) => {
      setModels(res.data.models.data);
      // console.log(res.data.models.data);
    });
  }, []);

  return (
    <div className="App">
      <div className="main">
        <div className="left">
          <button onClick={()=>clearchatLog()}>+ New chat</button>
          <select
            name=""
            id=""
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option value="Models">Select Models</option>
            {models.map((ele) => {
              return (
                <option key={ele.id} value={ele.id}>
                  {ele.id}
                </option>
              );
            })}
          </select>
          

          <div className="left-content">
            <div className="chat-history">history</div>
            <div className="menu-option">menu option</div>
          </div>
        </div>

        <div className="right">
          <div className="resultDisplay">
            {/* {chatLogQus.map((ele, index) => {
              return (
                <div key={index + 1}>
                  <div className="qustion section">
                    <div>
                      <i className="fa-solid fa-question"></i>
                      <p>{ele} </p>
                    </div>
                  </div>

                  <div className="answer section">
                    <div>
                      <i className="fa-solid fa-lightbulb"></i>
                      <p>{chatLogAns[index]}</p>
                    </div>
                  </div>
                </div>
              );
            })} */}
            {test.map((ele, index)=>{
                return <div key={index + 1}>
                <div className="qustion section">
                  <div>
                    <i className="fa-solid fa-question"></i>
                    <p>{ele.qustion} </p>
                  </div>
                </div>

                <div className="answer section">
                  <div>
                    <i className="fa-solid fa-lightbulb"></i>
                    <p>{ele.answer}</p>
                  </div>
                </div>
              </div>
            })}
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
