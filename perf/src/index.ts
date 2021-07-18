import perfTestsList from '../perfTestsList.json';

const listElement = document.querySelector('#perf-tests-list') as HTMLUListElement;

listElement.innerHTML = perfTestsList
  .map(name => `<li><a href="./tests/${name}">${name}</a></li>`)
  .join('');
