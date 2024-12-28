
// display the answers : 

function answer_place_displayer(answer, answer_ouput)
{
	let i = 0;

	while (i < answer.length)
	{
		answer_ouput.innerHTML += `<h1 class='el'>_</h1>`;
		i++;
	}
}
// display KeyBoards : 
function keyBoards_displayer(keyBoards, keyborad_html)
{
	let i = 0;

	while (i < keyBoards.length)
	{
		keyborad_html.innerHTML+= `<h1 class="t">${keyBoards[i]}</h1>`;
		i++;
	}
}
// check if elment or the character are in the anwer string 
function find_the_elemnt(c, arr)
{
	let i = 0;
	// while the character not equale any element of string increment until you be in end
	while (c != arr[i] && i < arr.length -1 )
		i++;
	//string eqaual the holder skeep until wont equal or end of string
	while (arr[i] == holder[i] && i < arr.length -1)
		i++;
	if (c == arr[i])
	{
		// save the element in holder array so you can use it againe 
		holder[i] = arr[i];
		output_it_into_anser_bar(c, i);
		win(arr);
	}
	else
		trys_manager();
}

// outout/replace  the player answer in amswer place : 
function output_it_into_anser_bar(c, index)
{
	document.querySelectorAll(".el")[index].innerHTML = c;
}

// if trys == 0 the player loose:
function trys_manager()
{
	count_trys -=1;
	if (count_trys === 0)
	{
		count_trys = 0;
		lose_screen.classList.add("you_lose");
	}
	display_trys();
}

// how many trys left displayer
function display_trys()
{
	nb_trys.innerHTML= count_trys;
}

// winner checker
function win()
{
	print_count++;
	if (print_count == answer.length)
		win_msg.classList.add("Allow");
}

// what the anser genetator :

function answer_p(possible)
{
	topic_rd = Math.floor(Math.random() * possible.length);
	random_word = Math.floor(Math.random() * possible[topic_rd].length);
	return (possible[topic_rd][random_word]);
}

// find topic question 
function question_tp(topics)
{
	return (topics[topic_rd]);
}


// creat array for holder  : 

function array_c(count)
{
	let array = [];
	let i = 0;
	while (i < count)
	{
		array.push("");
		i++;
	}
	return (array);
}