const mySwiper = {
    template:`
        <el-row type="flex" justify="center">
            <el-col :span="24">
            <div id="parent">
                <div id="swiper-box" class="swiper-box" :style="{transform:'translateX('+currentOffset+'px)'}">
                    <div class="card-item" :style="{minWidth:width,height:width,maxWidth:width}" v-for="(item,index) in imgs_url">
                        <img :src="item" class="image" @click='change_img(item,index)' :class='img_index===index?"green_border":""'>
                    </div>
                </div>
                <i class="el-icon-arrow-left" @click="left"></i>
                <i class="el-icon-arrow-right" @click="right"></i>
            </div>
            </el-col>
        </el-row>
    `,
    props:{
    },
    data(){
        return {
            // swiper-box往右边移动
            img_index:'',
            currentOffset:0,
            width:"",
            parentWith:0,
            currentDate: new Date()
        }
    },
    props:['imgs_url'],
    created(){
    },
    mounted(){
        this.setCardWidth()
        window.addEventListener('resize',()=>{
        this.currentOffset = 0
        this.setCardWidth()
        })
    },
    methods:{
        setCardWidth() {
            const parent = document.querySelector('#parent');
            this.parentWith = parent.clientWidth
            // 20为左右10px padding
            this.width = ((this.parentWith-14) / 7)+'px'
        },
        right() {
            // swiper-box的宽度
            let move_width = -this.currentOffset
            // 每个items宽度
            // 14为父盒子左右padding值
            // 7为7个元素
            let single_width = (this.parentWith-14) / 7
            // 未轮播的items数量
            let number = this.imgs_url.length- (move_width / single_width)
            if( number <= 7) return
            this.currentOffset-=((this.parentWith-14) / 7)
        },
        left() {
            if(this.currentOffset >= 0) return
            this.currentOffset+=((this.parentWith-14) / 7)
        },
        // 切换图片
        change_img(url,index){
            this.$emit('get-img',url)
            this.img_index = index
        }
    }
}