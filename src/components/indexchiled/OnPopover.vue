<template>
  <div class="OnPopover">
      <div class="OnPopover_box" v-for="(item,index) in list" @click="editSettin(index)">
          <img :src="item.img" @mouseover="item.img = item.imgb" @mouseout="item.img = item.imga">
          <p>{{item.name}}</p>
      </div>

    <Modal title="调整亮度"
        v-model="modalShow0" class-name="vertical-center-modal"
        :mask-closable="false">
        <div class="tzld-box">
            <p>当前亮度：
              <!-- <span class="tzld-input">{{sliderValue}}%</span> -->
              <el-input type='number' v-model.number="sliderValue" :max="100" :min="0" :maxlength="3" size="small" class="tzld-input"></el-input> %
            <p>
            <div class="tzld-im">
                <img src="static/img/iconsSettin/ld.png">
                <el-slider :show-tooltip="false" v-model="sliderValue" class="settin-slider">
                </el-slider>
                <img src="static/img/iconsSettin/ld.png">
            </div>
        </div>
        <div slot="footer">
            <el-button size="small" @click="close">取消</el-button>
           <el-button type="primary" size="small">确定</el-button>
        </div>
    </Modal>

    <Modal title="调整音量"
        v-model="modalShow1" class-name="vertical-center-modal"
        :mask-closable="false">
        <div class="tzld-box">
            <p>当前音量：
              <!-- <span class="tzld-input"></span> -->
              <el-input type='number' v-model.number="sliderValue" :max="100" :min="0" :maxlength="3" size="small" class="tzld-input"></el-input> %
            <p>

            <div class="tzyl">
                <img src="static/img/iconsSettin/ylj_1.png">
                <el-slider :show-tooltip="false" v-model="sliderValue" class="settin-slider">
                </el-slider>
                <img src="static/img/iconsSettin/ylj.png">
            </div>
        </div>
        <div slot="footer">
            <el-button size="small" @click="close">取消</el-button>
           <el-button type="primary" size="small">确定</el-button>
        </div>
    </Modal>

    <Modal title="定时开关屏"
        v-model="modalShow2" class-name="vertical-center-modal"
        :mask-closable="false">
        <div>
           <el-form :inline="true" >
                <el-form-item label="开机时间：">
                    <el-time-select size="small" style="width:142px;" placeholder="选择时间">
                    </el-time-select>
                </el-form-item>
                <el-form-item label="关机时间：">
                    <el-time-select size="small" style="width:142px;" placeholder="选择时间">
                    </el-time-select>
                </el-form-item><br/>
                <el-form-item label="" class="Modal-radio">
                        <div style="width:280px"></div>
                        <el-radio v-model="radio" label="1" class="Modal-radio">永久</el-radio>
                        <el-radio v-model="radio" label="2">阶段</el-radio>
                </el-form-item><br/>
                <el-form-item label="开机日期：">
                    <el-date-picker type="date" placeholder="选择日期" align="center"
                     size="small" style="width:142px;" >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期：">
                    <el-date-picker type="date" placeholder="选择日期" align="center"
                     size="small" style="width:142px;" >
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer">
            <el-button size="small" @click="close">取消</el-button>
           <el-button type="primary" size="small">确定</el-button>
        </div>
    </Modal>

    <Modal title="手动开关屏"
        v-model="modalShow3" class-name="vertical-center-modal"
        :mask-closable="false">
        <div style="text-align:center;">
            <my-switch size="large">
                <span slot="open">开启</span>
                <span slot="close">关闭</span>
            </my-switch>
        </div>
        <div slot="footer">
            <el-button size="small" @click="close">取消</el-button>
           <el-button type="primary" size="small">确定</el-button>
        </div>
    </Modal>

    <Modal title="播放器升级"
        v-model="modalShow6" class-name="vertical-center-modal"
        :mask-closable="false">
        <div style="text-align:center;">
          请联系管理员后进行升级
        </div>
        <div slot="footer">
            <el-button size="small" @click="close">取消</el-button>
           <el-button type="primary" size="small">确定</el-button>
        </div>
    </Modal>
  </div>
</template>7

<script>
export default {
  name: "OnPopover",
  props: {},
  data() {
    return {
      list: [
        {
          name: "调节亮度",
          img: "static/img/iconDrive/ld.png",
          imga: "static/img/iconDrive/ld.png",
          imgb: "static/img/iconDrive/ld_1.png"
        },
        {
          name: "调节音量",
          img: "static/img/iconDrive/yl.png",
          imga: "static/img/iconDrive/yl.png",
          imgb: "static/img/iconDrive/yl_1.png"
        },
        {
          name: "定时开关屏",
          img: "static/img/iconDrive/ds.png",
          imga: "static/img/iconDrive/ds.png",
          imgb: "static/img/iconDrive/ds_1.png"
        },
        {
          name: "手动开关屏",
          img: "static/img/iconDrive/bf.png",
          imga: "static/img/iconDrive/bf.png",
          imgb: "static/img/iconDrive/bf_1.png"
        },
        {
          name: "重启系统",
          img: "static/img/iconDrive/cq.png",
          imga: "static/img/iconDrive/cq.png",
          imgb: "static/img/iconDrive/cq_1.png"
        },
        {
          name: "清空节目",
          img: "static/img/iconDrive/sc.png",
          imga: "static/img/iconDrive/sc.png",
          imgb: "static/img/iconDrive/sc_1.png"
        },
        {
          name: "播放器升级",
          img: "static/img/iconDrive/bfqsj.png",
          imga: "static/img/iconDrive/bfqsj.png",
          imgb: "static/img/iconDrive/bfqsj_1.png"
        }
      ],
      modalShow0: false,
      modalShow1: false,
      modalShow2: false,
      modalShow3: false,
      modalShow6: false,
      sliderValue: 0,
      modalIndex: 0,
      radio: 0
    };
  },
  methods: {
    editSettin(index) {
      // 打开
      if (index == 4) {
        this.reOpen();
        return;
      }
      if (index == 5) {
        this.clearMatr();
        return;
      }
      if (index == 6) {
        this.upgrade();
      }
      
      this.modalIndex = index;
      this["modalShow" + index] = true;
    },
    close() {
      // 关闭
      this["modalShow" + this.modalIndex] = false;
    },
    reOpen() {
      this.$confirm("此操作将重启系统?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          type: "success",
          message: "重启成功!"
        });
      });
    },
    clearMatr() {
      this.$confirm("此操作将清空设备内的节目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          type: "success",
          message: "清空成功!"
        });
      });
    },
    upgrade(){
       
    }
  }
};
</script>
<style lang="scss" scoped>
$orgin: #ff7c4c;

.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}

.OnPopover {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding-top: 12px;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  .OnPopover_box {
    width: 25%;
    text-align: center;
    > p {
      font-size: 12px;
      color: #000;
      margin: 12px 0;
    }
  }
}

.tzld-box {
  > p {
    text-align: center;
    .tzld-input {
      display: inline-block;
      border: 1px solid #ddd;
      width: 60px;
      height: 30px;
      border-radius: 6px;
      line-height: 28px;
    }
  }

  .settin-slider {
    width: 78%;
    display: inline-block;
  }
  .tzld-im > img {
    display: inline-block;
    margin: 0 8px;
    &:first-child {
      width: 26px;
      vertical-align: 6px;
    }
  }

  .tzyl img {
    display: inline-block;
    margin: 0 8px;
    &:first-child {
      width: 26px;
      vertical-align: 10px;
    }
    &:last-child {
      vertical-align: 6px;
    }
  }
}
</style>


