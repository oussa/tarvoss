import React from 'react'
import ReactDOM from 'react-dom'
import translateText from './utils/translate'

class Popup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toTranslate: 'In die letzten zehn Jahren hatten die Leute zu viel Stress..'
    }
  }

  translate = async () => {
    const [translatedText, alternatives] = await translateText(this.state.toTranslate)
    console.log(translatedText, alternatives)
    this.setState({translatedText, alternatives, notFound: !translatedText})
  }

  handleChange = (event) => {
    this.setState({toTranslate: event.target.value});
  }

  render() {
    return (
      <div>
        <h1>DeepL</h1>
        <section>
          <label htmlFor="toTranslate">Enter the text to translate</label>
          <textarea cols="30" rows="10" onChange={this.handleChange} value={this.state.toTranslate}></textarea>
        </section>
        <button onClick={this.translate}>Translate</button>
        <section>
          <label htmlFor="translatedText">Translated text</label>
          <textarea cols="30" rows="10" value={this.state.translatedText || (this.state.notFound && 'no translation found')}></textarea>
        </section>
      </div>
    )
  }
}

ReactDOM.render(<Popup />, document.getElementById('root'))
