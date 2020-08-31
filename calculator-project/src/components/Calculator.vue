<template>
  <div class="calculator">
    <div v-if="!secVar"class="display">{{ current }}</div>
    <div v-if="secVar" class="display">{{ temp }}</div>
    <div @click="clear" class="btn">AC</div>
    <div @click="sign" class="btn">+/-</div>
    <div @click="calcPerc" class="btn">%</div>
    <div @click="calculate" class="btn operator">/</div>
    <div @click="getNum" class="btn">7</div>
    <div @click="getNum" class="btn">8</div>
    <div @click="getNum" class="btn">9</div>
    <div @click="calculate" class="btn operator">x</div>
    <div @click="getNum" class="btn">4</div>
    <div @click="getNum" class="btn">5</div>
    <div @click="getNum" class="btn">6</div>
    <div @click="calculate" class="btn operator">-</div>
    <div @click="getNum" class="btn">1</div>
    <div @click="getNum" class="btn">2</div>
    <div @click="getNum" class="btn">3</div>
    <div @click="calculate" class="btn operator">+</div>
    <div @click="getNum" class="btn zero">0</div>
    <div @click="getNum" class="btn">.</div>
    <div @click="showAns" class="btn operator">=</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        current: '0',
        answer: '',
        temp: '',
        op: '',
        secVar: false
      }
    },
    methods: {
      clear() {
        this.current = 0;
        this.temp = 0;
        this.op = '';
        this.secVar = false;
      },
      sign() {
        if (this.current.charAt(0) == '-') {
          this.current = this.current.slice(1)
        } else if (this.current != '0') {
          this.current = '-' + this.current;
        }
      },
      getNum(e) {
        if (this.current == '0') {
          this.secVar = false;
          // console.log(e.target.textContent)
          this.current = e.target.textContent;
        } else {
          this.secVar = false;
          this.current += e.target.textContent;
        }
      },
      calculate(e) {
        if (this.secVar == false){
        this.temp = Number(this.current);
        this.op = e.target.textContent;
        this.current = ''
        this.secVar = true
        console.log(typeof(this.op));
        } else {
          return;
        }
      },
      calcPerc() {
        this.current /= 100
      },
      showAns() {
        this.secVar = false
        switch (this.op) {
          case 'x':
            this.current = this.temp * Number(this.current)
            break;
          case '/':
            this.current = this.temp / Number(this.current)
            break;
          case '+':
            this.current = this.temp + Number(this.current)
            break;
          case '-':
            this.current = this.temp - Number(this.current)
            break;
          default:
            alert('Wrong operator')
            break;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .calculator {
    margin: 0 auto;
    line-height: 55px;
    width: 500px;
    font-size: 32px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(50px, auto);
    font-family: lighter;
  } // Span the entire 4 columns
  .display {
    grid-column: 1 / 5;
    background-color: #1F1F1F;
    color: white;
  }
  .zero {
    grid-column: 1 / 3;
  }
  .btn {
    background-color: #eaeaee;
    border: 1px solid #333;
  }
  .operator {
    background-color: #f39726;
  }
</style>
