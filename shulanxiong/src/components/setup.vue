<template>
    <div class="bg">
        <div class="header">
			<img src="../../static/images/left.png" @click="go"/>	
			<span>更多</span>
		</div>
        <ul class="list">
            <li>
                <span>意见反馈</span>
                <div>
                    <img src="../../static/images/right.png" alt="">
                </div>    
            </li>
            <li>
                <span>账号安全</span>
                <div>
                    <img src="../../static/images/right.png" alt="">
                </div>
            </li>  
            <li>
                <span>清除缓存</span>
                <div>
                    <span>8.70MB</span>
                    <img src="../../static/images/right.png" alt="">
                </div>
            </li>
            <li>
                <span>检查版本</span>
                <div>
                    <span>1.5.8</span>
                    <img src="../../static/images/right.png" alt="">
                </div>
            </li> 
            <li>
                <span>商家客服电话</span>
                <div>
                    <span>073182899286</span>
                    <img src="../../static/images/right.png" alt="">
                </div>
            </li> 
             <li>
                <span>关于树懒熊</span>
                <div>
                    <span></span>
                    <img src="../../static/images/right.png" alt="">
                </div>
            </li>                                             
        </ul>

        <button class="quit" @click="quit">退出登录</button>
    </div>
</template>
<script>
export default {
    name:'setup',
    methods:{
        go(){
            this.$router.go(-1)
            this.$store.commit('changFoot',true)
        },
        quit(){
            this.$store.commit('changeUser','')
            this.$axios({
                url:'/users/quit',
                method:'get'
            }).then(res=>{
                console.log(res)
                if(res.data.success){
                    this.$router.push({name:'Login'})
                }
            })

        }
    }
}
</script>
<style lang="less" scoped>
.bg{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
	.header{
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 110px;
		line-height: 110px;
		background: #f8f8f8;
		color: #333;
		font-size: 42px;
		text-align: center;

		img{
			position: absolute;
			top: 0;
			bottom: 0;
			margin: auto;
			left: 46px;
			
			width: 50px;
			height: 50px;
			vertical-align: middle;
		}
    }
    .list{
        width: 100%;
        border-top: 2px solid #e9e9e9;
        margin-bottom:20px ;
        li{
            padding: 25px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            width: 100%;
            font-size: 28px;
            color: #2a2a2a;
            border-bottom: 2px solid #e9e9e9;
            div{
                display: flex;
                justify-content: space-between;
                color: #919191;
                img{
                    width: 32px;
                    height: 32px;
                }               
            }


        }

    }
    .quit{
        width: 700px;
        height: 90px;
        border-radius: 10px;
        background: #f94d4d;
        border: none;
        outline: none;
        font-size: 35px;
        text-align: center;
        color: #fff;
    }
</style>


