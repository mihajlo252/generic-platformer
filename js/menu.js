let start;
window.onload = async () => {
  await getHtmlFromFile("./components/menu.html");
  start = getStartButton();
  start.addEventListener('click', handleStart);
}

const handleStart = () => {
	deleteHtml();
	getHtmlFromFile("./components/demoLevel.html");
  ui.dataset.level = "demoLevel";
};


