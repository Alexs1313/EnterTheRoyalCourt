export const royalCourtLoaderHTML = `
<html>
  <head>
    <style>
      body {
        margin: 0;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        overflow: hidden;
      }
      .cubes {
        position: absolute;
        top: 50%;
        left: 50%;
        transform-style: preserve-3d;
      }
      .loop {
        transform: rotateX(-35deg) rotateY(-45deg) translateZ(1.5625em);
      }
      @keyframes s {
        to {
          transform: scale3d(0.2, 0.2, 0.2);
        }
      }
      .item {
        margin: -1.5625em;
        width: 3.125em;
        height: 3.125em;
        transform-origin: 50% 50% -1.5625em;
        box-shadow: 0 0 0.125em currentColor;
        background: currentColor;
        animation: s 0.6s cubic-bezier(0.45, 0.03, 0.51, 0.95) infinite alternate;
      }
      .item:before,
      .item:after {
        position: absolute;
        width: inherit;
        height: inherit;
        transform-origin: 0 100%;
        box-shadow: inherit;
        background: currentColor;
        content: "";
      }
      .item:before {
        bottom: 100%;
        transform: rotateX(90deg);
      }
      .item:after {
        left: 100%;
        transform: rotateY(90deg);
      }

      /* Горизонтальная версия */
      .item:nth-child(1) {
        margin-left: -9.375em;
        color: #f352;
        animation-delay: -1.2s;
      }
      .item:nth-child(1):before { color: #f388; }
      .item:nth-child(1):after { color: #f364; }

      .item:nth-child(2) {
        margin-left: -6.25em;
        color: #f352ee;
        animation-delay: -1s;
      }
      .item:nth-child(2):before { color: #f392ee; }
      .item:nth-child(2):after { color: #f372ee; }

      .item:nth-child(3) {
        margin-left: -3.125em;
        color: #f353;
        animation-delay: -0.8s;
      }
      .item:nth-child(3):before { color: #f399; }
      .item:nth-child(3):after { color: #f376; }

      .item:nth-child(4) {
        margin-left: em;
        color: #f353ee;
        animation-delay: -0.6s;
      }
      .item:nth-child(4):before { color: #f399ee; }
      .item:nth-child(4):after { color: #f376ee; }

      .item:nth-child(5) {
        margin-left: 3.125em;
        color: #f354;
        animation-delay: -0.4s;
      }
      .item:nth-child(5):before { color: #f39a; }
      .item:nth-child(5):after { color: #f377; }

      .item:nth-child(6) {
        margin-left: 6.25em;
        color: #f354ee;
        animation-delay: -0.2s;
      }
      .item:nth-child(6):before { color: #f39aee; }
      .item:nth-child(6):after { color: #f354d; }
    </style>
  </head>
  <body>
    <div class="loop cubes">
      <div class="item cubes"></div>
      <div class="item cubes"></div>
      <div class="item cubes"></div>
      <div class="item cubes"></div>
      <div class="item cubes"></div>
      <div class="item cubes"></div>
    </div>
  </body>
</html>
`;
