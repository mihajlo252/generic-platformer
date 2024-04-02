let start;
window.onload = async () => {
  await getHtmlFromFile("./components/menu.html");
  start = getStartButton();
  start.addEventListener('click', handleStart);
}

const handleStart = () => {
	deleteHtml();
	getHtmlFromFile("./components/level1.html");
  ui.dataset.level = "level1";
};


