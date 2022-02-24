var bmap = require('../../libs/bmap-wx.min.js')
import { areaList } from '@vant/area-data';
console.log(areaList)
Page({
    data:{
        city:'',
        weatherlist:'',
        areaList,
        aqi:'',//当天天气
        show:false //省市弹出框是否展示
    },
    onShow(){
        var that = this
        wx.getLocation({
          success:(res)=>{
                 this.createNmp()
              } 
        })
    },
	createNmp(){ // 新建百度地图对象 
		var BMap = new bmap.BMapWX({
		    ak: 'TjBG1OYjOKYITRLVTtzopC95VC3K1STh' 
		}); 
		// 发起regeocoding检索请求
		BMap.regeocoding({ 
		    fail: function(data) { 
                  console.log(data) 
              }, 
		    success: (data)=>{
				this.setData({
				  city:data.originalData.result.addressComponent.city.replace(/市$/,'')
				})
				this.getweather()
			}, 
		});
	},
	getweather(){
		wx.request({
		   url: 'http://www.yiketianqi.com/api?version=v9&appid=53923538&appsecret=ZImIQ5Cm&city='+this.data.city,
		   success:(res)=>{
		       this.setData({
                  aqi:res.data.aqi,
		           weatherlist:res.data.data
		       })
		   }
		 })
	},
    showPop(){
        this.setData({
            show:!this.data.show
        })
    },
    onClose(){
        this.setData({
            show:false
        })
    },
    confimCity(res){
        let  cityName = res.detail.values[1].name
        this.setData({
            show:false,
            city:cityName
        })
        this.getweather()
    },
    cancelCity(){
        this.setData({
            show:false
        })
    }
})