let final_volume=1;
// variables 
let play_pause_btn=document.getElementById("play_pause_btn");
let main_video=document.getElementById("main_video");
let controller_play_pause_icon=document.getElementById("controller_play_pause_icon");
let screen_resizer = document.querySelector(".screen_resizer");
let time_elasped = document.querySelector(".time_elasped");
let time_duration = document.querySelector(".time_duration");
let menu = document.querySelector(".menu");
let time_div = document.querySelector(".time_div");
let player = document.querySelector(".player");
let video_choose = document.querySelector("#video_choose");
let progress_bar_inner = document.querySelector(".progress_bar_inner");
let progress_bar_upper = document.querySelector(".progress_bar_upper");
let progress_bar_container = document.querySelector(".progress_bar_container");
let volume_bar = document.querySelector(".volume_bar");
let volume_span = document.querySelector(".volume_span");
let volume_icon = document.querySelector("#volume_icon");
let volume_icon_container = document.querySelector("#volume_icon_container");
let box_show_volume = document.querySelector(".box_show_volume");
let volume_show_container = document.querySelector(".volume_show_container");
let selectBtn = document.querySelector(".selectBtn");
let volume_show_icon = document.querySelector("#volume_show_icon");
let speed = document.querySelector("#speed");
let browse_video_input = document.querySelector("#browse_video_input");
let  main_container = document.querySelector(".main_container");
// let source = document.querySelector("#source");

// variables 
// ********************************************************
video_choose.addEventListener("click",()=>{
    browse_video_input.click();
})

// event listener 
play_pause_btn.addEventListener("click",raw_toggle_play);

main_video.addEventListener("click",play_pause_video);
controller_play_pause_icon.addEventListener("click",play_pause_video);
window.addEventListener("keydown",change_volume_by_key);
main_video.addEventListener("timeupdate",set_time);
main_video.addEventListener("play",raw_toggle_play);
// main_video.addEventListener("loadstart",loaded_v);
main_video.addEventListener("loadeddata",loaded_vv);
main_video.addEventListener("volumechange",show_volume_anime);
//volumde anime
function show_volume_anime() 
{
    box_show_volume.innerHTML=parseInt(volume_bar.style.width) +"%";
    volume_show_container.classList.remove("onone");
    box_show_volume.classList.remove("onone");
    
    setTimeout(() => {
        box_show_volume.classList.add("onone");
        
        volume_show_container.classList.add("onone");
    }, time_out);
    
}
function loaded_vv()
{
    // console.log(main_video.volume);
raw_toggle_play();
    main_video.playbackRate=speed.value;
}
main_video.addEventListener("pause",raw_toggle_play);
main_video.addEventListener("ended",raw_toggle_play);
screen_resizer.addEventListener("click",full_screen);
progress_bar_container.addEventListener("click",back_forth_progress_bar);
speed.addEventListener("change",change_speed);
volume_span.addEventListener("click",change_volume);
volume_span.addEventListener("click",show_volume_anime);
volume_icon_container.addEventListener("click",toggle_mute);
volume_icon_container.addEventListener("click",show_volume_anime);
// event listener 
// ********************************************************
function raw_toggle_play()
{   
    if(main_video.paused)
    {
       
        play_pause_btn.classList.add("fa-play-circle");
        play_pause_btn.classList.remove("fa-pause-circle");
        controller_play_pause_icon.classList.add("fa-play")
        controller_play_pause_icon.classList.remove("fa-pause")
        
        opacity_show(play_pause_btn);
        opacity_hider(play_pause_btn,1000);
    }else{



        play_pause_btn.classList.remove("fa-play-circle");
        play_pause_btn.classList.add("fa-pause-circle");
        controller_play_pause_icon.classList.remove("fa-play")
        controller_play_pause_icon.classList.add("fa-pause")
        
        opacity_show(play_pause_btn);
        opacity_hider(play_pause_btn,1000);
    }
        
}
let exist =1;
main_video.onerror = function() {
    // don't show video element
    exist =0;
}

document.addEventListener("keydown",(e)=>{
    // console.log(e);
})

// functions starting **************************************************
function opacity_hider(target,value){
    setTimeout(() => {
target.style.cssText="opacity:0;z-index:-2;";  
    }, value);

}
function opacity_show(target,value){
 
target.style.cssText="opacity:1;z-index:23;";  
   

}

// **************************************************** full screen
/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
 
    
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    
  

}

let full_cond = true;
function full_screen() {
    menu.classList.toggle("menu_full_screen");
    menu.classList.toggle("mid_screen");
    full_cond ? openFullscreen(player): closeFullscreen();
    full_cond = !full_cond;

    
}
// **************************************************** full screen

//      play_pause_video()
function play_pause_video()
{
 
    if(main_video.paused)
    {
        main_video.play();
       
    }
    else
    {
        main_video.pause();
        
    }

}
//      play_pause_video()
//    change_time
function get_time(time)
{
    if(time>=3600)
    {
        let hour = Math.floor((time/3600));
        let min = Math.floor((time%3600)/60);
    
        let sec = (time%60);
        sec =  sec>9 ? sec: "0"+sec; 
        sec= Math.floor(sec);

        return `${hour}:${min}:${sec}s`;

    }
    else{
        let min = Math.floor(time/60);
    
        let sec = (time%60);
        sec= Math.floor(sec);

        sec =  sec>9 ? sec: "0"+sec; 
        return `${min}:${sec}s`;
    }
    
}

//    change_time
// progress_bar_update();
function progress_bar_update()
{
    progress_bar_inner.style.width=`${(main_video.currentTime/main_video.duration)*100}%`
        
}
// progress_bar_update();
//back_forth_progress_bar
function back_forth_progress_bar(e)
{

const newtime = e.offsetX/progress_bar_upper.offsetWidth;
progress_bar_inner.style.width=`${newtime*100}%`;

main_video.currentTime= main_video.duration*newtime;

}
//back_forth_progress_bar

