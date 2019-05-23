<template>
	<div class="sortDateTime" style="text-align:left;text-align:center;"
	:style="{fontSize:fontSize+'px !important',fontFamily:fontFamily,color:fontColor}">
			<span>
				{{dateTime}}
			</span><br/>
			<span>{{date}}</span>
	</div>
</template>

<script>
import moment from 'moment';

export default {
	name:"clockCom",
	props:["fontSize","fontFamily","fontColor","timeZone"],
	data () {
		return {
				dateTime:"",
				date:""
		}
	},
	watch: {
		timeZone(val){
		  this.dateTime=moment(new Date().getTime()+3600000 * val).format('HH:mm');
		}
	},
	methods:{
		initD(val){
				var DayArr = ['一','二','三','四','五','六','日'],Day="",DayN=moment().format('E');
				DayArr.forEach((item,index)=>{
					if (DayN == index+1) { Day = item; }
				});
				this.date = moment().format('YYYY年MM月DD日 星期')+Day;
		}
	},
	mounted(){
		this.initD();
	}
}
</script>

<style lang="scss" scoped>

</style>
