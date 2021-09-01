function converter() {
    var cotacao = 5.5;
    var dolar = document.querySelector(".dolar-value").value;
    //alert(dolar*5)
  
    document.querySelector(".valor-convertido").textContent = (dolar * cotacao).toFixed(2);
  }
  