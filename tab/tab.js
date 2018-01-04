!function($){
	var Tab = function(ele){
		this.ele = ele;
		config = JSON.parse(ele.attr('data-config'));
		//默认配置
		this.config = {
			"event":"mouseover",//触发事件
			"time":2000,//切换时间 false 为不切换
			"invoke":1,//默认tab
			"type":"default"//切换方式 默认和淡出
		};
		$.extend(this.config, config);

		//默认地址
		this.index = this.config.invoke;
		//点击事件
		this.switch();

		//默认显示
		this.invoke();

		//轮播
		this.loopfun();
	};

	Tab.prototype  = {
		"switch":function(){
			ele = this.ele;
			var that = this;
			config = this.config;
			event = config.event == "click"?"click":"mouseover";
			if(config.type == "default"){
				ele.find(".tab-li").on(event, function(e, par1){
					//par1存在则为模拟请求
					$(this).addClass("active").siblings().removeClass("active");//tab
					var index = $(this).index();
					that.ele.find(".content").eq(index).show().addClass("current").siblings().removeClass("current").hide();
					if(that.loop && !par1){
						clearInterval(that.loop);  
						that.loop = null;
					}
					that.addIndex(index);
				}).on('mouseout', function(){
					if(!that.loop){
						that.loopfun();
					}
				});
			}else{
				ele.find(".tab-li").on(event, function(e, par1){
					//par1存在则为模拟请求
					$(this).addClass("active").siblings().removeClass("active");//tab
					var index = $(this).index();
					that.ele.find(".content").eq(index).fadeIn().siblings().fadeOut();
					if(that.loop && !par1){
						clearInterval(that.loop);  
					}
					that.addIndex(index);
				}).on('mouseout', function(){
					that.loopfun();
				});
			}
		},
		"invoke":function(){
			ele = this.ele;
			config = this.config;
			ele.find('.tab-li').eq(config.invoke-1).addClass("active").siblings().removeClass("active");
			ele.find('.content').eq(config.invoke-1).addClass("current").siblings().removeClass("current");
		},
		"addIndex":function(index){
			var count = this.ele.find('.tab-li').length;
			if(++index>=count){
				this.index = 0;
			}else{
				this.index = index;
			}
		},
		"loopfun":function(){
			if(this.config.time && parseInt(this.config.time)){	
				that = this;
				this.loop = setInterval(function(){
					event = that.config.event == "click"?"click":"mouseover";
					that.ele.find(".tab-li").eq(that.index).trigger(event, ['tri']);
				}, that.config.time)
			}
		}
	}
	
	//注册成jquery方法
	$.fn.extend({
		tab:function(){
			this.each(function(){
				new Tab($(this))
			})
			return this;
		}
	})
	window.Tab = Tab;
}(jQuery)