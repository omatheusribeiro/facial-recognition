const textarea = document.querySelector("#textarea")
const btnEnable = document.querySelector("#enable")
const btnDisable = document.querySelector("#disable")
const btnClear = document.querySelector("#clear")

class speechApi {

  constructor() {

    const SpeechToText = window.SpeechRecognition || window.webkitSpeechRecognition

    this.speechApi = new SpeechToText()
    this.output = textarea.output 
    this.speechApi.continuous = true
    this.speechApi.lang = "pt-BR"
    
    this.speechApi.onresult = (e) => {
      var resultIndex = e.resultIndex
      var transcript = e.results[resultIndex][0].transcript

      textarea.value += transcript
    }

    btnClear.disabled = true
    btnDisable.disabled = true
  }

  start() {
    this.speechApi.start()
  }

  stop() {
    this.speechApi.stop()
  }
}

  var speech = new speechApi()

  btnEnable.addEventListener("click", e => {
    btnEnable.disabled = true
    btnDisable.disabled = false
    btnClear.disabled = true
    speech.start()
  })

  btnDisable.addEventListener("click", () => {
    btnEnable.disabled = false
    btnClear.disabled = false
    btnDisable.disabled = true
    speech.stop()
  })

  btnClear.addEventListener("click", () => {
    textarea.value = "";

    btnEnable.disabled = false
    btnDisable.disabled = true
    btnClear.disabled = true
  })