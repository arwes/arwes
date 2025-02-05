import { type EasingName, easing, createAnimation } from '@arwes/animated'

const rootElement = document.querySelector('#root')!

rootElement.innerHTML = `
  <style>
    .easings {
      display: grid;
      gap: 4px;
    }
    .item {
      padding: 2px;
      width: 80px;
      background: #077;
      color: #fff;
    }
  </style>

  <div class="easings"></div>
`

const easingsElement = rootElement.querySelector('.easings')!
const easingNames = Object.keys(easing) as EasingName[]

easingNames.forEach((easingName) => {
  const itemElement = document.createElement('div')
  itemElement.classList.add('item')
  itemElement.textContent = easingName
  easingsElement.appendChild(itemElement)

  createAnimation({
    duration: 1,
    easing: easingName,
    onUpdate(progress) {
      itemElement.style.transform = `translateX(${progress * 200}px)`
    }
  })
})
