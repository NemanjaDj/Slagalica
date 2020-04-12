var rowNumber = 0, columnNumber = 0;
var newGame = 0;
var computerMarks;
var userMarks = []

function NewGame(){
    newGame = 1;
    rowNumber = 0;
    columnNumber = 0;
    computerMarks = ComputerMarks();
    MarkNeutralResultFields();
    MarkNeutralMarkFields();
    console.log(computerMarks);
}

function OnLoadMessage(){
    alert("Za pocetak igre pritisnite New game");
}

function SetMark(id, mark){
    document.getElementById(id).src = "images/" + mark + ".png";
}

function GetMark(mark){
    if(newGame){
        SetMark(NextAvailableField(), mark);
        userMarks[columnNumber] = mark;
        columnNumber++;
        IncrementRow.apply(this, userMarks);
    }
}

function NextAvailableField(){
    return 'field' + rowNumber + columnNumber;
}

function IncrementRow(){
    if(columnNumber > 3){
        CompareResults.apply();
        rowNumber++;
        columnNumber = 0;
    }
}

function ComputerMarks(){
    var markList = [];
    for(i = 0; i < 4; i++){
        markList[i] = CreateMark(Math.ceil((Math.random() * 6)));
    }
    return markList;
}

function CreateMark(id){
    switch(id){
        case 1:
            return 'tref';
        case 2:
            return 'karo';
        case 3:
            return 'pik';
        case 4:
            return 'herc';
        case 5:
            return 'moon';
        case 6: 
            return 'star';
        default:
            return 'invalid';
    }
}

function CompareResults(){
    var remainingMarks = [];
    var score = 0;
    for(i = 0; i < 4; i++){
        if(userMarks[i] == computerMarks[i]){
            MarkRed(score);
            score++;
            userMarks[i] = 'x'; // change value of mark, to avoid marking it yellow if there is another same mark
        } else {
            remainingMarks[i] = computerMarks[i];
        }
    }

    if(!IsGoodCombination(score)){
        for(i = 0; i < remainingMarks.length; i++){
            for(j = 0; j < remainingMarks.length; j++){
                if(remainingMarks[j] == userMarks[i]){
                    MarkYellow(score);
                    score++;
                    remainingMarks[j] = 'y'; // change value of mark, to avoid marking double yellow if there is more marks of this type
                    break;
                }
            }
        }
    }
}

function IsGoodCombination(score){
    if(score == 4){
        newGame = 0;
        alert("Bravo! Pogodili ste pravu kombinaciju, \n Za novu igru pritisnite 'New game'.");
        return true;
    } 
    if(rowNumber == 5){
        alert("Nazalost niste pogodili kombinaciju, \n resenje je: " + computerMarks[0] + 
        ", " + computerMarks[1] + ", " + computerMarks[2] + ", " + computerMarks[3] + ".");
        newGame = 0;
    }
    return false;
}

function MarkRed(score){
    document.getElementById('fieldResult' + rowNumber + score).classList.remove('neutral');
    document.getElementById('fieldResult' + rowNumber + score).classList.add('red');
}

function MarkYellow(score){
    document.getElementById('fieldResult' + rowNumber + score).classList.remove('neutral');
    document.getElementById('fieldResult' + rowNumber + score).classList.add('yellow');
}

function MarkNeutralResultFields(){
    for(i = 0; i < 6; i++){
        for(j = 0; j < 4; j++){
            document.getElementById('fieldResult' + i + j).classList.remove('yellow');
            document.getElementById('fieldResult' + i + j).classList.remove('red');
            document.getElementById('fieldResult' + i + j).classList.add('neutral');
        }
    }
}

function MarkNeutralMarkFields(){
    for(i = 0; i < 6; i++){
        for(j = 0; j < 4; j++){
            document.getElementById('field' + i + j).src = "images/default.png";
        }
    }
}