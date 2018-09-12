// pages/movie-detail/movie-detail.js
var app = getApp();
var util = require("../../utils/util.js");
Page({

  data: {
    coverageUrl:"",
    summary:""
  },

  onLoad: function (options) {
    var detailurl = app.globalUrl.Url + "/v2/movie/" + options.movieid;
    util.http(detailurl,this.callback);
  },
  callback:function(res){
    console.log(res);
    this.setData({
      coverageUrl:res.image,
      summary:res.summary,
      title: res.alt_title
    })
    wx.setNavigationBarTitle({
      title: util.dealTitle(this.data.title),
    })
  },

  onReady: function () {

  }

 
})