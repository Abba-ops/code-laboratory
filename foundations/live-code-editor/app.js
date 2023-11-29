const html = document.querySelector("#html-code");
const css = document.querySelector("#css-code");
const js = document.querySelector("#js-code");
const output = document.querySelector("#output");

const run = () => {
  const htmlValue = html.value;
  const cssValue = css.value;
  const jsValue = js.value;

  output.contentDocument.body.innerHTML =
    htmlValue + "<style>" + cssValue + "</style>";
  output.contentWindow.eval(jsValue);
};

html.addEventListener("keyup", () => {
  run();
});

css.addEventListener("keyup", () => {
  run();
});

js.addEventListener("keyup", () => {
  run();
});
