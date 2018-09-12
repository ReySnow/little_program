// pages/movie/movie.js
var app = getApp();
var util = require("../../utils/util.js");
Page({

  data: {
    top250: [],
    inTheater: [],
    comingSoon: []

  },

  onLoad: function(options) {
    var inTheater = app.globalUrl.Url + '/v2/movie/in_theaters?start=0&count=3';
    var comingSoon = app.globalUrl.Url + '/v2/movie/coming_soon?start=0&count=3';
    var top250 = app.globalUrl.Url + '/v2/movie/top250?start=0&count=3';
    this.http(inTheater, this.callback, 'inTheater', '正在热映');
    this.http(comingSoon, this.callback, 'comingSoon', '即将上映');
    this.http(top250, this.callback, 'top250', '排行榜');
  },
  http: function(url, callback, category, categoryName) {
    wx.request({
      url: url,
      header: {
        'content-type': 'application/xml' // 默认值
      },
      success: function(res) {
        callback(res.data, category, categoryName)
      }
    })
  },
  callback: function(res, category, categoryName) {
    console.log(res);
    var movies = [];
    for (var idx in res.subjects) {
      var subject = res.subjects[idx];
      var title = util.dealTitle(subject.title);
      var temp = {
        title: title,
        coverageUrl: subject.images.large,
        average: subject.rating.average,
        star: "",
        movieid: subject.id
      }
      movies.push(temp);
    }
    var readyData = {};
    readyData[category] = {
      categoryName: categoryName,
      movies: movies
    }
    this.setData(readyData)
  },
  movieMore:function(e){
    var categoryName = e.currentTarget.dataset.categoryname;
    wx.navigateTo({
      url: '../movie-more/movie-more?categoryname=' + categoryName
    })
  },
  gotoMovieDetail: function (e) {
    var movieid = e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?movieid=' + movieid,
    })
  }
  

})