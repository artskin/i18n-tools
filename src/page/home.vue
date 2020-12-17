<template>
  <div class="main">
    <div class="side" style="-webkit-app-region: drag">
      <div class="logo" style="-webkit-app-region: drag">
        <svg viewBox="0 0 1024 1024" width="50" height="56">
          <path d="M958.136 192h-432.64l-45.03 174.2-16.166 114.484 86.658 241.69 13.914 293.278h393.266c36.368 0 65.864-29.496 65.864-65.864V257.864C1024 221.496 994.504 192 958.136 192z" fill="#E6E6E6" p-id="6311"></path>
          <path d="M737.392 832l-172.522 183.652L503.764 832l24.932-66.958z" fill="#3A5BBC" p-id="6312"></path>
          <path d="M939.13 488.348v-41.74h-158.608v-58.434h-41.74v58.434H595.84v41.74h231.78c-12.892 27.144-35.242 70.43-65.956 116.07-28.264-35.298-46.124-59.862-46.336-60.154l-12.258-16.89-33.784 24.51 12.254 16.89c0.954 1.316 21.752 29.926 54.676 70.6-22.444 27.498-63.616 72.212-85.31 93.904l29.512 29.512c18.724-18.724 57.548-60.428 82.852-90.654 32.918 39.106 65.046 74.388 95.708 105.052l14.756 14.756 29.516-29.51-14.756-14.756C856.816 716 823.456 679.15 789.2 638.08c44.266-63.646 72.96-123.912 84.4-149.732h65.53z" fill="#808080" p-id="6313"></path>
          <path d="M698.658 715.046L737.392 832H65.864C29.468 832 0 802.504 0 766.136V74.212C0 37.844 29.468 8.348 65.864 8.348h398.832L525.496 192l91.214 275.478 81.948 247.568z" fill="#518EF8" p-id="6314"></path><path d="M298.602 574.748c-85.54 0-155.13-69.59-155.13-155.13s69.59-155.13 155.13-155.13c41.408 0 80.364 16.13 109.69 45.424l-29.498 29.532c-21.446-21.42-49.922-33.216-80.194-33.216-62.526 0-113.392 50.866-113.392 113.392s50.866 113.392 113.392 113.392c55.396 0 101.64-39.934 111.466-92.522h-111.462v-41.74h155.13v20.87c-0.002 85.538-69.592 155.128-155.132 155.128z" fill="#FFFFFF" p-id="6315"></path>
        </svg>
        <h1>可视化翻译</h1>
      </div>
      <div class="entry">
        <div class="select-file">
          <input class="input-file" @change="entryFile" type="file" name="导入">
          <button>+ 导入语言包</button>
        </div>
      </div>
      <div class="catalog">
        <h4>模块目录</h4>
        <el-input class="search-text"
          placeholder="输入关键字进行过滤"
          size="mini"
          v-model="filterText">
        </el-input>
        <el-tree ref="tree" 
        :data="treeData" 
        node-key="id"
        highlight-current
        @node-contextmenu="creatMenu"
        @current-change = "clickLocalNode"
        :filter-node-method="filterNode"></el-tree>
      </div>
      <div class="output">
        <!-- <button class="fixedlb" @click="exportLang">导出</button> -->
        <p title="技术支持">with <a @click="aboutMe(this)" href="javascript:">♥</a> by MuFeng</p>
      </div>
    </div>
    <div class="content">
      <!-- <h2>SenseGuard i18n-tools</h2> -->
      <div class="main-heade">
        <h3>中文包<span v-if="langFile.zh.name">: <span class="gray">{{langFile.zh.file}}</span> <button title="导出中文语言包" class="mini" @click="exportLang(langFile.zh)">➥导出</button></span></h3>
        <h3>英文包<span v-if="langFile.en.name">: <span class="gray">{{langFile.en.file}}</span> <button title="导出英文语言包" class="mini" @click="exportLang(langFile.en)">➥导出</button></span></h3>
      </div>
      <section ref="pageCon">
        <div class="nodata" v-if="Object.keys(lang.zh).length == 0 && Object.keys(lang.en).length == 0">
          请先导入语言包文件:<br>
          <span>支持.json，或json格式的(.js/.ts)文件。</span>
        </div>
        <div class="kv">
          <dl v-for="(val, key) in lang.zh" :key="key">
            <dt :ref="key" :name="key"><em v-text="key" @input="key = $event.target.innerText"></em></dt>
            <dd>
              <div v-if="typeof lang.zh[key] == 'string'">
                <label></label>
                <textarea :class="key" v-tresize="changed" placeholder="请输入" autoHeight="true" v-model="lang.zh[key]"></textarea>
              </div>
              <ul v-else>
                <li v-for="(item, index) in lang.zh[key]" :key="index">
                  <em>{{index}}</em>
                  <div v-if="typeof lang.zh[key][index] == 'string'">
                    <textarea :class="index" v-tresize="changed" placeholder="请输入" autoHeight="true" v-model="lang.zh[key][index]"></textarea>
                  </div>
                  <div v-else class="child-item">
                    <ul>
                      <li v-for="(childitem, n) in lang.zh[key][index]" :key="n">
                        <em>{{n}}</em>
                        <textarea :class="index" v-tresize="changed" placeholder="请输入" autoHeight="true" v-model="lang.zh[key][index][n]"></textarea>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </dd>
          </dl>
        </div>
        <div class="kv">
          <dl v-for="(val, key) in lang.en" :key="key">
            <dt><em>{{key}}</em></dt>
            <dd>
              <div v-if="typeof lang.en[key] == 'string'">
                <label for=""></label>
                <textarea style="resize:none" :class="key" v-tresize="changed" placeholder="请输入" autoHeight="true" v-model="lang.en[key]"></textarea>
              </div>
              <ul v-else>
                <li v-for="(item, index) in lang.en[key]" :key="index">
                  <em>{{index}}</em>
                  <div v-if="typeof lang.en[key][index] == 'string'">
                    <textarea :class="index" v-tresize="changed" placeholder="请输入" autoHeight="true" v-model="lang.en[key][index]"></textarea>
                  </div>
                  <div v-else class="child-item">
                    <ul>
                      <li v-for="(childitem, n) in lang.en[key][index]" :key="n">
                        <em>{{n}}</em>
                        <textarea :class="index" v-tresize="changed" placeholder="请输入" autoHeight="true" v-model="lang.en[key][index][n]"></textarea>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </dd>
          </dl>
        </div>
        <el-dialog
          width="500px"
          :visible.sync="dialogShowVisible">
          <div class="dialog-title" slot="title">{{currentModule}}: <em>添加子项</em></div>
          <el-form :model="form" ref="regionRules" :rules="regionRules">
            <el-form-item label="key:" :label-width="formLabelWidth" prop="key">
              <el-input size="small" v-model="form.key" maxlength="40" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="中文:" :label-width="formLabelWidth" prop="zhValue">
              <el-input size="small" v-model="form.zhValue" maxlength="100" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="英文:" :label-width="formLabelWidth" prop="enValue">
              <el-input size="small" v-model="form.enValue" maxlength="100" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" :loading="isSubmit" @click="addItem">确定</el-button>
            <el-button size="small" type="info" @click="dialogShowVisible = false">取消</el-button>
          </div>
        </el-dialog>
      </section>
      
    </div>
    
  </div>
