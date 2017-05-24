// TODO: Add puffs animations.

const hold = document.querySelector('.arwes__intern');

function create () {
  const el = document.createElement('div');
  el.classList.add('arwes__puff');
  return el;
}

function add (puff) {
  hold.appendChild(puff);
}

window.addEventListener('load', function () {
  const puff1 = create();
  puff1.style.left = '50px';
  puff1.style.top = '300px';
  add(puff1);
});
