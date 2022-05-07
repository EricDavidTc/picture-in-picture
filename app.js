const vid = document.getElementById("video");
const btn = document.getElementById("button");
const msg = document.getElementById("msg");
const mobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

async function selectMediaStream() {
  if (mobile) {
    vid.setAttribute("src", "jellyfish.mp4");
    vid.controls = true;
    vid.play();
  } else {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      vid.srcObject = mediaStream;
      vid.onloadedmetadata = () => {
        vid.play();
      };
    } catch (error) {
      console.log("Error selectMediaStream", error);
    }
  }
}
//assign switch on/off pictureInPicture to a btn
async function togglePictureInPicture() {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture().catch((error) => {
      console.log(error);
    });
  } else {
    try {
      await vid.requestPictureInPicture();
    } catch (error) {
      msg.hidden = false;
      vid.hidden = true;
      msg.innerHTML += `<h1>Picture in Picture not supported by browser</h1>`;
    }
  }
}

function checkPictureInpicture() {
  if ("pictureInPictureEnabled" in document) {
    selectMediaStream();
  } else {
    msg.hidden = false;
    vid.hidden = true;
    msg.innerHTML += `<h1>Picture in Picture not supported by browser</h1>`;
  }
}

btn.addEventListener("click", async () => {
  togglePictureInPicture();
});

checkPictureInpicture();
