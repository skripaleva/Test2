const table = document.querySelector('.content__table');
const seasons = document.querySelector('.table__season');
const tableQuantity  = document.querySelector('.table__quantity');
const goal  = document.querySelector('.table__goal');
const pass  = document.querySelector('.table__pass');
const goalsAndPass  = document.querySelector('.table__goal-pass');
const rating  = document.querySelector('.table__rating');
switcher = 0;


const getData = async (url) => {
  let links = document.querySelectorAll('.table__line');
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
    tableLink.innerHTML = `
      <div class="table__season">${season}</div>   
      <div class="table__col">${quantity}</div>
      <div class="table__col">${goals}</div>
      <div class="table__col">${pass}</div>
      <div class="table__col">${goalsAndPass}</div>
      <div class="table__col table__col_blue">${rating}</div>
    `;

};

getData('./db/data.json').then(data => {
  data.forEach(createTable)
});

function fromMore (field) {
  return (a, b) => a[field] > b[field] ? -1 : 1;
}

function fromLess (field) {
  return (a, b) => a[field] > b[field] ? 1 : -1;
}

[seasons, tableQuantity, goal, pass, goalsAndPass, rating].forEach((value) => {
  value.addEventListener('click', () => {
    switcher = !switcher;
    getData('./db/data.json').then(data => {
      if(switcher) {
        data.sort(fromMore(value.dataset.index)).forEach(createTable)
      } else {
        data.sort(fromLess(value.dataset.index)).forEach(createTable)
      }
    });
  });
});

//todo: ховер-эффекты, адаптив, псевдо-, доступность css, стрелка, сворачивание подменю, заголовки таблицы - адаптив