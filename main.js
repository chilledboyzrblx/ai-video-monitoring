audio = '';
video = '';
objects = [];
status = "";


function preload() {
    audio = loadSound('alarm.mp3');
}

function setup() {
    video = createCapture(VIDEO);
    video.hide();
    canvas = createCanvas(640, 500);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
}

function modelLoaded() {
    console.log("model has loaded");
    status = true;
}

function gotResults(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 640, 500)
    if (status != "") {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Baby Found😅";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == "person"){
                document.getElementById("status").innerHTML = "Baby Found😅";
                console.log("stop");
                audio.stop();
            } else {
                document.getElementById("status").innerHTML = "Baby Not Found😨😱...";
                console.log("play");
                audio.play();
            }
        }
        if (objects.length == 0) {
            document.getElementById("status").innerHTML = "Baby Not Found😨😱...";
            console.log("play");
            audio.play();
        }
    }
}