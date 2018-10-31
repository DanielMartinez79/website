function addExerciseDisplay(val){
    if (checkRepeat(val) & checkEmpty(val)){
        checkForSub()
        $("#reset").css("display", "inline")
        var components = createExerciseComponents()
        var container = assembleComponents(components)
        $('#exerciseList').append(container)
    }
}

/*Checks if a submit button exists on the page and deletes it */
function checkForSub() {
    if ($("#sub") != null) {
        $("#sub").remove()
    }
}

/*Creates a Weight Display elements, which displays
the weight range's current value */
function createWeightDisplay(){
    return $(document.createElement("h6"))
}

/*Creates a weight range, which the user uses to specify
how much weight they are using on their current set */
function createWeightRange(){
    var range = $(document.createElement("input"))
    .attr('type','range' )
    .addClass('weightRange')
    return range
}

/*Creates an exerciseName element, which takes the users input
and displays it */
function createExerciseName(){
    var label = $(document.createElement("h5"))
    .addClass("exerciseName")
    .text($("#exerciseInput").val())
    return label
}

/*Create an input which takes in the number of reps that
the user did in the set */
function createRepInput(){
    var inp = $(document.createElement("input"))
    .attr('type','number' )
    .addClass("set")
    return inp
}

/*Creates a submit button which the user uses to record
their set in the database */
function createSubmit(){
    var sub = $(document.createElement("input"))
    .attr('type', 'button')
    .addClass('submit')
    .attr('value', 'Submit')
    .attr('id','sub');
    return sub
}

function createExerciseComponents(){
    var name = createExerciseName()
    var range = createWeightRange()
    var reps = createRepInput()
    var sub = createSubmit()
    var display = createWeightDisplay()

    configureWeightRange(range, 0, 100)
    configureRepInput(reps, 1)
    marryWeight(range, display)
    marrySubReps(sub, reps)

    var collection = [name,range,display,reps,sub]
    return collection
}

/*Links the weight range and weight display together */
function marryWeight(range, display){
    display.text("Weight: " + $(range).val())
    range.on('input', {arg: display}, onInputRange)
}

/*Sets the min and max range values */
function configureWeightRange(range, low, high){
    range.attr('min', low)
    .attr('max', high)
}

/*Sets the place holder and name of the Rep input
based on the number passed as argument. 
Also sets on the onInput function */
function configureRepInput(reps, num){
    reps.attr('placeholder', "Set " + num)
    .attr('name', num)
    .on('input' ,{arg: reps}, onInputReps)
}

/*Assembles the elements in the collection argument
and packs them into a list element*/
function assembleComponents(collection){
    var container = $(document.createElement("li"));
    for (i in collection){
        $(container).append(collection[i])
    }
    container.addClass("exerciseContainer")
    return container
}

/*Links the submit button wit the rep input */
function marrySubReps(sub, reps){
    sub.unbind()
    .on("click",{arg: reps}, onclickSub)
    .on('keypress', {sub: sub}, preventEnter)
}

function addRepInput () {
    inp = $("#currentInput")
    var newReps = createRepInput()

}

function toggleProgress() {
    button = $('#progressIcon')
    if (button.hasClass("toggled")){
        button.removeClass("toggled")
        hideProg()
    } else {
        button.addClass("toggled")
        showProg()
    }
}

function hideProg() {
    target =  $("#progressTable").html()
    target.remove()
}

function showProg(){
    toggle('progress')
    $("#progressTable").html("<tr><th>Name</th><th>Set</th><th>Reps</th><th>Weight</th><th>Date</th></tr>")
    queryAJAX(fillTable)
}

function createExerciseObject() {
    var inp = $("#currentInput")
    var obj = {
        "name" : inp.parent().find(".exerciseName").text(), 
        "set": inp.attr('name'), 
        "reps": inp.val(), 
        "weight": inp.parent().find(".weightRange").val() 
    }
    return obj
}

function saveReps(){
    obj = createExerciseObject()
    console.log(obj);
    var jsonObj = JSON.stringify(obj);
    sendAJAX(jsonObj);
    return false;
}

function updateReps(){
    obj = createExerciseObject()
    console.log(obj);
    var jsonObj = JSON.stringify(obj);
    updateAJAX(jsonObj);
    return false;
}

function checkRepeat(val){
    var coll = document.getElementById("exerciseList").getElementsByClassName("exerciseName");
    var i;
    for (i = 0; i < coll.length; i++) {
        if (coll[i].innerText === val) {
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

function submitChanges(min ,max){
    return function(){
        var ranges = document.querySelectorAll("input[type=range]")
        if (ranges != null){
            console.log(ranges, min, max)
            for (i in ranges){
                configureWeightRange(ranges[i], min.value, max.value)
            }
        }
    }
}

function toggle(arg) {
    console.log(arg)
    target = $("#mainDisplay").find("#"+arg)
    if ($(target).hasClass('toggleOn')){
       toggleOff('#' + arg)
    } else {
        $("#mainDisplay").find(".toggleOn").removeClass("toggleOn").addClass("toggleOff")
        toggleOn('#'+arg)
        target.prepend($("#closeButton"))
    }
}

function toggleOn(tar){
    $(tar).removeClass("toggleOff").addClass("toggleOn")
}

function toggleOff(tar){
    $(tar).removeClass("toggleOn").addClass("toggleOff")
}

function fillTable(res){
    var data = res.responseText
    var items = data.split(";")
    var table = $("#progressTable")
    for (let i = 0; i < items.length-1; i++){
        console.log(JSON.parse(items[i]))
        obj = JSON.parse(items[i])
        table.append("<tr><td>" + obj.name
         + "</td><td>" + obj.set 
         + "</td><td>" + obj.reps 
         + "</td><td>" + obj.weight
         + "</td><td>" + obj.date)

    }
}

function init() {
    $(document).ready(function(){
        $(".bubble").click(function(){
            target = $(this).find(".bubbleContents")
            if (target.hasClass("toggleOff")){
                toggleOn(target)
            } else {
                toggleOff(target)
            }
        })
    })
}