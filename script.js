const Qoutput = document.querySelector(".question h2");
const answer_ouput = document.querySelector(".outputs");
const keyborad_html = document.querySelector(".Player_output");
const nb_trys = document.querySelector(".trys");
const lose_screen = document.querySelector(".losing_screen")
const Retry_button = document.querySelector(".click button");
const win_msg = document.querySelector(".pic");
const continue_btn = document.querySelector(".winner button");

let topics = ["school", "sports","countrys", 
			"best persons", "1337~leet", "food"];
let possible =  [
	["student", "book", "class", "pencil"],
	["football", "bascket", "swiming", "chess", "pingpong"],
	["morroco", "france", "russia", "unitedstates", "japan"],
	["adil", "jojo", "ferryat"],
	["staff", "akaseck", "student", "mac", "intra"],
	["tajin","sushi", "tacos", "msmn"],
];
let random_word = 0;
let topic_rd = 0;
let print_count = 0;
let answer = answer_p(possible);
let question = "";
let count_trys = answer.length;
let keyBoards = "asdfghjklqwertyuiopzxcvbnm";
let holder = array_c(count_trys);

question = question_tp(topics);
display_trys();
Qoutput.innerHTML = question;
answer_place_displayer(answer, answer_ouput);
keyBoards_displayer(keyBoards, keyborad_html);
const keys = document.querySelectorAll(".t");

//if i click any key this fonction take me to the function that check if 
// i click the right character
keys.forEach(e =>
	{
		e.addEventListener("click", ()=>
		{
			let x = e.innerHTML;
			find_the_elemnt(x, answer)
		});
	}
)
// reaload the page if i click the button 
Retry_button.addEventListener("click", ()=>
{
	window.location.reload();
});
// same here 
continue_btn.addEventListener("click", ()=>
{
	window.location.reload();
});

