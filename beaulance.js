/*
BEAUlance.js
Author: @vladiuz1
Version: 0.1.1

Javascript library that beautifies cryptocurrency balances.
So instead of plain 0.23434398434 BTC you see something readable with significant bits hghlighted, and trailing zeros
omitted.
*/



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
    var f = function(a, b, l) {
      for (var i = b.length-1; i> l && i>0; i--)
        a[i].push('ii');
    }
    if (this.dec > 2)
      f(a, this.bs, this.bs.length - 3);
    else if (this.dec > 0)
      f(a, this.bs, this.bs.length - 4 );
    else
      f(a, this.bs, this.bs.length - 3 + this.dec);
    if (this.lft.length > 3)
        for (var i = this.lft.length - 1; i>=0; i--)
            if ((this.lft.length - i  ) % 3 == 0)
                a[i].push('ss');
    this._html ='';
    for (var i = 0; i < this.bs.length; i++) {
      this._html += '<span class="'+a[i].join(' ')+'">'+this.bs[i]+'</span>';
    }
    this._html += '&nbsp;' + this.sym.toUpperCase() + '&nbsp;';

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
