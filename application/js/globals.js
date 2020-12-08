const urlStart = "https://raw.githubusercontent.com/mmainzer/ppp-loans/main/application/data";
let selectedData = [ "PPP" ];
let selectedLevel = [ "CDRegion" ];
let selectedGeo = [ "Metro South" ];
let selectedIndustry = [ "Accommodation and Food Services" ];
const formatTime = d3.timeFormat("%B %d, %Y");

// function for number formatting
Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
}
