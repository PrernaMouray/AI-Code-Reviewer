
import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'
import ChatAi from './component/chatAi'
function App() {
  const [ count, setCount ] = useState(0)
  const [ code, setCode ] = useState(` Write your code here
`)

  const [ review, setReview ] = useState(``)
    const [isClicked, setIsClicked] = useState(false);
    const [loading, setLoading] = useState(false);  

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {

     setIsClicked(true)   
     setLoading(true);
    try{
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
    setReview(response.data)
    }
    catch(error){
      console.error("Error fetching review:" , error)
    }
    finally{
      setLoading(false);
      setIsClicked(false);
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className={`review ${isClicked ? "active" :""}`}>Review</div>
        </div>
        <div className="right">
          {/*  Show loading spinner if loading */}
          {loading ? (
            <div className="loader-container">
              <div className="spinner"></div>
              <p>Analyzing code...</p>
            </div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {review}
            </Markdown>
          )}
              <ChatAi code ={code}/>

        </div>

       

         {/* Optional loader overlay for left side too
        {loading && (
          <div className="overlay">
            <div className="spinner"></div>
            <p>Analyzing code...</p>
          </div>
        )} */}
      </main>
    </>
  )
}



export default App
