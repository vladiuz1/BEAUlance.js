# BEAUlance.js
A javascript library that beautifies crypto balances.

Usage:


 1. Define css styles

```css
div.balance {
  /* main digit style */
  font-family: "Courier", "Courier New";
  text-align: right;
  font-weight: bold;
  font-size: larger;
}

div.balance span.zz {
  /* leading zeros */
  color: #888888;
}

div.balance span.ii {
  /* insignificant digits */
  font-weight: normal;
  font-size: medium;
}

```
 2. Add javascript just before the closing `</body>` tag:
 
```html
<script language="JavaScript">
   window.onload = function(ev) {
      updateBalances();
   }
</script>
```

