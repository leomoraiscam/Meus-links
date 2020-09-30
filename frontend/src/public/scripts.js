const ul = document.querySelector("ul");
const input = document.querySelector("input");
const textarea = document.querySelector("textarea");
const form = document.querySelector("form");

async function load() {
  const res = await fetch("http://localhost:3000/").then((data) => data.json());
  // res.urls.map((url) => addElement(url));

  const lastLinks = [];

  const arr = res.urls.map((url) => url).reverse();
  arr.map((url, index) => (index < 5 ? lastLinks.push(url) : lastLinks));
  lastLinks.map((url) => addElement(url));
}

load();

function addElement({ name, url, description }) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  const trash = document.createElement("span");

  a.href = url;
  a.innerHTML = name;
  a.target = "_blank";

  trash.innerHTML = "x";

  trash.onclick = () => removeElement(name, url, trash);

  li.append(a);
  ul.append(li);
  li.append(trash);
}

async function removeElement(name, url, el) {
  if (confirm("Tem certeza que deseja deletar?")) {
    const response = await fetch(
      `http://localhost:3000?name=${name}&url=${url}&del=${1}`
    );

    return el.parentNode.remove();
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let { value } = input;
  let description = textarea.value;

  if (!value || !description) return alert("Preencha os campos");

  const [name, url] = value.split(",");

  if (!url) return alert("formate o texto da maneira correta");

  if (!/^http/.test(url)) return alert("Digite a url da maneira correta");

  fetch(
    `http://localhost:3000?name=${name}&url=${url}&description=${description}`
  );
  addElement({ name, url });

  input.value = "";
  textarea.value = "";
});
