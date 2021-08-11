img = "";
status = "";
objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    

}

function preload() {
    
}

function draw() {
    image(video, 0, 0, 380, 380);
    
if (status != "") {

    objectDetector.detect(video ,gotResults);

     for (i = 0; i < objects.length; i++) {

        document.getElementById("status").innerHTML = "Status : Object Detector";
        document.getElementById("number_of_objects").innerHTML = "Number of Objects : "+ objects.length;

        fill("#ff0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#ff0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
     }
 }
}

function modelLoaded() {
    console.log("ml5 Has Been Activated");

    status = true;
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}
