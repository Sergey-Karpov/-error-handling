import { createSpinner, createproductList, createErrorMessage, removeErrorMesage, encreaseTryCount, refreshTryCount } from './help.js';

(async () => {
  const container = document.getElementById('app');
  container.classList.add('container');
  container.style.cssText = `
    padding: 30px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;`;

  const spinner = createSpinner();
  container.append(spinner);

  window.addEventListener('offline', (e) => {
    errorMessage = createErrorMessage('Your connection has status OFLINE, please check your network connection', container);
    setTimeout(removeErrorMesage, 5000, errorMessage);
  })

  async function getData() {
    let errorMessage;
    if(sessionStorage.getItem('tryCount') === 3) {
      errorMessage = createErrorMessage('An error has occurred, try refreshing the page later', container);
      setTimeout(removeErrorMesage, 5000, errorMessage);
    }
    try {
      const response = await fetch('http://localhost:3000/api/products');
      switch (response.status) {
        case 200:
        case 201:
          refreshTryCount('tryCount')
          const data = await response.json();
          return data;
        case 404:
          refreshTryCount('tryCount')
          errorMessage = createErrorMessage('The product list is empty', container);
          setTimeout(removeErrorMesage, 5000, errorMessage);
        case 500:
          errorMessage = createErrorMessage('An error has occurred, check your connecting', container);
          setTimeout(removeErrorMesage, 5000, errorMessage);
          encreaseTryCount('tryCount');
      }
    } catch (error) {
      refreshTryCount('tryCount')
      errorMessage = createErrorMessage('An data from server is invalid, try refreshing the page later', container);
      setTimeout(removeErrorMesage, 5000, errorMessage);
      throw new TypeError('returned JSON is invalid')
    }
  }
  getData().then((data) => createproductList(data.products, container));

})();


