//这里是书的主页的 js 文件

$(function() {
    var magnifierConfig = {
        magnifier : "#magnifier1",//最外层的大容器
        width : 260,//承载容器宽
        height : 260,//承载容器高
        moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例
        zoom : 2.5//缩放比例
    };

    var _magnifier = magnifier(magnifierConfig);

    /*magnifier的内置函数调用*/
    /*
        //设置magnifier函数的index属性
        _magnifier.setIndex(1);

        //重新载入主图,根据magnifier函数的index属性
        _magnifier.eqImg();
    */
});
