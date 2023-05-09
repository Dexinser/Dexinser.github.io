<!--
 描述: 公司品牌介绍
 作者: Jack Chen
 日期: 2020-05-10
-->

<template>
  <div class="brand-container">
    <div class="wrap">
      <header>
        <h2>发货地图</h2>
        <div class="showTime">
          <span class="time">{{ nowTime }}</span>
          <span class="date">
            <span>{{ week }}</span>
            <span>{{ date }}</span>
          </span>
        </div>
      </header>

      <el-button @click="btnClick" class="el-btn">导入自定义数据</el-button>

      <section class="mainbox">
        <div class="item center">
          <div class="map">
            <div class="chart" id="chart_map"></div>
            <div class="map1"></div>
            <div class="map2"></div>
            <div class="map3"></div>
          </div>
        </div>
      </section>
    </div>

    <el-dialog
      v-if="showDialog"
      :visible.sync="showDialog"
      title="自定义数据"
      :z-index="3000"
      size="big"
      :showFullscreenSwitch="true"
    >
      <el-form :model="numberValidateForm" ref="form" :rules="settingRules">
        <!-- <el-form-item prop="selectCP" label="选择七大区域中心" size="mini">
          <el-select v-model="value" disabled placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" disabled placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" disabled placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" disabled placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" disabled placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" disabled placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" disabled placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item prop="BJData" label="北京发货数据：">
          <button
            class="name btn"
            :data-clipboard-text="numberValidateForm.BJData"
          >
            点击复制
          </button>
          <button class="btn" :data-clipboard-text="numberValidateForm.BJData">
            <span class="icon"></span>
          </button>
          <el-input
            type="textarea"
            size="small"
            :rows="8"
            v-model="numberValidateForm.BJData"
          ></el-input>
        </el-form-item>
        <el-form-item prop="GZData" label="广州发货数据：">
          <button
            class="name btn"
            :data-clipboard-text="numberValidateForm.GZData"
          >
            点击复制
          </button>
          <button class="btn" :data-clipboard-text="numberValidateForm.GZData">
            <span class="icon"></span>
          </button>
          <el-input
            type="textarea"
            size="small"
            :rows="8"
            v-model="numberValidateForm.GZData"
          ></el-input>
        </el-form-item>
        <el-form-item prop="SHData" label="上海发货数据：">
          <button
            class="name btn"
            :data-clipboard-text="numberValidateForm.SHData"
          >
            点击复制
          </button>
          <button class="btn" :data-clipboard-text="numberValidateForm.SHData">
            <span class="icon"></span>
          </button>
          <el-input
            type="textarea"
            size="small"
            :rows="8"
            v-model="numberValidateForm.SHData"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="turnOn"> 确定 </el-button>
        <el-button @click="showDialog = false"> 取消 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import "@/assets/js/flexible";
import "@/assets/js/china";
import ClipboardJS from "clipboard/dist/clipboard.min.js";
let BJData = [
    [{ name: "北京" }, { name: "呼和浩特", value: 72, trueName: "华北" }],
    [{ name: "北京" }, { name: "哈密", value: 5, trueName: "西北" }],
    [{ name: "北京" }, { name: "拉萨", value: 7, trueName: "西南" }],
    [{ name: "北京" }, { name: "温州", value: 6, trueName: "华东" }],
    [{ name: "北京" }, { name: "南宁", value: 5, trueName: "华南" }],
    [{ name: "北京" }, { name: "武汉", value: 4, trueName: "华中" }],
    [{ name: "北京" }, { name: "哈尔滨", value: 3, trueName: "东北" }],
  ],
  GZData = [
    [{ name: "广州" }, { name: "呼和浩特", value: 30, trueName: "华北" }],
    [{ name: "广州" }, { name: "哈密", value: 8, trueName: "西北" }],
    [{ name: "广州" }, { name: "拉萨", value: 11, trueName: "西南" }],
    [{ name: "广州" }, { name: "温州", value: 59, trueName: "华东" }],
    [{ name: "广州" }, { name: "南宁", value: 31, trueName: "华南" }],
    [{ name: "广州" }, { name: "武汉", value: 13, trueName: "华中" }],
    [{ name: "广州" }, { name: "哈尔滨", value: 8, trueName: "东北" }],
  ],
  SHData = [
    [{ name: "上海" }, { name: "呼和浩特", value: 4, trueName: "华北" }],
    [{ name: "上海" }, { name: "拉萨", value: 4, trueName: "西南" }],
    [{ name: "上海" }, { name: "温州", value: 37, trueName: "华东" }],
    [{ name: "上海" }, { name: "哈尔滨", value: 1, trueName: "东北" }],
  ],
  nameMap = {
    华北: "呼和浩特",
    西北: "西宁",
    西南: "成都",
    华东: "上海",
    华南: "南宁",
    华中: "武汉",
    东北: "哈尔滨",
  };
