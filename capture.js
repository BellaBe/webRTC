(function(){
let width = 320;
let height = 0;
let streaming = false;
let video = null;
let canvas = null;
let photo = null;
let startupbtn = 0;

const startup = ()=>{
  video = document.getElementById('video');
  canvas = document.getElementById('canvas');
  photo = document.getElementById('photo');
  startupbtn = document.getElementById('startupbutton');
  navigator.mediaDevices.getUserMedia({
    video: true, 
    audio: false
  })
  .then((stream)=>{
    video.srcObject = stream;
    video.play()
  })
  .catch(err=>console.log(`Error: ${err}`))

  video.addEventListener('canplay', (ev)=>{
    if(!streaming){
      height = video.videoHeight / (video.videoWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false)
  startupbtn.addEventListener('click', (ev)=>{
    takepicture();
    ev.preventDefault()
  }, false);

  clearphoto();
}
  const clearphoto = ()=>{
    const context = canvas.getContext('2d');
    context.fillStyle='#AAA';
    context.fillRect(0,0,canvas.width, canvas.height);
    const data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }
  const takepicture = ()=>{
    let context = canvas.getContext('2d');
    if(width && height){
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
      const data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data)
    }else{
      clearphoto();
    }
  }
  window.addEventListener('load', startup, false)

})();