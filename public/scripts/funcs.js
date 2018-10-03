function addExerciseDisplay(val){
    if (checkRepeat(val) & checkEmpty(val)){
        checkForSub()
        document.getElementById("reset").style.display="inline"
        var components = createExerciseComponents()
        var container = assembleComponents(components)
        document.getElementById("exerciseList").appendChild(container)
    }
}

/*Checks if a submit button exists on the page and deletes it */
function checkForSub(){
    sub = document.getElementById("sub")
    if (sub != null){
        sub.parentNode.removeChild(sub)
    }
}

/*Creates a Weight Display elements, which displays
the weight range's current value */
function createWeightDisplay(){
    var weight = document.createElement("h6")
    return weight
}

/*Creates a weight range, which the user uses to specify
how much weight they are using on their current set */
function createWeightRange(){
    var range = document.createElement("input")
    range.type = "range"
    range.className = "weightRange"
    return range
}

/*Creates an exerciseName element, which takes the users input
and displays it */
function createExerciseName(){
    var label = document.createElement("h5")
    label.className = "exerciseName"
    label.innerText = document.getElementById("exerciseInput").value
    return label
}

/*Create an input which takes in the number of reps that
the user did in the set */
function createRepInput(){
    var inp = document.createElement("input")
    inp.type = "number"
    inp.className = "set"
    return inp
}

/*Creates a submit button which the user uses to record
their set in the database */
function createSubmit(){
    var sub = document.createElement("input")
    sub.type = "button"
    sub.className = "submit"
    return sub
}

/*Creates all the elements required for the app's
main functionality */
function createExerciseComponents(){
    var name = createExerciseName()
    var range = createWeightRange()
    var reps = createRepInput()
    var sub = createSubmit()
    var display = createWeightDisplay()
    configureExerciseComponents(name, range, display, reps, sub)
    var collection = [name,range,display,reps,sub]
    return collection
}

/*Configures the elements to their initial configurations */
function configureExerciseComponents(name, range, display, reps, sub){
    configureWeightRange(range, 0, 100)
    configureRepInput(reps, 1)
    configureSubmit(sub)
    marryWeight(range, display)
    marrySubReps(sub, reps)
}

/*Links the weight range and weight display together */
function marryWeight(range, display){
    range.oninput = onInputRange(display)
}

/*Sets the min and max range values */
function configureWeightRange(range, low, high){
    range.min = low
    range.max = high
}

/*Sets the place holder and name of the Rep input
based on the number passed as argument. 
Also sets on the onInput function */
function configureRepInput(reps, num){
    reps.placeholder = "Set " + num
    reps.name = num
    reps.oninput = onInputReps(reps)
}

/*Sets the id and value of the submit button*/
function configureSubmit(sub){
    sub.value = "Submit"
    sub.id = "sub"

}

/*Assembles the elements in the collection argument
and packs them into a list element*/
function assembleComponents(collection){
    var container = document.createElement("li")
    for (i in collection){
        container.appendChild(collection[i])
    }
    container.className = "exerciseContainer"
    return container
}

/*Links the submit button wit the rep input */
function marrySubReps(sub, reps){
    sub.onclick = onclickSub(reps)
}

/*This onclick function links the submission button to the 
rep input so that when the button is clicked, it takes the input
element and saves it's values. Also rearranges the submit button
depending on where it is on the page */
function onclickSub(inp){
    return function() {
        if (checkEmpty(inp.value)){
            inp.classList.add("blackout")

            var last = inp.parentNode.getElementsByClassName("set")
            if (last[last.length-1] === inp){
                saveReps()
                var newReps = createRepInput();
                configureRepInput(newReps, parseInt(inp.name) + 1)
                sub = document.getElementById("sub")
                marrySubReps(sub, newReps)            
                inp.insertAdjacentElement("afterend", newReps)
            } else {
                updateReps()
                sub = document.getElementById("sub")
                marrySubReps(sub,last[last.length-1] )            
                last[last.length-1].insertAdjacentElement("afterend",sub)
            }
            return false;
        }
    }
}

/*This on input function rearranges the submit button so that it
corresponds with the current rep input */
function onInputReps(inp){
    return function() {
        var prev = document.getElementById("currentInput")
        if (prev != null){
            prev.id = "";
        }
        this.id = "currentInput";
        var subBut = document.getElementById("sub");
        marrySubReps(subBut, inp)
        this.insertAdjacentElement( "afterend", subBut);
    }
}

/*This function displayes the weight range's value on the display argument*/
function onInputRange(dis){
    return function () {
        dis.innerText = this.value
    }
}

function replaceProg(){
    button = document.getElementById("prog")
    button.value = "Hide Progress"
    button.onclick = function() {
        this.value = "View Progress"
        target =  document.getElementById("progress")
        target.parentNode.removeChild(target)
        this.onclick = showProg
    }
}

function showProg(){
    var progList = document.createElement("p")
    progList.id = "progress"
    toggle =  document.getElementById("prog")
    toggle.parentNode.insertAdjacentElement("afterend", progList)
    replaceProg()
    queryAJAX()
}

function saveReps(){
    var inp = document.getElementById("currentInput");
    var obj = {"name" : inp.parentNode.getElementsByClassName("exerciseName")[0].innerText, "set": inp.name, "reps": inp.value, "weight": inp.parentNode.getElementsByClassName("weightRange")[0].value }
    console.log(obj);
    var jsonObj = JSON.stringify(obj);
    sendAJAX(jsonObj);
    return false;
}

function updateReps(){
    var inp = document.getElementById("currentInput");
    var obj = {"name" : inp.parentNode.getElementsByClassName("exerciseName")[0].innerText, "set": inp.name, "reps": inp.value, "weight": inp.parentNode.getElementsByClassName("weightRange")[0].value }
    console.log(obj);
    var jsonObj = JSON.stringify(obj);
    updateAJAX(jsonObj);
    return false;
}
function checkRepeat(val){
    var coll = document.getElementById("exerciseList").getElementsByClassName("exerciseName");
    var i;
    for (i = 0; i < coll.length; i++) {
        if (coll[i].innerText.includes(val)) {
            alert("Duplicate");
            return false;
        } 
    }
    return true;
}

function reset(obj,val) {
    document.getElementById(val).innerHTML = "";
    obj.style.display = "none";
}

function checkEmpty(val) {
    if (val === "") {
        alert("Empty");
        return false;

    } else return true;
}