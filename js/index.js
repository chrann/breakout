// index.js
'use strict';

{
  const FILE_NAME = 'index.js';
  console.log(`${FILE_NAME} load start.`);

  (() => {
    /** @type {HTMLCanvasElement} メインキャンバス*/
    const canvas = document.getElementById('main');
    const ctx = canvas.getContext('2d');

    /** キャンバスアスペクト比(width / height) */
    const aspect = canvas.width / canvas.height;
    // 画面に合わせてキャンバス縮小
    window.addEventListener('resize', (ev) => {
      console.log(ev);
      console.log(ev.target);

      const w = document.documentElement.clientWidth;
      if (canvas.width > w) {
        // キャンバスデフォルト幅がスクリーンに収まらない場合、スクリーン幅に縮小表示する
        canvas.style.width = `${w}px`;
        canvas.style.height = `${w / aspect}px`;
      } else {
        // キャンバスデフォルト幅がスクリーンに収まっている場合、キャンバスはデフォルト倍率のまま。
        canvas.style.width = `${canvas.width}px`;
        canvas.style.height = `${canvas.height}px`;
      }

      const h = document.documentElement.clientHeight;
      if (Number(canvas.style.height.replace('px', '')) > h) {
        // キャンバス幅調整後の高さがスクリーンに収まらない場合、スクリーン高さに合わせて縮小表示する
        canvas.style.width = `${h * aspect}px`;
        canvas.style.height = `${h}px`;
      }
    });

    class Position {
      constructor(pos) {
        this[Symbol.toStringTag] = 'Position';
        if (pos) {
          this.x = pos.x;
          this.y = pos.y;
        }
        this.x = 0;
        this.y = 0;
      }
    }

    class Size {
      constructor(size) {
        this[Symbol.toStringTag] = 'Size';
        if (size) {
          this.width = size.width;
          this.height = size.height;
        }
        this.width = 0;
        this.height = 0;
      }
    }

    class Rect {
      constructor(rect) {
        this[Symbol.toStringTag] = 'Rect';
        if (rect) {
          /** @type {Position} 長方形の左上位置 */
          this.pos = new Position(rect.pos);
          /** @type {Size} 長方形の幅・高さ */
          this.size = new Size(rect.size);
          /** @type {string} 長方形の塗り色 */
          this.background = rect.background;
          /** @type {number} 長方形の線サイズ */
          this.borderWidth = rect.borderWidth;
          /** @type {string} 長方形の線色 */
          this.borderColor = rect.borderColor;
        }
        this.pos = new Position();
        this.size = new Size();
        this.background = 'black';
        this.borderWidth = 0;
        this.borderColor = 'black';
      }

      draw() {
        ctx.beginPath();
        ctx.rect(this.pos.x, this.pos.y, this.size.width, this.size.height);
        ctx.fillStyle = this.background;
        ctx.fill();
        if (this.borderWidth) {
          ctx.lineWidth = this.borderWidth;
          ctx.strokeStyle = this.borderColor;
          ctx.stroke();
        }
      }
    }

    class Arc {
      constructor(arc) {
        this[Symbol.toStringTag] = 'Arc';
        if (arc) {
          /** @type {Position} 円の中心位置 */
          this.pos = new Position(arc.pos);
          /** @type {number} 円の半径 */
          this.radius = arc.radius;
          /** @type {number} 円弧の開始角度 */
          this.startAngle = arc.startAngle;
          /** @type {number} 円弧の終了角度 */
          this.endAngle = arc.endAngle;
          /** @type {boolean} 円弧描画方向が反時計回りか */
          this.isAntiClockWise = arc.isAntiClockWise;
          /** @type {boolean} 円弧のパスを閉じるか(半円を描いた場合等に、最初の位置までパスを引くか) */
          this.isClosePath = arc.isClosePath;
          /** @type {string} 円の塗り色 */
          this.background = arc.background;
          /** @type {number} 円の線サイズ */
          this.borderWidth = arc.borderWidth;
          /** @type {string} 円の線色 */
          this.borderColor = arc.borderColor;
        }
        this.pos = new Position();
        this.radius = 0;
        this.startAngle = 0;
        this.endAngle = 0;
        this.isAntiClockWise = false;
        this.isClosePath = false;
        this.background = 'black';
        this.borderWidth = 0;
        this.borderColor = 'black';
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, this.startAngle, this.endAngle, this.isAntiClockWise);
        if (this.isClosePath) {
          ctx.closePath();
        }
        ctx.fillStyle = this.background;
        ctx.fill();
        if (this.borderWidth) {
          ctx.lineWidth = this.borderWidth;
          ctx.strokeStyle = this.borderColor;
          ctx.stroke();
        }
      }
    }

    const r1 = new Rect();
    r1.pos.x = 10;
    r1.pos.y = 20;
    r1.size.width = 100;
    r1.size.height = 200;
    r1.borderColor = 'yellow';
    r1.borderWidth = 0;
    r1.draw();

    const a1 = new Arc();
    a1.pos = { x: 110, y: 220 };
    a1.radius = 20;
    a1.background = 'green';
    a1.startAngle = Math.PI * 0.2;
    a1.endAngle = Math.PI * 1.5;
    a1.borderColor = 'blue';
    a1.borderWidth = 5;
    a1.draw();
  })();

  console.log(`${FILE_NAME} load end.`);
}
