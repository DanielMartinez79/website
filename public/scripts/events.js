/*This onclick function links the submission button to the 
rep input so that when the button is clicked, it takes the input
element and saves it's values. Also rearranges the submit button
depending on where it is on the page */
function onclickSub(event){
    inp = $(event.data.arg)
    if (checkEmpty($(inp).val())){
        inp.addClass("blackout")
        console.log($(inp).nextAll().length)
        if ( inp.nextAll().length == 1  ){
            saveReps()
            var newReps = createRepInput();
            configureRepInput(newReps, parseInt($(inp).attr('name')) + 1)
            sub = $('#sub')
            marrySubReps(sub, newReps)            
            inp.after(newReps)
        } else {
            updateReps()
            sub = $('#sub')
            marrySubReps(sub, $(inp).nextAll().get([$(inp).nextAll().length-1]))
            inp.parent().append(sub)
        }
        return false;
    }
}

/*This on input function rearranges the submit button so that it
corresponds with the current rep input */
function onInputReps(event){
    inp = $(event.data.arg)
    var prev = $("#currentInput")
    if (! prev.is(inp)){
        prev.removeAttr("id")   
        inp.attr("id", "currentInput");
    }
    var subBut = $("#sub")
    marrySubReps(subBut, inp)
    inp.after(subBut)
}

/*This function displayes the weight range's value on the display argument*/
function onInputRange(event){
    dis = event.data.arg
    dis.text("Weight: " + $(this).val())
}

function preventEnter(event) {
    sub = event.data.sub
    if (event.keyCode == 13){
        event.preventDefault()
        sub.trigger('click')
    }
}
