prediction1=""
prediction2=""


Webcam.set({
    width:350,
    height:350,
    image_format:'png',
    png_quality:90
})

Webcam.attach("#camera")

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img src="'+data_uri+'" id="captured_img">'
    })
}


console.log("ml5_version=",ml5.version)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/6vUTfVjXR/model.json",model_loaded)
function model_loaded(){
    console.log("model is loaded")
}



function speak(){
    var synth=window.speechSynthesis;
    speak_data1= "The first prediction is"+ prediction1
    speak_data2= "The second prediction is"+ prediction2
    utter=new SpeechSynthesisUtterance(speak_data1+speak_data2)
    synth.speak(utter)
}



function check(){
    img=document.getElementById("captured_img")
    classifier.classify(img,got_result)
}


function got_result(error,results){
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML=results[0].label
        document.getElementById("result_emotion_name1").innerHTML=results[1].label
        prediction1=results[0].label
        prediction2=results[1].label
        speak()
        if (prediction1=="happy") {
            document.getElementById("update_emoji").innerHTML="&#128522;"
        }


        if (prediction1=="sad") {
            document.getElementById("update_emoji").innerHTML="&#128546;"
        }


        if (prediction1=="angry") {
            document.getElementById("update_emoji").innerHTML="&#128548;"
        }







        if (prediction2=="happy") {
            document.getElementById("update_emoji_1").innerHTML="&#128522;"
        }


        if (prediction2=="sad") {
            document.getElementById("update_emoji_1").innerHTML="&#128546;"
        }


        if (prediction2=="angry") {
            document.getElementById("update_emoji_1").innerHTML="&#128548;"
        }
    }
    }

