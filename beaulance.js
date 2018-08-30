/*
BEAUlance.js
Author: @vladiuz1
Version: 0.1.1
*/

var prices = {
  "usdt": 0.99,
  "btc": 6320,
  "eth": 252.34,
  "viu": 0.001,
  "jot": 0.12,
  "swap": 2.03,
  "pat": 0.01
}

function intersect(a, b) {
      return [...new Set(a)].filter(x => new Set(b).has(x));
}

class BalanceFormatter {
	constructor(balance, symbol, basePrice=1, baseSymbol='usdt') {
  	this.b = balance;
    this.sym = symbol;
    this.bs = balance.toString();
    this.lft = this.bs.split('.')[0];
    this.rht = this.bs.split('.')[1];
    this.sg = Math.round(Math.log10(basePrice));
    this.dec = this.sg + 2;
    this.shrt = false;
    this.flags = new Array();
    if (!this.rht) {
	    this.rht = '';
    }
    for (var i = 0; i < this.dec; i++) {
      if (i>this.rht.length-1) {
      	this.rht += '0';
      }
    }
    this.rht = this.rht.substring(0, this.dec);
    if (this.rht.length>0)
	    this.bs = this.lft+'.'+this.rht;
    else
      this.bs = this.lft;
    var a = [];
    var isZero = true;
    for (var i = 0; i < this.bs.length; i++) {
      if (isZero && (this.bs[i] == '0' || this.bs[i] == '.'))
	      a.push(['zz']);
      else {
        a.push([]);
        isZero = false;
      }
    }
    if (this.dec > 2)
      for (var i = this.bs.length-1; i>this.bs.length - 3 && i>0; i--)
        a[i].push('ii');
    else if (this.dec > 0)
      for (var i = this.bs.length-1; i>this.bs.length - 4 && i>0; i--)
        a[i].push('ii');
    else
      for (var i = this.bs.length-1; i > 0 && i>this.bs.length - 3 + this.dec; i--)
          a[i].push('ii');

    console.log(this.bs+'/'+this.dec);
    console.log(JSON.stringify(a));
    this._html ='';
    for (var i = 0; i < this.bs.length; i++) {
      this._html += '<span class="'+a[i].join(' ')+'">'+this.bs[i]+'</span>';
		}
  }
  str() {
    /* returns balance as string */
    return this.bs;
  }
  html() {
    /* returns balance as html */
    return this._html;
  }
}



function updateBalances() {
  /*
  Call this function from window.onload()
  */
  var divs = document.querySelectorAll('div.balance');
	for (var i = 0; i < divs.length; i++) {
    var div = divs[i];
    var currency = intersect(Object.keys(prices), div.className.toLowerCase().split(" "))[0];
    var b = new BalanceFormatter(parseFloat(div.getAttribute("balance")),
    						currency,
    						window.prices[currency]);
		div.innerHTML  = b.html();
    div.title = div.getAttribute("balance") + ' ' +
                currency.toUpperCase() + '\n(' +
                (Math.round(prices[currency]*
                parseFloat(div.getAttribute("balance")))).toFixed(2).toString() +
                ' USD)';
  }
}

window.onload = function(ev) {
    alert('loaded');
   updateBalances();
}
