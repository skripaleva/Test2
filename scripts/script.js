const table = document.querySelector('.content__table');
const seasons = document.querySelector('.table__season');
const tableQuantity  = document.querySelector('.table__quantity');
const goal  = document.querySelector('.table__goal');
const pass  = document.querySelector('.table__pass');
const goalsAndPass  = document.querySelector('.table__goal-pass');
const rating  = document.querySelector('.table__rating');


const getData = async (url) => {
  let links = document.querySelectorAll('.table__line')
  if(links.length) {
    links.forEach(link => link.remove());
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, 
          статус ошибки ${response.status}!`);
  }

  return await response.json();
};

const createTable = ({season, quantity, goals, pass, goalsAndPass, rating}) => {
    const tableLink = document.createElement('div');
    tableLink.classList.add('table__line');
    table.append(tableLink);
    // console.log(tableLink);
    const tableLinkInner = `
      <div class="table__season">${season}</div>   
      <div class="table__col">${quantity}</div>
      <div class="table__col">${goals}</div>
      <div class="table__col">${pass}</div>
      <div class="table__col">${goalsAndPass}</div>
      <div class="table__col">${rating}</div>
    `;
    tableLink.innerHTML = tableLinkInner;

};

getData('./db/data.json').then(data => {
  data.forEach(createTable)
});

function byField(field) {
  return (a, b) => a[field] > b[field] ? -1 : 1;
}

seasons.addEventListener('click', () => {
  getData('./db/data.json').then(data => data.sort(byField('seasons')).forEach(createTable));
});

tableQuantity.addEventListener('click', () => {
  getData('./db/data.json').then(data => data.sort(byField('quantity')).forEach(createTable));
});

goal.addEventListener('click', () => {
  getData('./db/data.json').then(data => data.sort(byField('goals')).forEach(createTable))
});
pass.addEventListener('click', () => {
  getData('./db/data.json').then(data => data.sort(byField('pass')).forEach(createTable))
});
goalsAndPass.addEventListener('click', () => {
  getData('./db/data.json').then(data => data.sort(byField('goalsAndPass')).forEach(createTable))
});
rating.addEventListener('click', () => {
  getData('./db/data.json').then(data => data.sort(byField('rating')).forEach(createTable))
});