const ui = document.querySelector(".ui");
let credits;

const addHtml = (html) => {
	ui.insertAdjacentHTML("beforeend", html);
};
const getHtmlFromFile = async (file) => {
	const response = await fetch(file);
	const html = await response.text();
	addHtml(html);
  return ""
};

const getStartButton = () => {
	const start = document.querySelector(".start");
	return start;
}

const deleteHtml = () => {
	ui.innerHTML = null;
};
