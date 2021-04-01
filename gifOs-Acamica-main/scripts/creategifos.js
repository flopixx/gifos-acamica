/**Variables**/
const begin_btn = document.getElementById("begin_btn");
const record_btn = document.getElementById("record_btn");
const end_btn = document.getElementById("end_btn");
const upload_btn = document.getElementById("upload_btn");
const step_first = document.getElementById("creategifo_step_first");
const step_second = document.getElementById("creategifo_step_second");
const step_third = document.getElementById("creategifo_step_third");
const counter_recording = document.getElementById("counter_recording");
const counter_repeat = document.getElementById("counter_repeat");
const upload_title = document.getElementById("upload_title");
const upload_text = document.getElementById("upload_text");
const overlay_video = document.getElementById("overlay_video");
const overlay_icon = document.getElementById("overlay_video_icon");
const overlay_text = document.getElementById("overlay_video_text");
const overlay_actions = document.getElementById("overlay_video_actions");

let recorder;
let blob;
let dateStarted;
let form = new FormData();
let myGifosArray = [];
let myGifosString = localStorage.getItem("myGifos");
let video = document.getElementById("recording_video");
let recorded_gifo = document.getElementById("recorded_gifo");

/**Comenzar**/

begin_btn.addEventListener("click", getStreamAndRecord);

/**Permisos**/
function getStreamAndRecord() {
  begin_btn.classList.add("hide");
  upload_title.innerHTML = "¿Nos das acceso </br>a tu cámara?";
  upload_text.innerHTML =
    "El acceso a tu camara será válido sólo </br>por el tiempo en el que estés creando el GIFO.";
  step_first.classList.add("step_now");

  navigator.mediaDevices
    .getUserMedia({ audio: false, video: { height: { max: 480 } } })
    .then(function (stream) {
      upload_title.classList.add("hide");
      upload_text.classList.add("hide");
      record_btn.classList.remove("hide");
      step_first.classList.remove("step_now");
      step_second.classList.add("step_now");

      /**Video**/
      video.classList.remove("hide");
      video.srcObject = stream;
      video.play();

      recorder = RecordRTC(stream, {
        type: "gif",
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function () {
          console.log("Iniciando grabación");
        },
      });
    });
}
/**Grabar**/
record_btn.addEventListener("click", recordGifo);

function recordGifo() {
  recorder.startRecording();
  record_btn.classList.add("hide");
  end_btn.classList.remove("hide");
  counter_recording.classList.remove("hide");

  /**Contador**/
  dateStarted = new Date().getTime();

  (function looper() {
    if (!recorder) {
      /**Validar**/
      return;
    }
    /**Iniciar contador**/
    counter_recording.innerHTML = calculateTimeDuration(
      (new Date().getTime() - dateStarted) / 1000
    );
    setTimeout(looper, 1000);
  })();
}

/**Finalizar grabación**/
end_btn.addEventListener("click", endingGifo);

function endingGifo() {
  end_btn.classList.add("hide");
  upload_btn.classList.remove("hide");

  counter_recording.classList.add("hide");
  counter_repeat.classList.remove("hide");

  recorder.stopRecording(function () {
    /**Callback */
    video.classList.add("hide");
    recorded_gifo.classList.remove("hide");

    /*Manejar info recibida**/
    blob = recorder.getBlob();
    recorded_gifo.src = URL.createObjectURL(recorder.getBlob());

    /**Incluir grabación**/
    form.append("file", recorder.getBlob(), "myGifo.gif");
    form.append("api_key", api_key);
  });
}

/**Función para calcular duración */
function calculateTimeDuration(secs) {
  var hr = Math.floor(secs / 3600);
  var min = Math.floor((secs - hr * 3600) / 60);
  var sec = Math.floor(secs - hr * 3600 - min * 60);
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  return hr + ":" + min + ":" + sec;
}

/**Subir gifo*/
upload_btn.addEventListener("click", uploadGifo);

function uploadGifo() {
  overlay_video.classList.remove("hide");
  overlay_icon.classList.remove("hide");
  overlay_text.classList.remove("hide");
  step_second.classList.remove("step_now");
  step_third.classList.add("step_now");
  counter_repeat.classList.add("hide");

  /**Upload to giphy */
  fetch("https://upload.giphy.com/v1/gifs", {
    method: "POST",
    body: form,
  })
    .then((response) => {
      return response.json();
    })
    .then((gifo) => {
      let myGifoId = gifo.data.id;

      /**Mostrar nuevo gifo */
      overlay_actions.classList.remove("hide");
      overlay_icon.src = "./assets/check.svg";
      overlay_text.innerText = "GIFO subido con éxito";
      overlay_actions.innerHTML = `
            <button class="gifo__btn" id="download_btn" onclick="downloadMyGifo('${myGifoId}')">
                <img src="./assets/icon-download-hover.svg" alt="download">
            </button>
            <button class="gifo__btn" id="link_btn">
                <img src="./assets/icon-link-hover.svg" alt="link">
            </button>`;
      upload_btn.classList.add("invisible");

      /**Guardar nuevo gifo en localstorage */
      if (myGifosString == null) {
        myGifosArray = [];
      } else {
        myGifosArray = JSON.parse(myGifosString);
      }
      myGifosArray.push(myGifoId);
      myGifosString = JSON.stringify(myGifosArray);
      localStorage.setItem("myGifos", myGifosString);
    })
    .catch((error) => console.log(error));
}

/**Repetir grabación**/
counter_repeat.addEventListener("click", repeatRecording);

function repeatRecording() {
  recorder.clearRecordedData();
  counter_repeat.classList.add("hide");
  upload_btn.classList.add("hide");
  recorded_gifo.classList.add("hide");
  record_btn.classList.remove("hide");

  navigator.mediaDevices
    .getUserMedia({ audio: false, video: { height: { max: 480 } } })

    .then(function (stream) {
      step_second.classList.add("step_now");

      video.classList.remove("hide");
      video.srcObject = stream;
      video.play();

      recorder = RecordRTC(stream, {
        type: "gif",
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function () {
          console.log("Iniciando grabación");
        },
      });
    });
}

/**Descargar nuevo gifo**/
async function downloadMyGifo(gifoImg) {
  let blob = await fetch(
    "https://media.giphy.com/media/" + gifoImg + "/giphy.gif"
  ).then((img) => img.blob());
  invokeSaveAsDialog(blob, "myGifo.gif");
}
