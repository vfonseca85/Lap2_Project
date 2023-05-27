const apiKey = '0dd05497-a74a-4ae1-a87e-b6651b97ce4e';
const url = `https://api.goperigon.com/v1/all?apiKey=0dd05497-a74a-4ae1-a87e-b6651b97ce4e&from=2023-05-10&country=gb&sourceGroup=top100&showNumResults=true&showReprints=false&excludeLabel=Non-news&excludeLabel=Opinion&excludeLabel=Paid News&excludeLabel=Roundup&excludeLabel=Press Release&sortBy=date&language=en&q=inflation AND prices`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const newsfeedContainer = document.getElementById('newsfeed');
    data.articles.forEach(article => {
      const articleTable = document.createElement('table');
      articleTable.classList.add('article-table');

      const titleRow = articleTable.insertRow();
      const titleCell = titleRow.insertCell();
      titleCell.colSpan = 2;
      const titleNode = document.createElement('h2');
      titleNode.innerText = article.title;
      titleCell.appendChild(titleNode);

      const descriptionRow = articleTable.insertRow();
      const descriptionCell = descriptionRow.insertCell();
      descriptionCell.colSpan = 2;
      const descriptionNode = document.createElement('p');
      descriptionNode.innerText = article.description;
      descriptionCell.appendChild(descriptionNode);

      const linkRow = articleTable.insertRow();
      const linkCell = linkRow.insertCell();
      linkCell.colSpan = 2;
      const linkNode = document.createElement('a');
      linkNode.href = article.url;
      linkNode.target = '_blank';
      linkNode.innerText = 'Read More';
      linkCell.appendChild(linkNode);

      newsfeedContainer.appendChild(articleTable);
    });
  })
  .catch(error => {
    console.error(error);
  });