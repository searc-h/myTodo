<template>
    <div class="item-outer" ref="item">
        <div class="left">
            <div class="userinfo">
                <div class="username">昵称：{{$attrs.item.name}}</div>
                <div class="email">邮箱：{{$attrs.item.qqemail}}</div>
            </div>
            <div class="detail">
                <div class="content">: {{$attrs.item.content}}</div>
                <div class="move"  @click="toMove"> ◁ </div>
            </div>
        </div>
        
        <div class="right">
            <div class="top" @click="toOpenDetail">详情</div>
            <div class="bottom" @click="toOpenDetail">留言</div>
        </div>

    </div>
</template>

<script>
import {ref} from 'vue'
import { useRouter } from 'vue-router'
export default {
    name:'OpenItem',
    setup(_, {attrs}){
        const item = ref(null)
        const router = useRouter()
        function toOpenDetail(){

            let detailItem = attrs.item
            localStorage.setItem('detailitem',JSON.stringify(detailItem))
            router.push({
                name:'opdetail',
            })
        }

        function toMove(){
            if(item.value.style.transform.trim()=='')
                item.value.style.transform = "translateX(-32px)";
            else    
                item.value.style.transform = ''
            // console.log('item',item.value.style.transform)
        }

        return {
            item,
            toOpenDetail,
            toMove
        }
    }
}
</script >

<style lang="less" scoped>
.item-outer{
    line-height: 40px;
    background-color: rgb(245, 245, 245);
    display: flex;
    padding: 2px;
    margin-top: 10px;
    border-radius: 10px;
    transition: all 0.3s;
    position: relative;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
    &:hover{
        background-color: rgb(216, 217, 218);
        // transform: translateX(-32px);
    }

    .left{
        width: 100%;
        .userinfo{
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: rgb(54, 54, 54);
            border-bottom:1px solid rgb(126, 128, 129);
            position: relative;
            .username{
                margin-left: 10px;
            }
            .email{
                position: absolute;
                right: 100px;
                margin-right: 20px;
            }
        }
        .move{
            text-align: center;
            width: 50px;
            cursor: pointer;
        }

        .detail{
            display: flex;
            justify-content: space-between;
            padding: 0px 10px 0px 10px;
            font-weight: 777;
        }
    }
    

    .right{
        position: absolute;   
        right: 0px;
        transform: translateX(100%);
        font-size: 15px;
        letter-spacing: normal;
        .top{
            background-color: rgb(245, 255, 245);
            border: 1px solid rgb(214, 216, 216);
            border-radius: 10px;
        }
        .bottom{
            background-color: rgb(245, 255, 245);
            border: 1px solid rgb(215, 218, 218);
            border-radius: 10px;
        }
    }

}
</style>