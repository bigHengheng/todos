(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	var vw = new Vue({
		el: "#app",
		data: {
			list: [{
					text: "旅游",
					status: true
					// 已完成，则status为true,
					// 当多选框的checked v-module值为true，则表示选中
					// 未完成，则status为false
				},
				{
					text: '美食',
					status: false
				},
				{
					text: '放风筝',
					status: true
				}
			],
			newText: '',
			editList:'',
			listStatus:'All'
		},
		methods: {
			// 添加事项的功能
			addList() {
				// 获取到输入框的新值
				// 先判断一下，输入的值是否为空
				if (this.newText.trim() === '') {
					alert("所填内容不能为空值")
					this.newText = ''
					return
				}
				this.list.push({
					text: this.newText,
					status: false
				})
				// 添加完毕之后，把输入框当中的值清空
				this.newText = ''
			},
			isShow(valueStatus){
				switch (this.listStatus){
						case 'All':{
							return true
							break
						}
						case 'Active':{
							return !valueStatus
							break
						}
						case 'Completed':{
							return valueStatus
							break
						}
						default:{
							return true
							break
						}
				}
			}

		},
		computed: {
			// 下面的是get获取
			checkAll:{
				// 还需要Set设置
				set(newVal) {
						// console.log(newVal)
						// 遍历list
						this.list.forEach(value => {
							value.status=newVal
						});
					},
					get() {
						var tempList = this.list.filter(value => {
							// 把选中的，true
							return value.status
						})
						// console.log(tempList)
						return tempList.length == this.list.length ? true : false
					}
			}
		},
		updated(){
			// 数据更新的时候，把对应的数据存到本地存储里
			localStorage.setItem("todosList",JSON.stringify(this.list))
		},
		mounted(){
			// 一开始的时候，本地存储为空的
			if(!localStorage.getItem("todosList")){
				return 
			}
			// 页面一挂载的时候，把对应的数据取出
			this.list=JSON.parse(localStorage.getItem("todosList"))
		}
	})



})(window);
