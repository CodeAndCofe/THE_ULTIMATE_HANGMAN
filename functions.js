function answer_place_displayer(answer, answer_ouput)
{
	let i = 0;

	while (i < answer.length)
	{
		answer_ouput.innerHTML += `<h1 class='el'>_</h1>`;
		i++;
	}
}

function keyBoards_displayer(keyBoards, keyborad_html)
{
	let i = 0;

	while (i < keyBoards.length)
	{
		keyborad_html.innerHTML+= `<h1 class="t">${keyBoards[i]}</h1>`;
		i++;
	}
}

function find_the_elemnt(c, arr)
{
	let i = 0;
	while (c != arr[i] && i < arr.length -1 )
	{
		i++;
	}
	while (arr[i] == holder[i] && i < arr.length -1)
		i++;
	if (c == arr[i])
	{
		holder.push(arr[i]);
		output_it_into_anser_bar(c, i);
		win(arr);
	}
	else
		trys_manager();
}


function output_it_into_anser_bar(c, index)
{
	document.querySelectorAll(".el")[index].innerHTML = c;
}

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
function display_trys()
{
	nb_trys.innerHTML= count_trys;
}

function win()
{
	print_count++;
	if (print_count == answer.length)
		win_msg.classList.add("Allow");
		
}
function answer_p(possible)
{
	random_word = Math.floor(Math.random() * 3);
	topic_rd = Math.floor(Math.random() * 5);

	return (possible[topic_rd][random_word]);
}

function question_tp(topics)
{
	return (topics[topic_rd]);
}