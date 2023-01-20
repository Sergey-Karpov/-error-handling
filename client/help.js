// loader
export function createSpinner() {
  const spinnerWrapper = document.createElement('div')
  spinnerWrapper.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;`

  const spinner = document.createElement('div')
  const spinnerText = document.createElement('p')
  spinnerText.textContent = 'Please wait, we are loading data...'
  spinnerText.style.paddingTop='15px'
  spinner.classList.add('spinner-border')
  spinner.role = 'status'
  const spinnerInner = document.createElement('span')
  spinnerInner.classList.add('visually-hidden')
  spinnerInner.textContent = 'Loading...'
  spinner.append(spinnerInner)
  spinnerWrapper.append(spinner)
  spinnerWrapper.append(spinnerText)
  return spinnerWrapper
}

// function to create products list
export function createproductList(data, container) {
  container.textContent = ''
  for (const item of data) {
    const card = document.createElement('div')
    const img = document.createElement('img')
    const cardBody = document.createElement('div')
    const cardTitle = document.createElement('h5')
    const cardText = document.createElement('p')
    const cardBtn = document.createElement('a')
    card.classList.add('card')
    card.style.width='18rem'
    img.classList.add('card-img-top')
    img.src = item.image
    cardBody.classList.add('card-body')
    cardTitle.classList.add('card-title')
    cardTitle.textContent = item.price
    cardText.classList.add('card-text')
    cardText.textContent = item.name
    cardBtn.classList.add('btn', 'btn-primary')
    cardBtn.textContent = 'buy now'
    cardBody.append(cardTitle)
    cardBody.append(cardText)
    cardBody.append(cardBtn)
    card.append(img)
    card.append(cardBody)
    container.append(card)
  }
}

// function to create error message
export function createErrorMessage(text = 'test', container) {
  const toastContainer = document.createElement('div')
  const toast = document.createElement('div')
  const toastHeader = document.createElement('div')
  const toastBtn = document.createElement('button')
  const toastBody = document.createElement('div')
  const toastTitle = document.createElement('h6')
  const toastText = document.createElement('p')
  toastContainer.classList.add('toast-container', 'position-fixed', 'bottom-0', 'end-0', 'p-3')
  toast.classList.add('toast')
  toastHeader.classList.add('toast-header')
  toastBtn.classList.add('btn-close')
  toastBody.classList.add('toast-body')
  toast.setAttribute('id', 'liveToast')
  toast.role = 'alert'
  toast.ariaLive = 'assertive'
  toast.ariaAtomic = true
  toastBtn.setAttribute('data-bs-dismiss', 'toast')
  toastBtn.type = 'button'
  toastBtn.ariaLabel = 'закрыть'
  toastBtn.style.marginLeft = 'auto'
  toastTitle.style.color = 'red'
  toast.style.display = 'block'

  toastBtn.addEventListener('click', () => {
    toast.style.display = 'none'
  })

  toastTitle.textContent = 'Sorry, there are some errors'
  toastText.textContent = text

  toastHeader.append(toastTitle)
  toastHeader.append(toastBtn)
  toast.append(toastHeader)
  toastBody.append(toastText)
  toast.append(toastBody)
  toastContainer.append(toast)

  container.textContent = ''

  container.append(toastContainer)

  return toastContainer
}

export function removeErrorMesage(element) {
  element.remove();
}

export function encreaseTryCount(key) {
  let currentTryCount = sessionStorage.getItem(key)
  if(!currentTryCount) {
    sessionStorage.setItem('tryCount', 1)
  } else {
    currentTryCount = Number(currentTryCount) + 1
    sessionStorage.setItem(key, currentTryCount)
  }
}

export function refreshTryCount(key) {
  sessionStorage.setItem(key, 0)
}

