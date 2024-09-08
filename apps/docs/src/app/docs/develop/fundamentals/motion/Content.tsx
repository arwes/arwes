'use client'

import { Animated, Animator } from '@arwes/react'

import { AR } from '@/ui'
import { ExampleAnimatorNodeState } from './ExampleAnimatorNodeState'
import { ExampleAnimatorTree } from './ExampleAnimatorTree'
import { ExampleAnimated } from './ExampleAnimated'
import { ExampleText } from './ExampleText'

export default (): JSX.Element => (
  <>
    <AR.Header>Motion Fundamentals</AR.Header>

    <AR.P>
      To create special motion effects, ARWES provides an animator system to{' '}
      <b>orchestrate UI elements transitions</b> and functionalities to facilitate the execution of
      animations on those transitions, along with some utilities to create certain common sci-fi
      animation effects.
    </AR.P>

    <AR.P>
      ARWES motion tools are mostly to orchestrate animations rather than running them. There are
      many great options already available such as{' '}
      <a href="https://gsap.com" target="_blank">
        GSAP
      </a>
      ,{' '}
      <a href="https://www.framer.com/motion" target="_blank">
        Framer Motion
      </a>
      , and{' '}
      <a href="https://animejs.com" target="_blank">
        Anime.js
      </a>{' '}
      to run animations and special effects, ARWES is intended to be used along with them.
    </AR.P>

    <AR.P>
      ARWES uses{' '}
      <a href="https://motion.dev" target="_blank">
        Motion One
      </a>{' '}
      behind the scenes to run animations for its performance both at{' '}
      <a href="https://motion.dev/docs/performance" target="_blank">
        run time
      </a>{' '}
      and{' '}
      <a href="https://bundlephobia.com/package/motion" target="_blank">
        file size
      </a>
      . But it is limited due to its simplicity. So using ARWES along with other tools is
      encouraged.
    </AR.P>

    <AR.H2>Animator System</AR.H2>

    <AR.P>
      An animator system is a tree of animator nodes, similar to the{' '}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model"
        target="_blank"
      >
        DOM
      </a>
      , a{' '}
      <a href="https://en.wikipedia.org/wiki/Directed_acyclic_graph" target="_blank">
        directed acyclic graph (DAG)
      </a>
      , with a root node to control the animation flow and children nodes which transition based on
      a set of rules. An animator node is supposed to manage a group of UI elements to transition
      according to its configuration.
    </AR.P>

    <AR.P>
      An animator node is a{' '}
      <a href="https://en.wikipedia.org/wiki/Finite-state_machine" target="_blank">
        finite state machine (FSM)
      </a>{' '}
      which can be in one of the following states:
    </AR.P>

    <AR.UL>
      <li>
        <b>Exited</b>: Denotes elements which are invisible/unavailable to the user. The default
        state.
      </li>
      <li>
        <b>Entering</b>: Denotes elements which are transitioning into the app.
      </li>
      <li>
        <b>Entered</b>: Denotes elements which are visible/available to the user.
      </li>
      <li>
        <b>Exiting</b>: Denotes elements which are transitioning out of the app.
      </li>
    </AR.UL>

    <ExampleAnimatorNodeState />

    <AR.P>An animator node has the following transitions:</AR.P>

    <AR.UL>
      <li>
        <b>Enter</b>: From exited/exiting to entering to entered. To show/enable elements.
      </li>
      <li>
        <b>Exit</b>: From entered/entering to exiting to exited. To hide/disable elements.
      </li>
    </AR.UL>

    <Animator>
      <Animated<SVGSVGElement>
        as="svg"
        data-name="example"
        className="block w-full max-w-[350px]"
        viewBox="0 0 452 251"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="fill-neutral-3"
          d="M62 51.5L61.2929 50.7929L61 51.0858V51.5H62ZM85 28.5V27.5H84.5858L84.2929 27.7929L85 28.5ZM165.207 29.2071C165.598 28.8166 165.598 28.1834 165.207 27.7929L158.843 21.4289C158.453 21.0384 157.819 21.0384 157.429 21.4289C157.038 21.8195 157.038 22.4526 157.429 22.8431L163.086 28.5L157.429 34.1569C157.038 34.5474 157.038 35.1805 157.429 35.5711C157.819 35.9616 158.453 35.9616 158.843 35.5711L165.207 29.2071ZM63 96.5V51.5H61V96.5H63ZM62.7071 52.2071L85.7071 29.2071L84.2929 27.7929L61.2929 50.7929L62.7071 52.2071ZM85 29.5H164.5V27.5H85V29.5Z"
        />
        <path
          className="fill-neutral-3"
          d="M391.207 97.2071C390.817 97.5976 390.183 97.5976 389.793 97.2071L383.429 90.8431C383.038 90.4526 383.038 89.8195 383.429 89.4289C383.819 89.0384 384.453 89.0384 384.843 89.4289L390.5 95.0858L396.157 89.4289C396.547 89.0384 397.181 89.0384 397.571 89.4289C397.962 89.8195 397.962 90.4526 397.571 90.8431L391.207 97.2071ZM390.5 51.5L391.207 50.7929L391.5 51.0858V51.5H390.5ZM367.5 28.5V27.5H367.914L368.207 27.7929L367.5 28.5ZM389.5 96.5V51.5H391.5V96.5H389.5ZM389.793 52.2071L366.793 29.2071L368.207 27.7929L391.207 50.7929L389.793 52.2071ZM367.5 29.5H288V27.5H367.5V29.5Z"
        />
        <path
          className="fill-neutral-3"
          d="M61.2929 154.793C61.6834 154.402 62.3166 154.402 62.7071 154.793L69.0711 161.157C69.4616 161.547 69.4616 162.181 69.0711 162.571C68.6805 162.962 68.0474 162.962 67.6569 162.571L62 156.914L56.3431 162.571C55.9526 162.962 55.3195 162.962 54.9289 162.571C54.5384 162.181 54.5384 161.547 54.9289 161.157L61.2929 154.793ZM62 200.5L61.2929 201.207L61 200.914V200.5H62ZM85 223.5V224.5H84.5858L84.2929 224.207L85 223.5ZM63 155.5V200.5H61V155.5H63ZM62.7071 199.793L85.7071 222.793L84.2929 224.207L61.2929 201.207L62.7071 199.793ZM85 222.5H164.5V224.5H85V222.5Z"
        />
        <path
          className="fill-neutral-3"
          d="M224.793 195.207C225.183 195.598 225.817 195.598 226.207 195.207L232.571 188.843C232.962 188.453 232.962 187.819 232.571 187.429C232.181 187.038 231.547 187.038 231.157 187.429L225.5 193.086L219.843 187.429C219.453 187.038 218.819 187.038 218.429 187.429C218.038 187.819 218.038 188.453 218.429 188.843L224.793 195.207ZM226.207 56.2929C225.817 55.9024 225.183 55.9024 224.793 56.2929L218.429 62.6569C218.038 63.0474 218.038 63.6805 218.429 64.0711C218.819 64.4616 219.453 64.4616 219.843 64.0711L225.5 58.4142L231.157 64.0711C231.547 64.4616 232.181 64.4616 232.571 64.0711C232.962 63.6805 232.962 63.0474 232.571 62.6569L226.207 56.2929ZM226.5 194.5V57H224.5V194.5H226.5Z"
        />
        <path
          className="fill-neutral-3"
          d="M390.5 200.5L391.207 201.207L391.5 200.914V200.5H390.5ZM367.5 223.5V224.5H367.914L368.207 224.207L367.5 223.5ZM287.293 222.793C286.902 223.183 286.902 223.817 287.293 224.207L293.657 230.571C294.047 230.962 294.681 230.962 295.071 230.571C295.462 230.181 295.462 229.547 295.071 229.157L289.414 223.5L295.071 217.843C295.462 217.453 295.462 216.819 295.071 216.429C294.681 216.038 294.047 216.038 293.657 216.429L287.293 222.793ZM389.5 155.5V200.5H391.5V155.5H389.5ZM389.793 199.793L366.793 222.793L368.207 224.207L391.207 201.207L389.793 199.793ZM367.5 222.5H288V224.5H367.5V222.5Z"
        />
        <rect className="fill-primary-main-10" x="0.5" y="97.5" width="123" height="56" />
        <rect className="stroke-primary-main-8" x="0.5" y="97.5" width="123" height="56" />
        <path
          className="fill-neutral-1"
          d="M41.244 132.8L41.964 132.728L42.012 133.904C40.204 134.128 38.676 134.24 37.428 134.24C35.7 134.224 34.492 133.712 33.804 132.704C33.116 131.696 32.772 130.144 32.772 128.048C32.772 123.856 34.42 121.76 37.716 121.76C39.3 121.76 40.484 122.216 41.268 123.128C42.052 124.024 42.444 125.464 42.444 127.448L42.396 128.6H34.236C34.236 130.072 34.484 131.168 34.98 131.888C35.492 132.592 36.356 132.944 37.572 132.944C38.804 132.944 40.028 132.896 41.244 132.8ZM34.236 127.4H41.004C41.004 125.816 40.74 124.688 40.212 124.016C39.7 123.344 38.868 123.008 37.716 123.008C36.58 123.008 35.716 123.36 35.124 124.064C34.532 124.752 34.236 125.864 34.236 127.4ZM44.0526 122H45.6606L48.8286 126.944L51.9966 122H53.6046L49.6926 127.976L53.5806 134H51.9966L48.8286 129.08L45.6606 134H44.0526L47.9166 128L44.0526 122ZM55.9875 134V122H57.4035V134H55.9875ZM55.9875 119V117.2H57.4035V119H55.9875ZM67.0751 123.272H63.0671V129.2C63.0671 130.752 63.1791 131.768 63.4031 132.248C63.6271 132.728 64.1551 132.968 64.9871 132.968L67.1951 132.8L67.2911 134.024C66.2351 134.184 65.4271 134.264 64.8671 134.264C63.6511 134.264 62.8031 133.968 62.3231 133.376C61.8591 132.768 61.6271 131.616 61.6271 129.92V123.272H59.8511V122H61.6271V118.232H63.0671V122H67.0751V123.272ZM77.2674 132.8L77.9874 132.728L78.0354 133.904C76.2274 134.128 74.6994 134.24 73.4514 134.24C71.7234 134.224 70.5154 133.712 69.8274 132.704C69.1394 131.696 68.7954 130.144 68.7954 128.048C68.7954 123.856 70.4434 121.76 73.7394 121.76C75.3234 121.76 76.5074 122.216 77.2914 123.128C78.0754 124.024 78.4674 125.464 78.4674 127.448L78.4194 128.6H70.2594C70.2594 130.072 70.5074 131.168 71.0034 131.888C71.5154 132.592 72.3794 132.944 73.5954 132.944C74.8274 132.944 76.0514 132.896 77.2674 132.8ZM70.2594 127.4H77.0274C77.0274 125.816 76.7634 124.688 76.2354 124.016C75.7234 123.344 74.8914 123.008 73.7394 123.008C72.6034 123.008 71.7394 123.36 71.1474 124.064C70.5554 124.752 70.2594 125.864 70.2594 127.4ZM90.3932 116.672V134H88.9532V133.112C87.6892 133.864 86.4092 134.24 85.1132 134.24C84.5212 134.24 84.0092 134.168 83.5772 134.024C83.1452 133.896 82.7052 133.632 82.2572 133.232C81.3452 132.416 80.8892 130.824 80.8892 128.456C80.8892 126.072 81.2732 124.36 82.0412 123.32C82.8092 122.28 84.1052 121.76 85.9292 121.76C86.6332 121.76 87.6412 121.864 88.9532 122.072V116.672H90.3932ZM83.3132 132.152C83.6172 132.456 83.9132 132.664 84.2012 132.776C84.5052 132.888 84.8892 132.944 85.3532 132.944C85.8332 132.944 86.3772 132.856 86.9852 132.68C87.6092 132.504 88.0972 132.336 88.4492 132.176L88.9532 131.912V123.32C87.6732 123.128 86.6812 123.032 85.9772 123.032C84.6172 123.032 83.6732 123.448 83.1452 124.28C82.6332 125.112 82.3772 126.4 82.3772 128.144C82.3772 130.192 82.6892 131.528 83.3132 132.152Z"
        />
        <rect className="fill-primary-main-10" x="328.5" y="97.5" width="123" height="56" />
        <rect className="stroke-primary-main-8" x="328.5" y="97.5" width="123" height="56" />
        <path
          className="fill-neutral-1"
          d="M360.744 132.8L361.464 132.728L361.512 133.904C359.704 134.128 358.176 134.24 356.928 134.24C355.2 134.224 353.992 133.712 353.304 132.704C352.616 131.696 352.272 130.144 352.272 128.048C352.272 123.856 353.92 121.76 357.216 121.76C358.8 121.76 359.984 122.216 360.768 123.128C361.552 124.024 361.944 125.464 361.944 127.448L361.896 128.6H353.736C353.736 130.072 353.984 131.168 354.48 131.888C354.992 132.592 355.856 132.944 357.072 132.944C358.304 132.944 359.528 132.896 360.744 132.8ZM353.736 127.4H360.504C360.504 125.816 360.24 124.688 359.712 124.016C359.2 123.344 358.368 123.008 357.216 123.008C356.08 123.008 355.216 123.36 354.624 124.064C354.032 124.752 353.736 125.864 353.736 127.4ZM366.31 134H364.894V122H366.31V122.888C367.654 122.136 368.958 121.76 370.222 121.76C371.822 121.76 372.886 122.184 373.414 123.032C373.958 123.88 374.23 125.432 374.23 127.688V134H372.79V127.76C372.79 125.92 372.614 124.68 372.262 124.04C371.91 123.384 371.158 123.056 370.006 123.056C369.446 123.056 368.854 123.144 368.23 123.32C367.622 123.48 367.15 123.648 366.814 123.824L366.31 124.064V134ZM383.669 123.272H379.661V129.2C379.661 130.752 379.773 131.768 379.997 132.248C380.221 132.728 380.749 132.968 381.581 132.968L383.789 132.8L383.885 134.024C382.829 134.184 382.021 134.264 381.461 134.264C380.245 134.264 379.397 133.968 378.917 133.376C378.453 132.768 378.221 131.616 378.221 129.92V123.272H376.445V122H378.221V118.232H379.661V122H383.669V123.272ZM393.861 132.8L394.581 132.728L394.629 133.904C392.821 134.128 391.293 134.24 390.045 134.24C388.317 134.224 387.109 133.712 386.421 132.704C385.733 131.696 385.389 130.144 385.389 128.048C385.389 123.856 387.037 121.76 390.333 121.76C391.917 121.76 393.101 122.216 393.885 123.128C394.669 124.024 395.061 125.464 395.061 127.448L395.013 128.6H386.853C386.853 130.072 387.101 131.168 387.597 131.888C388.109 132.592 388.973 132.944 390.189 132.944C391.421 132.944 392.645 132.896 393.861 132.8ZM386.853 127.4H393.621C393.621 125.816 393.357 124.688 392.829 124.016C392.317 123.344 391.485 123.008 390.333 123.008C389.197 123.008 388.333 123.36 387.741 124.064C387.149 124.752 386.853 125.864 386.853 127.4ZM398.011 134V122H399.427V123.728C400.019 123.312 400.739 122.912 401.587 122.528C402.451 122.144 403.243 121.888 403.963 121.76V123.2C403.275 123.344 402.555 123.568 401.803 123.872C401.051 124.16 400.467 124.416 400.051 124.64L399.427 125V134H398.011ZM413.783 132.8L414.503 132.728L414.551 133.904C412.743 134.128 411.215 134.24 409.967 134.24C408.239 134.224 407.031 133.712 406.343 132.704C405.655 131.696 405.311 130.144 405.311 128.048C405.311 123.856 406.959 121.76 410.255 121.76C411.839 121.76 413.023 122.216 413.807 123.128C414.591 124.024 414.983 125.464 414.983 127.448L414.935 128.6H406.775C406.775 130.072 407.023 131.168 407.519 131.888C408.031 132.592 408.895 132.944 410.111 132.944C411.343 132.944 412.567 132.896 413.783 132.8ZM406.775 127.4H413.543C413.543 125.816 413.279 124.688 412.751 124.016C412.239 123.344 411.407 123.008 410.255 123.008C409.119 123.008 408.255 123.36 407.663 124.064C407.071 124.752 406.775 125.864 406.775 127.4ZM426.909 116.672V134H425.469V133.112C424.205 133.864 422.925 134.24 421.629 134.24C421.037 134.24 420.525 134.168 420.093 134.024C419.661 133.896 419.221 133.632 418.773 133.232C417.861 132.416 417.405 130.824 417.405 128.456C417.405 126.072 417.789 124.36 418.557 123.32C419.325 122.28 420.621 121.76 422.445 121.76C423.149 121.76 424.157 121.864 425.469 122.072V116.672H426.909ZM419.829 132.152C420.133 132.456 420.429 132.664 420.717 132.776C421.021 132.888 421.405 132.944 421.869 132.944C422.349 132.944 422.893 132.856 423.501 132.68C424.125 132.504 424.613 132.336 424.965 132.176L425.469 131.912V123.32C424.189 123.128 423.197 123.032 422.493 123.032C421.133 123.032 420.189 123.448 419.661 124.28C419.149 125.112 418.893 126.4 418.893 128.144C418.893 130.192 419.205 131.528 419.829 132.152Z"
        />
        <rect className="fill-primary-main-10" x="164.5" y="0.5" width="123" height="56" />
        <rect className="stroke-primary-main-8" x="164.5" y="0.5" width="123" height="56" />
        <path
          className="fill-neutral-1"
          d="M193.744 35.8L194.464 35.728L194.512 36.904C192.704 37.128 191.176 37.24 189.928 37.24C188.2 37.224 186.992 36.712 186.304 35.704C185.616 34.696 185.272 33.144 185.272 31.048C185.272 26.856 186.92 24.76 190.216 24.76C191.8 24.76 192.984 25.216 193.768 26.128C194.552 27.024 194.944 28.464 194.944 30.448L194.896 31.6H186.736C186.736 33.072 186.984 34.168 187.48 34.888C187.992 35.592 188.856 35.944 190.072 35.944C191.304 35.944 192.528 35.896 193.744 35.8ZM186.736 30.4H193.504C193.504 28.816 193.24 27.688 192.712 27.016C192.2 26.344 191.368 26.008 190.216 26.008C189.08 26.008 188.216 26.36 187.624 27.064C187.032 27.752 186.736 28.864 186.736 30.4ZM199.31 37H197.894V25H199.31V25.888C200.654 25.136 201.958 24.76 203.222 24.76C204.822 24.76 205.886 25.184 206.414 26.032C206.958 26.88 207.23 28.432 207.23 30.688V37H205.79V30.76C205.79 28.92 205.614 27.68 205.262 27.04C204.91 26.384 204.158 26.056 203.006 26.056C202.446 26.056 201.854 26.144 201.23 26.32C200.622 26.48 200.15 26.648 199.814 26.824L199.31 27.064V37ZM216.669 26.272H212.661V32.2C212.661 33.752 212.773 34.768 212.997 35.248C213.221 35.728 213.749 35.968 214.581 35.968L216.789 35.8L216.885 37.024C215.829 37.184 215.021 37.264 214.461 37.264C213.245 37.264 212.397 36.968 211.917 36.376C211.453 35.768 211.221 34.616 211.221 32.92V26.272H209.445V25H211.221V21.232H212.661V25H216.669V26.272ZM226.861 35.8L227.581 35.728L227.629 36.904C225.821 37.128 224.293 37.24 223.045 37.24C221.317 37.224 220.109 36.712 219.421 35.704C218.733 34.696 218.389 33.144 218.389 31.048C218.389 26.856 220.037 24.76 223.333 24.76C224.917 24.76 226.101 25.216 226.885 26.128C227.669 27.024 228.061 28.464 228.061 30.448L228.013 31.6H219.853C219.853 33.072 220.101 34.168 220.597 34.888C221.109 35.592 221.973 35.944 223.189 35.944C224.421 35.944 225.645 35.896 226.861 35.8ZM219.853 30.4H226.621C226.621 28.816 226.357 27.688 225.829 27.016C225.317 26.344 224.485 26.008 223.333 26.008C222.197 26.008 221.333 26.36 220.741 27.064C220.149 27.752 219.853 28.864 219.853 30.4ZM231.011 37V25H232.427V26.728C233.019 26.312 233.739 25.912 234.587 25.528C235.451 25.144 236.243 24.888 236.963 24.76V26.2C236.275 26.344 235.555 26.568 234.803 26.872C234.051 27.16 233.467 27.416 233.051 27.64L232.427 28V37H231.011ZM239.144 37V25H240.56V37H239.144ZM239.144 22V20.2H240.56V22H239.144ZM245.575 37H244.159V25H245.575V25.888C246.919 25.136 248.223 24.76 249.487 24.76C251.087 24.76 252.151 25.184 252.679 26.032C253.223 26.88 253.495 28.432 253.495 30.688V37H252.055V30.76C252.055 28.92 251.879 27.68 251.527 27.04C251.175 26.384 250.423 26.056 249.271 26.056C248.711 26.056 248.119 26.144 247.495 26.32C246.887 26.48 246.415 26.648 246.079 26.824L245.575 27.064V37ZM266.676 38.824C266.676 40.184 266.236 41.168 265.356 41.776C264.492 42.384 263.14 42.688 261.3 42.688C259.46 42.688 258.188 42.424 257.484 41.896C256.78 41.368 256.428 40.4 256.428 38.992C256.428 38.32 256.572 37.776 256.86 37.36C257.148 36.96 257.652 36.496 258.372 35.968C257.972 35.712 257.772 35.168 257.772 34.336C257.772 34.08 257.964 33.576 258.348 32.824L258.54 32.464C257.228 31.92 256.572 30.712 256.572 28.84C256.572 26.12 258.02 24.76 260.916 24.76C261.732 24.76 262.452 24.84 263.076 25L263.436 25.072L266.916 25V26.272L264.516 26.224C265.092 26.8 265.38 27.752 265.38 29.08C265.38 30.392 265.012 31.352 264.276 31.96C263.556 32.552 262.412 32.848 260.844 32.848C260.38 32.848 259.972 32.816 259.62 32.752C259.3 33.536 259.14 34.032 259.14 34.24C259.14 34.768 259.292 35.096 259.596 35.224C259.916 35.336 260.852 35.4 262.404 35.416C263.956 35.416 265.052 35.648 265.692 36.112C266.348 36.56 266.676 37.464 266.676 38.824ZM257.868 38.896C257.868 39.856 258.108 40.52 258.588 40.888C259.068 41.256 259.996 41.44 261.372 41.44C262.748 41.44 263.732 41.24 264.324 40.84C264.916 40.456 265.212 39.8 265.212 38.872C265.212 37.96 264.996 37.368 264.564 37.096C264.132 36.824 263.308 36.688 262.092 36.688L259.38 36.592C258.788 37.008 258.388 37.368 258.18 37.672C257.972 37.992 257.868 38.4 257.868 38.896ZM258.036 28.84C258.036 29.864 258.26 30.592 258.708 31.024C259.156 31.44 259.908 31.648 260.964 31.648C262.036 31.648 262.796 31.44 263.244 31.024C263.692 30.608 263.916 29.88 263.916 28.84C263.916 27.784 263.692 27.04 263.244 26.608C262.796 26.176 262.036 25.96 260.964 25.96C259.908 25.96 259.156 26.184 258.708 26.632C258.26 27.064 258.036 27.8 258.036 28.84Z"
        />
        <rect className="fill-primary-main-10" x="164.5" y="194.5" width="123" height="56" />
        <rect className="stroke-primary-main-8" x="164.5" y="194.5" width="123" height="56" />
        <path
          className="fill-neutral-1"
          d="M202.244 229.8L202.964 229.728L203.012 230.904C201.204 231.128 199.676 231.24 198.428 231.24C196.7 231.224 195.492 230.712 194.804 229.704C194.116 228.696 193.772 227.144 193.772 225.048C193.772 220.856 195.42 218.76 198.716 218.76C200.3 218.76 201.484 219.216 202.268 220.128C203.052 221.024 203.444 222.464 203.444 224.448L203.396 225.6H195.236C195.236 227.072 195.484 228.168 195.98 228.888C196.492 229.592 197.356 229.944 198.572 229.944C199.804 229.944 201.028 229.896 202.244 229.8ZM195.236 224.4H202.004C202.004 222.816 201.74 221.688 201.212 221.016C200.7 220.344 199.868 220.008 198.716 220.008C197.58 220.008 196.716 220.36 196.124 221.064C195.532 221.752 195.236 222.864 195.236 224.4ZM205.053 219H206.661L209.829 223.944L212.997 219H214.605L210.693 224.976L214.581 231H212.997L209.829 226.08L206.661 231H205.053L208.917 225L205.053 219ZM216.988 231V219H218.404V231H216.988ZM216.988 216V214.2H218.404V216H216.988ZM228.075 220.272H224.067V226.2C224.067 227.752 224.179 228.768 224.403 229.248C224.627 229.728 225.155 229.968 225.987 229.968L228.195 229.8L228.291 231.024C227.235 231.184 226.427 231.264 225.867 231.264C224.651 231.264 223.803 230.968 223.323 230.376C222.859 229.768 222.627 228.616 222.627 226.92V220.272H220.851V219H222.627V215.232H224.067V219H228.075V220.272ZM230.323 231V219H231.739V231H230.323ZM230.323 216V214.2H231.739V216H230.323ZM236.755 231H235.339V219H236.755V219.888C238.099 219.136 239.403 218.76 240.667 218.76C242.267 218.76 243.331 219.184 243.859 220.032C244.403 220.88 244.675 222.432 244.675 224.688V231H243.235V224.76C243.235 222.92 243.059 221.68 242.707 221.04C242.355 220.384 241.603 220.056 240.451 220.056C239.891 220.056 239.299 220.144 238.675 220.32C238.067 220.48 237.595 220.648 237.259 220.824L236.755 221.064V231ZM257.856 232.824C257.856 234.184 257.416 235.168 256.536 235.776C255.672 236.384 254.32 236.688 252.48 236.688C250.64 236.688 249.368 236.424 248.664 235.896C247.96 235.368 247.608 234.4 247.608 232.992C247.608 232.32 247.752 231.776 248.04 231.36C248.328 230.96 248.832 230.496 249.552 229.968C249.152 229.712 248.952 229.168 248.952 228.336C248.952 228.08 249.144 227.576 249.528 226.824L249.72 226.464C248.408 225.92 247.752 224.712 247.752 222.84C247.752 220.12 249.2 218.76 252.096 218.76C252.912 218.76 253.632 218.84 254.256 219L254.616 219.072L258.096 219V220.272L255.696 220.224C256.272 220.8 256.56 221.752 256.56 223.08C256.56 224.392 256.192 225.352 255.456 225.96C254.736 226.552 253.592 226.848 252.024 226.848C251.56 226.848 251.152 226.816 250.8 226.752C250.48 227.536 250.32 228.032 250.32 228.24C250.32 228.768 250.472 229.096 250.776 229.224C251.096 229.336 252.032 229.4 253.584 229.416C255.136 229.416 256.232 229.648 256.872 230.112C257.528 230.56 257.856 231.464 257.856 232.824ZM249.048 232.896C249.048 233.856 249.288 234.52 249.768 234.888C250.248 235.256 251.176 235.44 252.552 235.44C253.928 235.44 254.912 235.24 255.504 234.84C256.096 234.456 256.392 233.8 256.392 232.872C256.392 231.96 256.176 231.368 255.744 231.096C255.312 230.824 254.488 230.688 253.272 230.688L250.56 230.592C249.968 231.008 249.568 231.368 249.36 231.672C249.152 231.992 249.048 232.4 249.048 232.896ZM249.216 222.84C249.216 223.864 249.44 224.592 249.888 225.024C250.336 225.44 251.088 225.648 252.144 225.648C253.216 225.648 253.976 225.44 254.424 225.024C254.872 224.608 255.096 223.88 255.096 222.84C255.096 221.784 254.872 221.04 254.424 220.608C253.976 220.176 253.216 219.96 252.144 219.96C251.088 219.96 250.336 220.184 249.888 220.632C249.44 221.064 249.216 221.8 249.216 222.84Z"
        />
      </Animated>
    </Animator>

    <AR.P>
      By default, a parent animator node which is in exited state will have all its children in
      exited state too. When it enters and transitions to entered state, then it enters its children
      nodes. Similar like a cascade. And then the children nodes continue the same process unless
      configured otherwise.
    </AR.P>

    <AR.P>
      Normally, there is one root node which receives orders to activate or not. If it is activated,
      then it enters the cascade of nodes in their predefined order. Otherwise, it exits them all at
      the same time.
    </AR.P>

    <ExampleAnimatorTree />

    <AR.P>
      An animator node uses a "manager" to transition its children nodes. By default it is done in
      parallel but this can be configured, for example, to transition children nodes in sequence.
    </AR.P>

    <ExampleAnimatorTree inSequence />

    <AR.P>
      Some animators can "combine" all their children into one to allow more complex cascade effects
      and properly calculate the entire duration of animations.
    </AR.P>

    <ExampleAnimatorTree hasCombinations />

    <AR.P>
      These patterns simplify the creation of complex transition animations using serial, parallel,
      sequence, staggering, and other strategies in trees of nodes. There are also a few other
      settings an animator node can have to configure how and when it should transition itself and
      its children, allowing the creation of very rich motion effects.
    </AR.P>

    <AR.H2>Animated Elements</AR.H2>

    <AR.P>
      An animator node can be linked to zero, one, or multiple UI elements such as HTML, SVG, 2D
      Canvas, or 3D WebGL elements. These UI elements basically listen to their animator node state
      changes and execute animations on specific states.
    </AR.P>

    <ExampleAnimated />

    <AR.P>
      In the example above, there is one animator node, but the two border lines, the background
      shape, and the text element, have different transition animations in different times with
      different durations.
    </AR.P>

    <AR.H2>Dynamic Transitions</AR.H2>

    <AR.P>
      Some effects should be calculated dynamically such as text transitions which should have a
      different duration based on the length of the content. ARWES provides a few text transition
      animations which resemble many famous special effects. They can dynamically calculate how long
      should a duration last and modify their linked animator nodes transition durations.
    </AR.P>

    <ExampleText />

    <AR.P>
      In the example above, each paragraph has its own animator node, and each one with its own
      calculated transition durations.
    </AR.P>

    <AR.H2>Subsystems</AR.H2>

    <AR.P>
      Normally, an app will have a main animator system with multiple nested subsystems, which can
      operate based on specific nodes conditions or independently as the user needs.
    </AR.P>

    <AR.P>
      The common example is a app system composed of header, sidebars, content, and footer, where
      the header and footer remain the same but the sidebars and content are subsystems which change
      based on the URL. These subsystems still listen to the main system so they transition when it
      is their time.
    </AR.P>

    <AR.P>
      For some apps, they can make use of the exit transition for the subsystems when they change,
      for others, they can be inmediately removed from the user experience and transition in the new
      subsystems. It is up to the user to decide which workflows and transitions to use for an app.
    </AR.P>

    <AR.Playground
      className="h-[30rem] md:h-[35rem] lg:h-[40rem]"
      url="?code=&type=predefined&sandbox=React%7CExamples%7Csubsystems&explorer=false&editor=false&preview=true"
    />

    <AR.P>
      Some apps may not even need the exit transition for the most part but certain UI elements can
      still use it. Such as micro-interactions similar to the CSS hover effect, when the user enters
      the mouse in an UI element, it updates its style, and when it exits the mouse, it updates the
      styles back to the original styles, in this case, the exiting animations.
    </AR.P>

    <AR.H2>Accessibility</AR.H2>

    <AR.P>
      It mostly depends on the target audience to determine what kind and the intensity of
      animations to add to an app. For a gaming community it may be wonderful to have a game-like
      user experience by default, but for others, checking on user preferences before even rendering
      the interfaces may be a recommended option.{' '}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion"
        target="_blank"
      >
        prefers-reduced-motion
      </a>{' '}
      is a useful API to use.
    </AR.P>

    <AR.H2>Performance</AR.H2>

    <AR.P>
      In any app, regardless of ARWES, there might be performance implications if there are too many
      animations running at the same time, specially for mobile devices, so choosing carefully the
      most important UI elements to animate and the kind of animations is recommended.
    </AR.P>

    <AR.P>
      For HTML and SVG, make sure to prioritize CSS <code>opacity</code>, <code>transform</code>,
      and{' '}
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/filter" target="_blank">
        <code>filter</code>
      </a>{' '}
      properties for animations for performance and compatibility reasons. See more on{' '}
      <a href="https://web.dev/articles/animations-guide" target="_blank">
        How to create high-performance CSS animations
      </a>
      .
    </AR.P>

    <AR.H2>When to Use</AR.H2>

    <AR.P>
      The animator system is intended to be used for main structural UI elements but can be used
      anywhere for anything. For many use cases in HTML and SVG, simple CSS transitions are enough.
      But when the structure or interaction is more complex, an animator node can be the solution.
    </AR.P>

    <AR.Navigation
      prevHref="/docs/develop/fundamentals/visual"
      prev="Visual"
      nextHref="/docs/develop/fundamentals/audio"
      next="Audio"
    />
  </>
)
