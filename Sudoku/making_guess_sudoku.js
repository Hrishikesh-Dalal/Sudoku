var current = null;
var other = null;

var error =0;
var digits_guess =0;
var correct_guess =0;
var guess = 3;
var time_game_control = true;

var board_num = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]
var user_soln = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

window.onload = function(){
    setboard();
}

function setboard(){
    //timer buttons
    for(let j = 1; j<=3; j++){
        let btn = document.createElement("button");
        btn.setAttribute("id",j);
        if(j==1){
            btn.innerText = "4:00";

        }
        if(j==2){
            btn.innerText = "7:00";
        }
        if(j==3){
            btn.innerText = "10:00";
        }
        btn.classList.add("timer_btn")
        document.getElementById("input_time").appendChild(btn);
        btn.addEventListener("click",get_time);
    }
    //if you first set the board the program doesn't work. why? as the first below num calls the function select_below_num which sets current tile,
    // the other function of main board call the function select_main_board which depends on the other function hence the game gets hunged

    for(let i = 1; i<=9; i++){
        //<div class id >inner text</div>
        let below_num = document.createElement("div");
        below_num.setAttribute("id",i);
        below_num.innerText = i;
        
        below_num.classList.add("below_num");
        
        document.getElementById("digits").appendChild(below_num);
        below_num.addEventListener("click", select_below_board);
    }


    //first below_board
    for(let r = 0; r<9; r++){
        for(let c = 0; c<9; c++){
            let main_num = document.createElement("div");
            main_num.setAttribute("id", r.toString() +"-"+c.toString());
            console.log(main_num.id);
            //the below one does not work
            // main_num.setAttribute("innerText", board_num[r][c]);
            //the below one wroks
            if(board_num[r][c]!="-"){
            main_num.innerText = board_num[r][c];
            main_num.classList.add("pre_filled");
            }
            else{
                main_num.classList.add("empty");
                digits_guess++;
            }
            
            main_num.classList.add("main_num");
            if (r == 2 || r == 5) {
                main_num.classList.add("horizontal_line");
            }
            if (c == 2 || c == 5) {
                main_num.classList.add("vertical_line");
            }
            document.getElementById("board").appendChild(main_num);

            main_num.addEventListener("click", select_board);
        }
    }
    //main_num.addEventListener("click", select_main_board);
    document.getElementById("digits_to_guess").innerText = "Guess Left : " + digits_guess;
    document.getElementById("correct_guess").innerText = "Correct Guess : " + correct_guess;
    
    //guess button
    
    let guess_btn = document.createElement("button");
    guess_btn.setAttribute("id", "guess_btn");
    guess_btn.innerText = "Clue";
    guess_btn.classList.add("guess_btn");
    document.getElementById("guess_main_button").appendChild(guess_btn);
    //What is the format of addEventListener?
    //if the event/input is valid anuwhere in entire document then document otherwise the name of the button or so like guess_btn
    setInterval(call_guess, 1000);
    //guess_btn.addEventListener("click",reveal);
    
    
}
function call_guess(){
  
    guess_btn.addEventListener("click",reveal);
    
    //console.log("called");
}
function select_below_board(){
    if(current != null){
        current.classList.add("below_num");
        current.classList.remove("below_num_clicked");
        current = null;
    }
    current = this;
    this.classList.remove("below_num");
    this.classList.add("below_num_clicked");
}
function select_board(){
    other = this;
    let splitt = this.id.split("-");
console.log(splitt);
    let row = parseInt(splitt[0]);
    let col = parseInt(splitt[1]);
    if(current.id == solution[row][col]){
        this.innerText = current.id;
        this.classList.remove("empty");
        this.classList.add("user_filled");

        correct_guess++;
        document.getElementById("correct_guess").innerText = "Correct Guess : " + correct_guess;

        digits_guess--;
        document.getElementById("digits_to_guess").innerText = "Guess Left : " + digits_guess;

        var store = solution[row][col];
        var first = user_soln[r].slice(0,col);
        var second = user_soln[r].slice(col+1);
        result = first + store + second;
        user_soln[row] = result;
        
           

        

        //changing soln array
        user_soln[row][col]=solution[row][col];
    }
    else if(this.innerText == ""){
        error++;
        document.getElementById("error").innerText = "Errors : "+error;
    }
}
var min = null;
var sec = null;
var min_give = 0;
var sec_give = 0;
var level;
function get_time(){
    if(min==null && sec == null){
        level = this;
        console.log(level.id);
        if(level.id == 1){
            min = 4;
            sec = 0;
            console.log(level.id);
        }
        if(level.id == 2){
            min = 7;
            sec = 0;
        }
        if(level.id == 3){
            min = 10;
            sec = 0;
        }
        use_time();
        document.getElementById("the_head").style.display = "none";
    }
   
}
function use_time(){
    let x = setInterval(function(){
        if(sec>0){
            sec--;
        }
        else if( min>0 && sec==0){
            min--;
            sec=59;
        }
        //output
        if(time_game_control==true){
            if(min>0 || sec>0){
            document.getElementById("time").innerText = "Min : " + min + " Sec : " + sec;
            }
            else{
                document.getElementById("time").innerText = "Time Up!";
                document.getElementById("body").style.backgroundColor = "#8f2b2b";
                time_game_control=false;
                give_time();
            }
        }
    },1000)
}

function give_time(){
    let x = setInterval(function(){
        if(sec_give==59){
            sec_give = 0;
            min_give= min_give+1;
        }
        else{
            sec_give=sec_give+1;
        }
        if(sec_give>0){
        document.getElementById("below_time").innerText = "Min : " + min_give + " Sec : " + sec_give;}
    }, 1000)
}
var toggle = true;
//random
function reveal(){
    console.log("reached");
    toggle=true;
    if(guess>0){
        while(toggle==true){
            let r = Math.floor(Math.random()*9);
            let c = Math.floor(Math.random()*9);
            //console.log(r);
            if(user_soln[r][c]=="-"){
                var store = solution[r][c];
                var first = user_soln[r].slice(0,c);
                var second = user_soln[r].slice(c+1);
                result = first + store + second;
                console.log(result);
                user_soln[r] = result
                document.getElementById(r.toString() +"-"+c.toString()).innerText = user_soln[r][c];
                console.log("reached here");
                //show.innerText = ;

                document.getElementById(r.toString() +"-"+c.toString()).classList.remove("empty");
                document.getElementById(r.toString() +"-"+c.toString()).classList.add("clued");

                digits_guess--;
                document.getElementById("digits_to_guess").innerText = "Guess Left : " + digits_guess;

                toggle = false;
                guess--;
                break;
            }
        }
    }
    toggle = true;
    // for(let r = 1; r<9; r++){
    //     for(let c = 1; c<9; c++){
            
    //     }
    //     if(toggle == false){
    //     break;
    //     }
    // }
    
}