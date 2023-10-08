import * as React from "react";


const App = () => {
    const [text, setText] = React.useState<string>("")
    
    const getResponse = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/database/${text}`)
            const data = await response.json()
        }catch(error){
            console.error(error)
        }
       
    }
    return (
        <div className="chat-bot">
            <div className="header">
                <div className="info-container">
                    <h3>Chat with</h3>
                    <h2>BookBot</h2>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,128L30,133.3C60,139,120,149,180,133.3C240,117,300,75,360,58.7C420,43,480,53,540,48C600,43,660,21,720,42.7C780,64,840,128,900,138.7C960,149,1020,107,1080,112C1140,117,1200,171,1260,176C1320,181,1380,139,1410,117.3L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
            </div>
            <div className="feed">
                    <div className="question bubble"></div>
                    <div className="response bubble"></div>
            </div>
            <textarea
            value= {text}
            onChange={e => setText(e.target.value)}
            />
            <button onClick={getResponse}>⇨</button>
        </div>
    );
}

export default App