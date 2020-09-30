const ul = document.querySelector("ul");
const input = document.querySelector("input");
const textarea = document.querySelector("textarea");
const form = document.querySelector("form");

async function load() {
  const res = await fetch("http://localhost:3000/").then((data) => data.json());
  res.urls.map((url) => addElement(url));
}

load();

function addElement({ name, url, description }) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  const trash = document.createElement("span");
  const desc = document.createElement("div");
  const text = document.createElement("h5");

  text.innerHTML = description === undefined ? "" : description;
  a.href = url;
  a.innerHTML = name;
  a.target = "_blank";

  trash.innerHTML = "x";
  trash.onclick = () => removeElement(name, url, trash);

  li.append(a);
  ul.append(li);
  li.append(trash);
  li.append(desc);
  desc.append(text);
}

async function removeElement(name, url, el) {
  if (confirm("Tem certeza que deseja deletar?")) {
    const response = await fetch(
      `http://localhost:3000?name=${name}&url=${url}&del=${1}`
    );

    return el.parentNode.remove();
  }
}
