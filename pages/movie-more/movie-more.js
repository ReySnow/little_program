// pages/movie-more/movie-more.js
var app = getApp();
var util = require("../../utils/util.js");
Page({

  data: {
    movies: [],
    totalcount: 0,
    isEmpty: true
  },

  onLoad: function(options) {
    var categoryName = options.categoryname;
    wx.setNavigationBarTitle({
      title: categoryName
    })
    var url;
    switch (categoryName) {
      case "正在热映":
        url = app.globalUrl.Url + '/v2/movie/in_theaters';
        break;
      case "即将上映":
        url = app.globalUrl.Url + '/v2/movie/coming_soon';
        break;
      case "排行榜":
        url = app.globalUrl.Url + '/v2/movie/top250';
        break;
    }
    this.setData({
      url: url
    })
    util.http(url, this.callback);

  },
  callback: function(res) {
    console.log(res.subjects);
    var movies = [];
    for (var idx in res.subjects) {
      var subject = res.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        title: title,
        coverageUrl: subject.images.large,
        average: subject.rating.average,
        star: "",
        movieid: subject.id
      }
      movies.push(temp);
    }
    var totalmovies = [];
    if (!this.data.isEmpty) {
      totalmovies = this.data.movies.concat(movies);
    } else {
      totalmovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalmovies
    })
    this.data.totalcount += 20;
  },

  onReady: function() {

  },
  onReachBottom: function(e) {
    var nexturl = this.data.url + "?start=" + this.data.totalcount + "&count=20";
    util.http(nexturl, this.callback);
  },
  gotoMovieDetail:function(e){
    var movieid = e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?movieid=' + movieid,
    })
  }
  

})