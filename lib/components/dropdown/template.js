export const dropdownTemplate = /* html */`
  <style>
    dl {
      width: 200px;
      position: relative;
      display: inline-block;
      color: #fff;
      margin: 0;
      font-family: Helvetica, Arial, sans-serif;
      font-size: 1rem;
    }

    dt {
      padding: 1rem 1rem;
      cursor: pointer;
      text-align: center;
      background: #222;
      font-size: 1rem;
      border-radius: 15px;
      box-shadow: 0 0 4px rgba(255, 255, 255, 0.7);
    }

    dd {
      display: none;
      position: absolute;
      width: 100%;
      right: 0;
      bottom: 120%;
      background-color: #222;
      font-size: 1rem;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 0 4px rgba(255, 255, 255, 0.7);
    }
    
    .arrow {
      display: inline-block;
      padding-left: .25rem;
      transform: scale(1, .5);
    }
  </style>
  <dl>
    <dt id="title">
      <span class="text"></span>
      <span class="arrow"></span>
    </dt>
    <dd>
      <slot></slot>
    </dd>
  </dl>
`;