console.log(nameMap, 'nameMap-----');
export default {
  name: "Brand",
  data() {
    return {
      showDialog: false,
      textarea: "",
      nowTime: "",
      week: "",
      date: "",
      geoCoordMap: {},
      BJData,
      GZData,
      SHData,
      numberValidateForm: {
        BJData: JSON.stringify(BJData),
        GZData: JSON.stringify(GZData),
        SHData: JSON.stringify(SHData),
      },
      settingRules: {
        BJData: [
          {
            required: true,
            message: "不能为空",
          },
          {
            validator: function (rule, value, callback) {
              if (!value) {
                callback("请输入");
              } else {
                let flag = false;
                try {
                  JSON.parse(value);
                } catch (e) {
                  flag = true;
                  callback("格式不正确，请检查格式！");
                }
                !flag && callback();
              }
            },
          },
        ],
        GZData: [
          {
            required: true,
            message: "不能为空",
          },
          {
            validator: function (rule, value, callback) {
              if (!value) {
                callback("请输入");
              } else {
                let flag = false;
                try {
                  JSON.parse(value);
                } catch (e) {
                  flag = true;
                  callback("格式不正确，请检查格式！");
                }
                !flag && callback();
              }
            },
          },
        ],
        SHData: [
          {
            required: true,
            message: "不能为空",
          },
          {
            validator: function (rule, value, callback) {
              if (!value) {
                callback("请输入");
              } else {
                let flag = false;
                try {
                  JSON.parse(value);
                } catch (e) {
                  flag = true;
                  callback("格式不正确，请检查格式！");
                }
                !flag && callback();
              }
            },
          },
        ],
      },
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.nowTimes();
    this.getEchart();
    this.bindClipboardClick();
  },
  methods: {
    btnClick() {
      this.showDialog = true;
    },
    turnOn() {
      let {
        numberValidateForm: { BJData, GZData, SHData },
      } = this;
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          this.BJData = JSON.parse(BJData);
          this.GZData = JSON.parse(GZData);
          this.SHData = JSON.parse(SHData);
          this.getEchart();
          this.showDialog = false;
        }
      });
    },
    timeFormate(timeStamp) {
      //显示当前时间
      let newDate = new Date(timeStamp);
      let year = newDate.getFullYear();
      let month =
        newDate.getMonth() + 1 < 10
          ? "0" + (newDate.getMonth() + 1)
          : newDate.getMonth() + 1;
      let date =
        newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
      let hh =
        newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours();
      let mm =
        newDate.getMinutes() < 10
          ? "0" + newDate.getMinutes()
          : newDate.getMinutes();
      let ss =
        newDate.getSeconds() < 10
          ? "0" + newDate.getSeconds()
          : newDate.getSeconds();
      let week = newDate.getDay();
      let weeks = ["日", "一", "二", "三", "四", "五", "六"];
      let getWeek = "星期" + weeks[week];
      this.week = getWeek;
      this.date = year + "." + month + "." + date;
      this.nowTime = hh + ":" + mm + ":" + ss;
    },
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
      this.clear();
    },
    clear() {
      clearInterval(this.nowTimes);
      this.nowTimes = null;
    },
    convertData(data) {
      // 地图数据转换
      let res = [];
      for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        let fromCoord = this.geoCoordMap[dataItem[0].name];
        let toCoord = this.geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem[0].name,
            toName: dataItem[1].trueName,
            coords: [fromCoord, toCoord],
            value: dataItem[1].value,
          });
        }
      }
      return res;
    },
    getEchart() {
      this.beforeFormatData();
      // 初始化地图数据
      let myChart = echarts.init(document.getElementById("chart_map"));
      // var echartsData = echarts.getMap("china").geoJSON.features;

      this.geoCoordMap = {
        北京: [116.4551, 40.2539],
        天津: [117.4219, 39.4189],
        衡水: [115.8838, 37.7161],
        张家口: [115.1477, 40.8527],
        唐山: [118.4766, 39.6826],
        廊坊: [116.521, 39.0509],
        承德: [117.5757, 41.4075],
        沧州: [116.8286, 38.2104],
        石家庄: [114.4995, 38.1006],
        邢台: [114.8071, 37.2821],
        邯郸: [114.4775, 36.535],

        // // '西藏自治区':[91.11,29.97],
        // // '阿里地区':[80.105498,32.503187],
        // '拉萨':[91.132212,29.660361],
        // '山南':[91.766529,29.236023],
        // '昌都':[97.178452,31.136875],
        // '日喀则':[88.885148,29.267519],
        // '那曲':[92.060214,31.476004],
        // '林芝':[94.362348,29.654693],

        // // '新疆维吾尔自治区':[87.68,43.77],
        // // '昌吉回族自治州':[87.304012,44.014577],
        // // '博尔塔拉蒙古自治州':[82.074778,44.903258],
        // // '巴音郭楞蒙古自治州':[86.150969,41.768552],
        // // '阿克苏地区':[80.265068,41.170712],
        // // '克孜勒苏柯尔克孜自治州':[76.172825,39.713431],
        // // '喀什地区':[75.989138,39.467664],
        // // '和田地区':[79.92533,37.110687],
        // // '伊犁哈萨克自治州':[81.317946,43.92186],
        // // '塔城地区':[82.985732,46.746301],
        // // '阿勒泰地区':[88.13963,47.848393],
        // '乌鲁木齐':[87.617733,43.792818],
        // '克拉玛依':[84.873946,45.595886],
        // '吐鲁番':[89.184078,42.947613],
        '哈密':[93.51316,42.833248],
        // '石河子':[86.041075,44.305886],
        // '阿拉尔':[81.285884,40.541914],
        // '图木舒克':[79.077978,39.867316],
        // '五家渠':[87.526884,44.167401],
        // '北屯':[87.824932,47.353177],
        // '铁门关':[85.501218,41.827251],
        // '双河':[82.353656,44.840524],
        // '可克达拉':[80.63579,43.6832],
        // '昆玉':[79.287372,37.207994],
        // '胡杨河':[84.8275959,44.69288853],

        // // '甘肃省':[103.73,36.03],
        // // '甘南藏族自治州':[102.911008,34.986354],
        // // '临夏回族自治州':[103.212006,35.599446],
        // '兰州':[103.823557,36.058039],
        // '金昌':[102.187888,38.514238],
        // '张掖':[100.455472,38.932897],
        // '酒泉':[98.510795,39.744023],
        // '定西':[104.626294,35.579578],
        // '白银':[104.173606,36.54568],
        // '陇南':[104.929379,33.388598],
        // '天水':[105.724998,34.578529],
        // '庆阳':[107.638372,35.734218],
        // '嘉峪关':[98.277304,39.786529],
        // '武威':[102.634697,37.929996],
        // '平凉':[106.684691,35.54279],

        // // '陕西省':[108.95,34.27],
        // '西安市':[108.948024,34.263161],
        // '汉中市':[107.028621,33.077668],
        // '咸阳市':[108.705117,34.333439],
        // '榆林市':[109.741193,38.290162],
        // '安康市':[109.029273,32.6903],
        // '延安市':[109.49081,36.596537],
        // '宝鸡市':[107.14487,34.369315],
        // '商洛市':[109.939776,33.868319],
        // '渭南市':[109.502882,34.499381],
        // '铜川市':[108.979608,34.916582],

        上海: [121.4648, 31.2891],
        东莞: [113.8953, 22.901],
        东营: [118.7073, 37.5513],
        中山: [113.4229, 22.478],
        临汾: [111.4783, 36.1615],
        临沂: [118.3118, 35.2936],
        丹东: [124.541, 40.4242],
        丽水: [119.5642, 28.1854],
        乌鲁木齐: [87.9236, 43.5883],
        佛山: [112.8955, 23.1097],
        保定: [115.0488, 39.0948],
        兰州: [103.5901, 36.3043],
        包头: [110.3467, 41.4899],

        北海: [109.314, 21.6211],
        南京: [118.8062, 31.9208],
        南宁: [108.479, 23.1152],
        南昌: [116.0046, 28.6633],
        南通: [121.1023, 32.1625],
        厦门: [118.1689, 24.6478],
        台州: [121.1353, 28.6688],
        合肥: [117.29, 32.0581],
        呼和浩特: [111.4124, 40.4901],
        咸阳: [108.4131, 34.8706],
        哈尔滨: [127.9688, 45.368],

        嘉兴: [120.9155, 30.6354],
        大同: [113.7854, 39.8035],
        大连: [122.2229, 39.4409],

        太原: [112.3352, 37.9413],
        威海: [121.9482, 37.1393],
        宁波: [121.5967, 29.6466],
        宝鸡: [107.1826, 34.3433],
        宿迁: [118.5535, 33.7775],
        常州: [119.4543, 31.5582],
        广州: [113.5107, 23.2196],

        延安: [109.1052, 36.4252],

        徐州: [117.5208, 34.3268],
        德州: [116.6858, 37.2107],
        惠州: [114.6204, 23.1647],
        成都: [103.9526, 30.7617],
        扬州: [119.4653, 32.8162],
        拉萨: [91.1865, 30.1465],
        无锡: [120.3442, 31.5527],
        日照: [119.2786, 35.5023],
        昆明: [102.9199, 25.4663],
        杭州: [119.5313, 29.8773],
        枣庄: [117.323, 34.8926],
        柳州: [109.3799, 24.9774],
        株洲: [113.5327, 27.0319],
        武汉: [114.3896, 30.6628],
        汕头: [117.1692, 23.3405],
        江门: [112.6318, 22.1484],
        沈阳: [123.1238, 42.1216],
        河源: [114.917, 23.9722],
        泉州: [118.3228, 25.1147],
        泰安: [117.0264, 36.0516],
        泰州: [120.0586, 32.5525],
        济南: [117.1582, 36.8701],
        济宁: [116.8286, 35.3375],
        海口: [110.3893, 19.8516],
        淄博: [118.0371, 36.6064],
        淮安: [118.927, 33.4039],
        深圳: [114.5435, 22.5439],
        清远: [112.9175, 24.3292],
        温州: [120.498, 27.8119],
        渭南: [109.7864, 35.0299],
        湖州: [119.8608, 30.7782],
        湘潭: [112.5439, 27.7075],
        滨州: [117.8174, 37.4963],
        潍坊: [119.0918, 36.524],
        烟台: [120.7397, 37.5128],
        玉溪: [101.9312, 23.8898],
        珠海: [113.7305, 22.1155],
        盐城: [120.2234, 33.5577],
        盘锦: [121.9482, 41.0449],
        福州: [119.4543, 25.9222],
        秦皇岛: [119.2126, 40.0232],
        绍兴: [120.564, 29.7565],
        聊城: [115.9167, 36.4032],
        肇庆: [112.1265, 23.5822],
        舟山: [122.2559, 30.2234],
        苏州: [120.6519, 31.3989],
        莱芜: [117.6526, 36.2714],
        菏泽: [115.6201, 35.2057],
        营口: [122.4316, 40.4297],
        葫芦岛: [120.1575, 40.578],

        衢州: [118.6853, 28.8666],
        西宁: [101.4038, 36.8207],
        西安: [109.1162, 34.2004],
        贵阳: [106.6992, 26.7682],
        连云港: [119.1248, 34.552],

        郑州: [113.4668, 34.6234],
        鄂尔多斯: [108.9734, 39.2487],
        重庆: [107.7539, 30.1904],
        金华: [120.0037, 29.1028],
        铜川: [109.0393, 35.1947],
        银川: [106.3586, 38.1775],
        镇江: [119.4763, 31.9702],
        长春: [125.8154, 44.2584],
        长沙: [113.0823, 28.2568],
        长治: [112.8625, 36.4746],
        阳泉: [113.4778, 38.0951],
        青岛: [120.4651, 36.3373],
        韶关: [113.7964, 24.7028],
      };

      let planePath =
        "path://M113.917 792.522C125.129 724.162 184.469 672 256.002 672c74.121 0 135.151 56.001 143.11 127.997h16.89V256H272.003c-92.002 0-90.504 26.499-128.004 80L64 469.998v233.998c0 46.147 16.646 75.649 49.917 88.526z m78.087-312.524h63.999v-80c0-17.67 14.326-31.996 31.996-31.996 17.676 0 32.003 14.326 32.003 31.996V512c0 17.671-14.326 31.996-32.003 31.996h-95.995c-17.676 0-32.002-14.325-32.002-31.996-0.001-17.676 14.325-32.002 32.002-32.002zM720 672c72.841 0 133.042 54.091 142.651 124.296C918.54 782.555 960 732.126 960 672V223.997C960 153.31 902.69 96 832.003 96H560.001c-70.694 0-127.997 57.31-127.997 127.997v576h144.887C584.849 728.001 645.879 672 720 672z m0 31.996c-61.855 0-112.002 50.147-112.002 112.002S658.145 928 720 928s112.002-50.147 112.002-112.002S781.855 703.996 720 703.996z m-463.998 0C194.146 703.996 144 754.143 144 815.998S194.146 928 256.002 928c61.855 0 111.996-50.147 111.996-112.002s-50.141-112.002-111.996-112.002z";

      let color = ["#F2fDf0", "#F2fDf0", "#F2fDf0"]; //航线的颜色
      let series = [];

      [
        ["北京", this.BJData],
        ["广州", this.GZData],
        ["上海", this.SHData],
      ].forEach((item, i) => {
        series.push(
          {
            type: "map",
            mapType: "china",
            roam: true,
            geoIndex: 0,
            aspectScale: 0.75,
            data: [
              // 华北
              { name: "北京", selected: false, value: 30 },
              { name: "天津", selected: false, value: 30 },
              { name: "河北", selected: false, value: 30 },
              { name: "山西", selected: false, value: 30 },
              { name: "内蒙古", selected: false, value: 30 },
              // 华中
              { name: "河南", selected: false, value: 5 },
              { name: "湖北", selected: false, value: 5 },
              { name: "湖南", selected: false, value: 5 },
              // 东北
              { name: "辽宁", selected: false, value: 11 },
              { name: "吉林", selected: false, value: 11 },
              { name: "黑龙江", selected: false, value: 11 },
              // 华东
              { name: "安徽", selected: false, value: 15 },
              { name: "上海", selected: false, value: 15 },
              { name: "山东", selected: false, value: 15 },
              { name: "江苏", selected: false, value: 15 },
              { name: "浙江", selected: false, value: 15 },
              { name: "江西", selected: false, value: 15 },
              { name: "福建", selected: false, value: 15 },
              // 华南
              { name: "海南", selected: false, value: 35 },
              { name: "广东", selected: false, value: 35 },
              { name: "广西", selected: false, value: 35 },
              // 西北
              { name: "新疆", selected: false, value: 18 },
              { name: "甘肃", selected: false, value: 18 },
              { name: "陕西", selected: false, value: 18 },
              { name: "宁夏", selected: false, value: 18 },
              { name: "青海", selected: false, value: 18 },
              // 西南
              { name: "云南", selected: false, value: 22 },
              { name: "重庆", selected: false, value: 22 },
              { name: "贵州", selected: false, value: 22 },
              { name: "西藏", selected: false, value: 22 },
              { name: "四川", selected: false, value: 22 },

              { name: "台湾", selected: false, value: 15 },

              { name: "香港", selected: false, value: 35 },

              { name: "澳门", selected: false, value: 35 },
            ],
          },
          {
            name: item[0] + " Top3",
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.8,
              color: "red", //arrow箭头的颜色
              symbolSize: 5,
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 0,
                curveness: 0.3,
              },
            },
            data: this.convertData(item[1]),
          },
          {
            name: item[0] + " Top3",
            type: "lines",
            zlevel: 2,
            symbol: ["none", "arrow"],
            symbolSize: 10,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol: planePath,
              symbolSize: 15,
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 3,
                opacity: 0.6,
                curveness: 0.3,
              },
            },
            data: this.convertData(item[1]),
          },
          {
            name: item[0] + " Top3",
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke",
            },
            label: {
              normal: {
                show: true,
                position: "left",
                formatter: "{b}",
              },
            },
            symbolSize: (val) => {
              return val[2] / 2;
            },
            itemStyle: {
              normal: {
                color: color[i],
              },
              emphasis: {
                areaColor: "#2B91B7",
              },
            },
            data: item[1].map((dataItem) => {
              return {
                name: dataItem[1].hide
                  ? ""
                  : dataItem[1].trueName + ": " + dataItem[1].total,
                label: {
                  normal: {
                    show: true,
                    textStyle: {
                      fontSize: 30,
                      fontWeight: 900,
                      color: "black",
                    },
                  },
                },
                value: this.geoCoordMap[dataItem[1].name].concat([
                  dataItem[1].total || dataItem[1].value,
                ]),
              };
            }),
          },
        );
      });

      let option = {
        tooltip: {
          trigger: "item",
          formatter: (params) => {
            if (params.seriesType == "effectScatter") {
              return; //"线路：" + params.data.trueName + "" + params.data.value[2];
            } else if (params.seriesType == "lines") {
              return (
                params.data.fromName +
                ">" +
                params.data.toName +
                "<br />" +
                (params.data.total || params.data.value)
              );
            } else {
              return params.trueName;
            }
          },
        },
        // visualMap: {
        //   min: 0, // 最小值
        //   max: 80, // 最大值
        //   text: ["20000", "0"],
        //   realtime: true,
        //   calculable: true,
        //   inRange: {
        //     color: [
        //       "#4183F0",
        //       "#F38F35",
        //       "#6C25DD",
        //       "#48B4B0",
        //       "#B438C9",
        //       "#5BCA60",
        //       "#EF4099",
        //       "#A65E2C",
        //       "#45B9F9",
        //       "#733812",
        //       "#AE73F7",
        //       "#0016B8",
        //       "#FAC645",
        //       "#33761F",
        //       "#F26D30",
        //       "#928BE0",
        //       "#2C80B1",
        //       "#C3356C",
        //       "#63DF6A",
        //       "#4D80D2",
        //       "#D6A66E",
        //       "#5DBAD3",
        //       "#7AC2AC",
        //       "#68DFD9",
        //       "#BF8AA1",
        //       "#88D0D4",
        //       "#979442",
        //       "#E59480",
        //       "#150C79",
        //       "#C5D746",
        //       "#54126E",
        //     ], // 渐变颜色 '#4183F0', '#F38F35', '#6C25DD', '#48B4B0', '#B438C9', '#5BCA60', '#EF4099', '#A65E2C', '#45B9F9', '#733812', '#AE73F7', '#0016B8', '#FAC645', '#33761F', '#F26D30', '#928BE0', '#2C80B1', '#C3356C', '#63DF6A', '#4D80D2', '#D6A66E', '#5DBAD3', '#7AC2AC', '#68DFD9', '#BF8AA1', '#88D0D4', '#979442', '#E59480', '#150C79', '#C5D746', '#54126E'
        //   },
        // },
        visualMap: [
          {
            type: "piecewise",
            x: "-1000 px",
            y: "-1000 px",
            seriesIndex: 0,
            splitList: [
              {
                start: 190,
                color: "#4183F0",
                label: "111",
              },
              {
                start: 70,
                end: 80,
                color: "#F38F35",
                label: "111",
              },
              {
                start: 60,
                end: 70,
                color: "#6C25DD",
                label: "222",
              },
              {
                start: 50,
                end: 60,
                color: "#48B4B0",
                label: "333",
              },
              {
                start: 40,
                end: 50,
                color: "#C5D746",
                label: "444",
              },
              {
                start: 30,
                end: 40,
                color: "#F26D30",
                label: "555",
              },
              {
                start: 20,
                end: 30,
                color: "#E59480",
                label: "666",
              },
              {
                start: 10,
                end: 20,
                color: "#EF4099",
                label: "777",
              },
              {
                start: 0,
                end: 10,
                color: "#979442",
                label: "888",
              },
              {
                start: 80,
                end: 90,
                color: "#45B9F9",
                label: "999",
              },
              {
                start: 90,
                end: 100,
                color: "#733812",
                label: "000",
              },
              {
                start: 100,
                end: 110,
                color: "#4D80D2",
                label: "888",
              },
              {
                start: 110,
                end: 120,
                color: "#0016B8",
                label: "888",
              },
              {
                start: 120,
                end: 130,
                color: "#FAC645",
                label: "888",
              },
            ],
          },
        ],
        geo: {
          map: "china",
          zlevel: 2,
          position: "bottom",
          label: {
            show: true,
            position: "bottom",
            emphasis: {
              show: true,
              color: "#fff",
            },
            normal: {
              show: true,
              textStyle: {
                fontSize: 36,
                fontWeight: 900,
                color: 'red',
              },
              formatter: function (params) {
                return params.name == "北京" || params.name == "广东" || params.name == "上海"
                  ? params.name == "广东" ? '广州' : params.name
                  : "";
              },
            },
          },
          roam: false,
          //   放大我们的地图
          zoom: 1,
          itemStyle: {
            normal: {
              areaColor: "rgba(43, 196, 243, 0.42)",
              borderColor: "rgba(43, 196, 243, 1)",
              borderWidth: 1,
            },
            emphasis: {
              areaColor: "#2B91B7",
            },
          },
        },
        series: series,
      };

      myChart.setOption(option, true);

      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    beforeFormatData() {
      let { BJData, GZData, SHData } = this;
      BJData.forEach((item) => {
        let [from, to] = item,
          findGZItem = GZData.find((gItem) => gItem[1].trueName == to.trueName),
          findSHItem = SHData.find((sItem) => sItem && sItem[1].trueName == to.trueName);
        to.total = to.value + findGZItem[1].value + (findSHItem ? findSHItem[1].value : 0);
        findGZItem[1].hide = true;
        findSHItem && (findSHItem[1].hide = true);
      });
    },
    bindClipboardClick() {
      let itemClip = new ClipboardJS(`.btn`);
      let me = this;
      itemClip.on("success", function (e) {
        me.$Toast({
          content: "复制成功！",
          type: "success",
        });
        return;
      });

      itemClip.on("error", function (e) {
        me.$Toast({
          content: "复制失败！请手动复制哦~",
          type: "error",
        });
        return;
      });
    },
  },
  beforeDestroy() {
    // clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
.brand-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000;
  .wrap {
    background: url(../assets/img/brand/bg.jpg) no-repeat #000;
    background-size: cover;
    line-height: 1.15;
    height: 100%;
    header {
      position: relative;
      height: 1rem;
      background: url(../assets/img/brand/head_bg.png) no-repeat top center;
      background-size: 100% 100%;
      h2 {
        color: #7ef0ff;
        font-size: 0.475rem;
        text-align: center;
        line-height: 0.75rem;
        letter-spacing: 1px;
      }
      .showTime {
        position: absolute;
        right: 1.375rem;
        top: 0.5rem;
        color: rgba(126, 240, 255, 0.7);
        display: flex;
        .time {
          font-size: 0.58rem;
          margin-right: 0.18rem;
        }
        .date {
          span {
            display: block;
            &:nth-child(1) {
              font-size: 0.32rem;
              text-align: right;
            }
            &:nth-child(2) {
              font-size: 0.34rem;
            }
          }
        }
      }
    }
    .el-btn {
      position: absolute;
      z-index: 10;
      top: 50px;
      left: 50px;
    }

    .mainbox {
      position: relative;
      min-width: 1024px;
      width: 100%;
      padding: 0.125rem 0.125rem 0;
      display: flex;
      position: relative;
      height: calc(100% - 66px);
      .item {
        display: flex;
        width: 100%;
        height: 100%;
        &.center {
          flex: 5;
          margin: 0 0.125rem 0.1rem;
          overflow: hidden;
        }

        %map-style {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 6.475rem;
          height: 6.475rem;
          background: url(../assets/img/brand/map.png) no-repeat;
          background-size: 100% 100%;
          opacity: 0.3;
        }
        .map {
          position: relative;
          flex: 1;
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .chart {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 5;
            height: 100%;
            width: 100%;
          }
          .map1 {
            @extend %map-style;
          }
          .map2 {
            @extend %map-style;
            width: 8.0375rem;
            height: 8.0375rem;
            background-image: url(../assets/img/brand/lbx.png);
            opacity: 0.6;
            -webkit-animation: rotate 15s linear infinite;
            animation: rotate 15s linear infinite;
            z-index: 2;
          }
          .map3 {
            @extend %map-style;
            width: 7.075rem;
            height: 7.075rem;
            background-image: url(../assets/img/brand/jt.png);
            -webkit-animation: rotate1 10s linear infinite;
            animation: rotate1 10s linear infinite;
          }
        }
      }
    }
  }
}

@-webkit-keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@-webkit-keyframes rotate1 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
@keyframes rotate1 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}

@media screen and (max-width: 1024px) {
  html {
    font-size: 42px !important;
  }
}
@media screen and (min-width: 1920) {
  html {
    font-size: 80px !important;
  }
}
</style>
