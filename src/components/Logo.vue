<template>
    <div class="intro">
        <router-link to="/contact" id="link-to-contact">Contact</router-link>
        <img class="calculator-logo" alt="Calculator logo" src="../assets/calculator.png" />
        <h3>Calculator</h3>
        <p>This ia a simple calculator.</p>
    </div>
</template>

<style scoped>
/*Styling the logo*/
.calculator-logo{
    width: 20%;
    margin-top: 10%;
    margin-left: 10%;
}

h3{
    margin: 0;
}

.intro{
    text-align: center;
    height: 10em;
}

#link-to-contact {
  color: #3f0073cc;
  float: right;
  padding-right: 5%;
  font-size: 20px;
}

@media only screen and (min-width: 768px) {

.calculator-logo{
    width: 15%;
    margin-top: 5%;
}

h3{
    font-size: 2em;
}

p{
    font-size: 1.2em;
}
}
</style>