// set_time
function set_time()
{
    progress_bar_update();
let d=get_time(main_video.duration);
let ct= get_time(main_video.currentTime);

time_div.innerHTML=`${ct} / ${d}`
    
    
}
//only once 
let t = get_time(0);
time_div.innerHTML=`${t} / ${t}`
//only once 
// change_volume
function change_volume(e){
    let volume = e.offsetX/volume_span.offsetWidth;

    if(volume <0.1){
        volume =0;
    }
    
    else if(volume >0.9)
    {
        volume =1;

    }
    // console.log(volume);
    main_video.volume = volume;
    volume_bar.style.width=    `${volume *100}%`;
    final_volume=volume;
    change_volume_icon(main_video.volume);
  

}

// change_volume
//mute volume

function toggle_mute(e)
{
    if(main_video.volume >0)
    {
     main_video.volume = 0;
     volume_bar.style.width = "0px";
     change_volume_icon(main_video.volume);
    }
    else
    {
         if(final_volume <=0){
            main_video.volume = 0.1;
            final_volume= main_video.volume ;

         }
         else
         {

             main_video.volume = final_volume;
         }
        volume_bar.style.width = main_video.volume*100 +"%";
     change_volume_icon(main_video.volume);

    }

}
//mute volume
// change_volume_by_key
let time_out = 500;
function change_volume_by_key(e)
 {
     
     if(exist !=0)
     {
         if(e.code == "ArrowLeft")
         {
             main_video.currentTime=main_video.currentTime - 5;
            }
            else if(e.code=="ArrowRight")
            {
             main_video.currentTime=main_video.currentTime + 5;

         }
            else if((e.code =="Keyf") || (e.code=="KeyF"))
            {
            full_screen();

         }
            
       

        if(e.code == "ArrowUp")
        {
            if(main_video.volume <1)
            {
                if(main_video.volume >=0.9)
                {

                    main_video.volume= 1;
                    volume_bar.style.width = "100%";
                }
                else{

                    main_video.volume= main_video.volume + 0.1;
                    volume_bar.style.width = main_video.volume *100 +"%";
                }

            }
            // volume show setting 
            box_show_volume.innerHTML=volume_bar.style.width == "" ? "100%":parseInt(volume_bar.style.width) +"%" ;
            volume_show_container.classList.remove("onone");
            box_show_volume.classList.remove("onone");
            
            
            setTimeout(() => {
                box_show_volume.classList.add("onone");
                
                volume_show_container.classList.add("onone");
            }, time_out);
         

        }  
        else if(e.code == "ArrowDown")   
        {
            if(main_video.volume <= 0.1)
            {

                main_video.volume = 0;
                volume_bar.style.width= "0%";
                box_show_volume.innerHTML=volume_bar.style.width;

            }
            else
            {
                main_video.volume = main_video.volume - 0.1;
                if (main_video.volume<0.1) {
                    main_video.volume=0;
                }
                volume_bar.style.width=main_video.volume *100 + "%";
            }
               show_volume_anime();

        }
     if(e.code =="Space")
     {
        play_pause_video();
     }
     if((e.code =="Keym") || (e.code=="KeyM"))
   {
       if(main_video.volume >0)
       {
       final_volume= main_video.volume;

        main_video.volume = 0;
        volume_bar.style.width = "0px";
        change_volume_icon(main_video.volume);
       }
       else
       {

        if(final_volume <=0){
            main_video.volume = 0.1;
            final_volume= main_video.volume ;

         }
         else
         {

             main_video.volume = final_volume;
         }
           volume_bar.style.width = main_video.volume*100 +"%";
        change_volume_icon(main_video.volume);

       }
   }
   change_volume_icon(main_video.volume);

    }
}
// change_volume_by_key
//change_volume_icon
function change_volume_icon(v)
{
    if(v<=0)
    {
        volume_icon_container.innerHTML = `<i class="fa fa-volume-mute"></i>`
        volume_show_container.innerHTML = `<i class="fa fa-volume-mute"></i>`
    }
    else if(v>0.5)
    {
        volume_icon_container.innerHTML = `<i class="fa fa-volume-up"></i>`
        volume_show_container.innerHTML = `<i class="fa fa-volume-up"></i>`

    }
    else if(v<0.5)
    {
        volume_icon_container.innerHTML = `<i class="fa fa-volume-down"></i>`
        volume_show_container.innerHTML = `<i class="fa fa-volume-down"></i>`

    }
    
}
//change_volume_icon
// speed.value=0.1;
//change speed 
function change_speed()
{
    main_video.playbackRate = speed.value;

}
//change speed 
function show_pointer()
{
player.classList.remove("pointer_d");


}
var x;
player.addEventListener('mousemove', function() { 
    player.classList.add("pointer_d");
    if (x) clearTimeout(x); 
    x = setTimeout(show_pointer, 500); 
}, false);

// ********************************************************
main_container.addEventListener("dragover",(e)=>{
    e.preventDefault();
   
 })
 main_container.addEventListener("drop",(e)=>{
    e.preventDefault();
    const files=e.dataTransfer.files;
    if(files.length)
    {
    
        
        var path = (window.URL || window.webkitURL).createObjectURL(files[0]);
        document.getElementById("main_video").src=path;
    }
 })
// change_video
function change_video(v){
    // console.log("hellow");

    let file = v.files[0];
    
    var path = (window.URL || window.webkitURL).createObjectURL(file);
    document.getElementById("main_video").src=path;
   
    // let reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = (e)=>{
      
    // }

  

}

