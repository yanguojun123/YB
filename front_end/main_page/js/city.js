function Dsy() {
    this.Items = {};
}
Dsy.prototype.add = function(id, iArray) {
    this.Items[id] = iArray;
}
Dsy.prototype.Exists = function(id) {
    if(typeof(this.Items[id]) == "undefined") return false;
    return true;
}
function change(v) {
    var str = "0";
    for(i = 0; i < v; i++) {
        str += ("_" + (document.getElementById(s[i]).selectedIndex - 1));
    };
    var ss = document.getElementById(s[v]);
    with(ss) {
        length = 0;
        options[0] = new Option(opt0[v], opt0[v]);
        if(v && document.getElementById(s[v - 1]).selectedIndex > 0 || !v) {
            if(dsy.Exists(str)) {
                ar = dsy.Items[str];
                for(i = 0; i < ar.length; i++) {
                    options[length] = new Option(ar[i], ar[i]);
                } //end for
                if(v) {
                    options[0].selected = true;
                }
            }
        } //end if v
        if(++v < s.length) {
            change(v);
        }
    } //End with
}
var dsy = new Dsy();
dsy.add("0", ["青岛省"]);
dsy.add("0_0", ["市南区", "市北区", "四方区", "黄岛区", "崂山区","李沧区","城阳区", "胶州市", "即墨市", "平度市", "胶南市", "莱西市"]);
dsy.add("0", ["青岛省"]);
var s = ["s_province", "s_city", "s_county"]; //三个select的name
var opt0 = ["地级市", "市、县级市、区", "街道"]; //初始值
function _init_area() { //初始化函数
    for(i = 0; i < s.length - 1; i++) {
        document.getElementById(s[i]).onchange = new Function("change(" + (i + 1) + ")");
    }
    change(0);
}