</template>
<script>
const {ipcRenderer} = require('electron')
const { remote } = require('electron')
const { Menu, MenuItem } = remote
const shell = require('electron').shell
const fs = require('fs')

import { defineComponent, onMounted, reactive ,toRefs,watch } from 'vue'
export default defineComponent({

  setup(props, ctx) {
    const data = reactive({
      form:{
        key:'',
        enValue:'',
        zhValue:''
      },
      formLabelWidth:'80px',
      regionRules:{
        key: [
          { required: true, trigger: 'blur' },
          { max: 40, message: '', trigger: 'blur'}
        ],
        enValue: [
          { required: true, trigger: 'blur' },
          { max: 40, message: '', trigger: 'blur' }
        ],
        zhValue: [
          { required: true, trigger: 'blur' },
          { max: 40, message: '', trigger: 'blur' }
        ]
      },
      isSubmit:false,
      currentModule:'',
      name: '首页',
      path: '/home',
      lang: {
        en: {},
        zh: {}
      },
      langFile:{
        en:{
          name:'',
          file:''
        },
        zh:{
          name:'',
          file:''
        }
      },
      filterText:'',
      treeData:[],
      contextMenu:new Menu(),
      dialogShowVisible:false
    });

    // onMounted() {
    //   this.treeInit();
    //   this.contextMenuInit();
    // };
    function aboutMe(){
    event.preventDefault();
    shell.openExternal('https://github.com/artskin/i18n-tools');
  }
  function filterNode(value, data) {
    if (!value) return true;
    return data.label.indexOf(value) !== -1;
  }
  function clickLocalNode(data,node,key){
    let itemName = data.label;
    let targetEl
    if(this.$refs[itemName].length>0){
      targetEl = this.$refs[itemName][0]
    }else{
      targetEl = this.$refs[itemName]
    }
    targetEl.scrollIntoView()//{behavior:"smooth"}
  }
  function treeInit(){
    let self = this;
    this.treeData = [];
    let treeJson = JSON.parse(JSON.stringify(this.lang.zh))
    getJsonData(treeJson)
    function getJsonData(jsonData,key){
      Object.entries(jsonData).map((item)=>{
        let itemObj = {
          label:item[0]
        }
        if(typeof item[1] == 'object'){
          self.treeData.push(itemObj)
        }
      })
    }
  }

  const method = {
    entryFile: (e) => {
      console.log(this)
      console.log(e)
      let getfile = e.target.files[0]
      let fileName = getfile.name
      let langName = fileName.substr(0, fileName.lastIndexOf('.'))
      //console.log(fileName)
      data.langFile[langName].file = fileName;
      data.langFile[langName].name = langName;
      fs.readFile(getfile.path, 'utf-8', (err, data) => {
        //console.log(typeof data)
        let toJson = data.substring(data.indexOf('{'))
        //console.log(toJson)
        if (err) {
          console.log(err)// eslint-disable-line
        } else {
          // console.log(data)// eslint-disable-line
          data.lang[langName] = JSON.parse(toJson)
          // console.log(JSON.parse(data))
          // console.log(Object.keys(this.lang[langName]))
          this.treeInit()
        }
      })
      // console.log(fs.readFileSync(getfile.path).toString())
      // let result = JSON.parse(fs.readFileSync(getfile.path))
      // console.log(result)
      //ipcRenderer.send('open-file-dialog')
    }
  }
  
  function selectFile (e) {
    //ipcRenderer.send('open-file-dialog')
  }
  function changed (e) {
    // this.$refs[e.className][1].style.height = this.$refs[e.className][0].style.height
  }
  function contextMenuInit(){
    this.contextMenu.append(new MenuItem({ label: '新建子项', click:()=> { this.showAddItem() } }))
    // this.contextMenu.append(new MenuItem({ type: 'separator' }))
    // this.contextMenu.append(new MenuItem({ label: '新建模块' }))
  }
  function showAddItem(){
    this.dialogShowVisible = true;
  }
  function  addItem(){
    let self = this;
    this.$refs.regionRules.validate((valid) => {
      if (valid) {
        this.isSubmit = true;
        if(this.lang && this.lang.zh){
          console.log(this.lang.zh[this.currentModule])
          this.lang.zh[this.currentModule][this.form.key] = this.form.zhValue
        }
        if(this.lang && this.lang.en){
          console.log(this.lang)
          this.lang.en[this.currentModule][this.form.key] = this.form.enValue
        }
        setTimeout(()=>{
          this.isSubmit = false;
          this.dialogShowVisible = false
        },100)
      }
    })
  }
  function creatMenu(ev,data,node,self){
    ev.preventDefault()
    //console.log(ev,data,node,self)
    this.currentModule = data.label
    this.contextMenu.popup({ window: remote.getCurrentWindow() })
  }
  function exportLang (currentlang) {
    console.log(currentlang)
    let str = JSON.stringify(this.lang[currentlang.name], '', '\t')
    ipcRenderer.send('save-dialog',currentlang.file)
    ipcRenderer.on('save-file', (event, path) => {
      if(!path.canceled){
        let filePath = path.filePath
        fs.writeFile(filePath, str, 'utf-8', (err, data) => {
          if (err) throw err;
          console.log('文件已被保存');
          const notification = {
            title:'导出成功',
            body:'导出目录为:'+filePath
          }
          const noticeSuccess = new window.Notification(notification.title,notification)
        })
      }
    })
  }

    return {
      ...toRefs(data),
      ...method,
    }
  }
// filterText(val) {
//       this.$refs.tree.filter(val);
//     }
  // watch(() => val,newVal => {
  //   data.currentModule = newVal
  // })

 

})
</script>
<style lang="less">
@import './home.less';
</style>