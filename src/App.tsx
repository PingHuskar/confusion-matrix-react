import { useState } from 'react'
import './App.css'

function App() {
  const [truePositive, setTruePositive] = useState(parseInt(localStorage.getItem(`tp`) || `0`))
  const [trueNegative, setTrueNegative] = useState(parseInt(localStorage.getItem(`tn`) || `0`))
  const [falsePositive, setFalsePositive] = useState(parseInt(localStorage.getItem(`fp`) || `0`))
  const [falseNegative, setFalseNegative] = useState(parseInt(localStorage.getItem(`fn`) || `0`))
  const N: number             = truePositive + trueNegative + falsePositive + falseNegative
  const accuracy: number      = (truePositive + trueNegative) / N
  const R2: number            = 1 - accuracy
  const precision: number     = truePositive / (truePositive + falsePositive)
  const recall: number        = truePositive / (truePositive + falseNegative)
  const F1: number            = (2 * recall * precision) / (recall + precision)
  const specificity: number   = trueNegative / (trueNegative + falsePositive)
  const P: number             = (truePositive + falseNegative) / N
  const P2: number            = 1 - P
  const Q: number             = (truePositive + falsePositive) / N
  const Q2: number            = 1 - Q
  const QSN: number           = (recall - Q) / Q2
  const QSP: number           = (specificity - Q2) / Q
  // useEffect(() => {
  //   console.log(`useEffect`)
  // },[truePositive,trueNegative,falsePositive,falseNegative])

  return (
    <div className="App">
      <h1>Confusion Matrix</h1>
      <table>
            <thead>
                <tr>
                    <th></th>
                    <th title="Actually">Positive</th>
                    <th title="Actually">Negative</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td title="Outcome/Predicted">Positive</td>
                    <td contentEditable onInput={(e) => {
                      e.preventDefault()
                      localStorage.setItem(`tp`, e.currentTarget.innerText)
                      setTruePositive(parseInt(localStorage.getItem(`tp`) || `0`))
                    }} className="TPs" id="TPs" title="TP : hits">{truePositive}</td>
                    <td contentEditable onInput={(e) => {
                      e.preventDefault()
                      localStorage.setItem(`fp`, e.currentTarget.innerText)
                      setFalsePositive(parseInt(localStorage.getItem(`fp`) || `0`))
                    }} className="FPs" id="FPs" title="FP : false alarms">{falsePositive}</td>
                </tr>
                <tr>
                    <td title="Outcome/Predicted">Negative</td>
                    <td contentEditable onInput={(e) => {
                      e.preventDefault()
                      localStorage.setItem(`fn`, e.currentTarget.innerText)
                      setFalseNegative(parseInt(localStorage.getItem(`fn`) || `0`))
                    }} className="FNs" id="FNs" title="FN : missed">{falseNegative}</td>
                    <td contentEditable onInput={(e) => {
                      e.preventDefault()
                      localStorage.setItem(`tn`, e.currentTarget.innerText)
                      setTrueNegative(parseInt(localStorage.getItem(`tn`) || `0`))
                    }} className="TNs" id="TNs" title="TN : non events | correct rejections">{trueNegative}</td>
                </tr>
            </tbody>
      </table>
      <div className="stats">
        <p>N = <span className="TPs">{truePositive}</span> + <span className="TNs">{trueNegative}</span> + <span className="FPs">{falsePositive}</span> + <span className="FNs">{falseNegative}</span> = {N}</p>
        <p>
          accuracy 
          = (<span className="TPs">{truePositive}</span> + <span className="TNs">{trueNegative}</span>) / {N} = {truePositive + trueNegative} / {N} = {accuracy.toFixed(2)} = {(accuracy * 100).toFixed(2)}% | R2 = 1-{accuracy.toFixed(2)} = {R2.toFixed(2)} = {(R2 * 100).toFixed(2)}%
        </p>
        <p>
          <span title="the Ratio of true positives to total predicted positives">precision</span> = <span className="TPs">{truePositive}</span> / (<span className="TPs">{truePositive}</span> + <span className="FPs">{falsePositive}</span>) 
          = <span className="TPs">{truePositive}</span> / {truePositive + falsePositive} = {precision.toFixed(2)}
        </p>
        <p>
          <span title="the Ratio of true positives to total (actual) positives in the data">recall</span> = <span className="TPs">{truePositive}</span> / (<span className="TPs">{truePositive}</span> + <span className="FNs">{falseNegative}</span>) 
          = <span className="TPs">{truePositive}</span> / {truePositive + falseNegative} = {recall.toFixed(2)}
        </p>
        <p>
          <span title="the harmonic mean of precision and recall">F-measure (F1 Score)</span> = 
          (2 * {recall.toFixed(2)} * {precision.toFixed(2)}) / ({recall.toFixed(2)} + {precision.toFixed(2)}) = {(2 * recall * precision).toFixed(2)} / {(recall + precision).toFixed(2)} = {F1.toFixed(3)}
        </p>
        <p>
          <span title="the Ratio of true negatives to total negatives in the data">specificity</span> = <span className="TNs">{trueNegative}</span> / (<span className="TNs">{trueNegative}</span> + <span className="FPs">{falsePositive}</span>) = <span className="TNs">{trueNegative}</span> / {trueNegative+falsePositive} = {specificity.toFixed(2)}
        </p>
        <p>
          P = (<span className="TPs">{truePositive}</span> + <span className="FNs">{falseNegative}</span>) / {N} = {truePositive + falseNegative} / {N} = {P.toFixed(3)} & P' = 1 - {P.toFixed(3)} = {P2.toFixed(3)}
        </p>
        <p>
          Q = (<span className="TPs">{truePositive}</span> + <span className="FPs">{falsePositive}</span>) / {N} = {truePositive + falsePositive} / {N} = {Q.toFixed(3)} & Q' = {Q2.toFixed(3)}
        </p>
        <p>
          Pre-test odds = {P.toFixed(2)} / {P2.toFixed(2)} = {(P/P2).toFixed(3)} & Pre-test odds against = 1 / {(P/P2).toFixed(3)} = {P2.toFixed(2)} / {P.toFixed(2)} = {(P2/P).toFixed(3)}
        </p>
        <p>Quality Measures : QSN or TPR<sub>Q</sub> = ({recall.toFixed(2)} - {Q}) / {Q2} = {QSN.toFixed(3)} & QSP or TNR<sub>Q</sub> = ({specificity.toFixed(2)} - {Q2}) / {Q} = {QSP.toFixed(3)}</p>
      </div>
    </div>
  )
}

export default App
