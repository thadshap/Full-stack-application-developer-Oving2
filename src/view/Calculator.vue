
<template>
    <div class="page">
    <logo></logo>
    <div class="calculator">
    <input class="input-field" type="text" id="input-field" name="equation" v-on:keydown="invalidInput($event)" title="You can not enter any letters">
    <div class="button">
        <button @click="clear">C</button>
        <button id="ans" @click="previousButton()">ANS</button>
        <button id="delete" @click="deleteButton()">DEL</button>
        <button id="pluss" @click="buttonClick('+')">+</button>

        <button @click="buttonClick(1)">1</button>
        <button @click="buttonClick(2)">2</button>
        <button @click="buttonClick(3)">3</button>
        <button id="minus" @click="buttonClick('-')">-</button>

        <button @click="buttonClick(4)">4</button>
        <button @click="buttonClick(5)">5</button>
        <button @click="buttonClick(6)">6</button>
        <button id="multiply" @click="buttonClick('*')">*</button>

        <button @click="buttonClick(7)">7</button>
        <button @click="buttonClick(8)">8</button>
        <button @click="buttonClick(9)">9</button>
        <button id="divide" @click="buttonClick('/')">/</button>

        <button></button>
        <button id="zero" @click="buttonClick(0)">0</button>
        <button id="comma" @click="buttonClick('.')">.</button>
        <button class="equal" @click="equals()">=</button>
    </div>
    </div>
        <div id= "log-box" class="log">
        <h3>Log:
          <button id="clearBtn" class="clearBtn" @click="clearButton()">Clear</button>
          <button id="loadBtn" class="loadBtn" @click="loadButton()">Load</button>
        </h3>
        <div id="log">
        <ul id="list">
          <li v-for="value in log" v-bind:key="value">{{ value }}</li>
        </ul>
      </div>
    </div>
    </div>
</template>
   
<script>
import Logo from '../components/Logo.vue';
import CalculationService from "../services/CalculationService";

export default {
    components: {Logo},
    data(){
        return {
        current: '',
        previous: '',
        equal:'',
        equation:'',
        log: [],
        ch: '',
        };
    },
    methods:{
        invalidInput(e){ 
            if(e.key.match(/[a-zA-ZåøæÅØÆ]/)){
                e.preventDefault();
            }
            else{
                return true;
            }
        },
        buttonClick(number){
            this.current += number;
            document.getElementById("input-field").value += number;
        },
        equals: async function(){
            this.equal = document.getElementById("input-field").value;
            if(this.equal.includes(',')){
              alert('You have to use a dot (.) insted of comma (,) in order to write a decimal number. Try again.')
              document.getElementById("input-field").value = '';
            }
            else{
              await this.changeTempFunction(this.equal);
              this.previous = this.current;
              document.getElementById("input-field").value = this.current;
              this.log.push(this.equal+'='+this.current);
            }
        },
        loadButton(){
          this.log=[];
          this.equationTable();
        },
        clear() {
        this.current = "";
        document.getElementById("input-field").value = this.current;
        },
        deleteButton() {
        this.current = document.getElementById("input-field").value.slice(0, -1);
        document.getElementById("input-field").value = this.current;
        },
        previousButton() {
        this.current = document.getElementById("input-field").value+this.previous;
        document.getElementById("input-field").value = this.current;
        },
        clearButton() {
        this.log = [];
        },
      register() {
        return this.$store.state.register
      },
      changeTempFunction: async function (equal) {
        await CalculationService.setEquation(equal, this.register().id)
            .then(function (response) { // response = json object => PROMISE
              console.log(response)
              const result = response.data
              this.current = String(result)
            }.bind(this))
      },
      equationTable: async function (){
        await CalculationService.getEquations(this.register().id)
            .then(function (response){
              response.data.map((r) => {
                this.log.push(r.equation+'='+r.answer);
              })
            }.bind(this))
      }
    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;700&family=Poppins:wght@400;700&display=swap');
/*Styling the calculator*/
.calculator{
    margin-top: 25%;
}
.input-field{
    background-color: #7f7f80;
    color: white;
    margin: auto;
    border-radius: .3em;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.10);
    font-size: 2em;
    height: 2em; 
    text-align: right;
    display: flex;
    align-items: center;
    width: 90%;
}
.button{
    place-content: space-between;
    padding: 5%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}
button{
    margin: 1.5%;
    background-color: #3f0073cc;
    color: white;
    border-radius: .3em;
    border: none;
    line-height: 320%;
}
button:hover{
    background-color: #3f00739f;
}
.equal{
    background-color: #b30476dc;
}
.equal:hover{
    background-color: #b30476a8;
}
/* Styling log box */
.log{
    padding: 0 0 0 3%;
    border: 2px solid rgba(0, 0, 0, 0.521);
    border-radius: .3em;
    margin: 0 5% 0 5%;
    height: 15em;
    object-fit: cover;
    overflow: scroll;   
}
.clearBtn{
    background: red;
    color: rgba(255, 255, 255, 0.945);
    border-radius: .3em;
    border: 2px solid rgba(0, 0, 0, 0.24);
    height: 2em;
    width: 4em;
    float: right;
    vertical-align: text-bottom;
    margin: 0;
    line-height: 0;
  font-size: .5em;
}
.loadBtn{
  background: green;
  color: rgba(255, 255, 255, 0.945);
  border-radius: .3em;
  border: 2px solid rgba(0, 0, 0, 0.24);
  height: 2em;
  width: 4em;
  float: right;
  vertical-align: text-bottom;
  margin: 0;
  line-height: 0;
  font-size: .5em;
  margin-right: 1%;
}

@media only screen and (min-width: 768px) {
.calculator{
    margin-top: 20%;
}
}
</style>