<template>
  <div class="main">
    <div class="side">
      <div class="logo">
        <img width="64" src="~@/assets/logo.png" alt="electron-vue">
        <h1>可视化翻译</h1>
      </div>
      <h4></h4>
      <div class="entry">
        <div class="select-file">
          <input class="input-file" @change="entryFile" type="file" name="导入">
          <button>+ 导入语言包</button>
        </div>
      </div>
      <br>
      <br>
      <br>
      <br>
      <!-- <h4>导出</h4> -->
      <div class="output">
        <button class="fixedlb" @click="exportLang">导出</button>
        <p>Powered by MuFeng</p>
      </div>
      
    </div>
    <div class="content">
      <!-- <h2>SenseGuard i18n-tools</h2> -->
      <div class="main-heade">
        <h3>中文包</h3>
        <h3>英文包</h3>
      </div>
      <section>
        <div class="kv">
        <dl v-for="(val, key) in lang.zh" :key="key">
          <dt><em contenteditable="true" v-text="key" @input="key = $event.target.innerText"></em></dt>
          <dd>
            <div v-if="typeof lang.zh[key] == 'string'">
              <label for="">中文</label>
              <textarea :class="key" :ref="key" v-tresize="changed" placeholder="请输入" autoHeight="true" v-model="lang.zh[key]"></textarea>
            </div>
            <ul v-else>
              <li v-for="(item, index) in lang.zh[key]" :key="index">
                <em>{{index}}</em>
                <textarea :class="index" :ref="index" v-tresize="changed" placeholder="请输入" autoHeight="true" v-model="lang.zh[key][index]"></textarea>
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
              <label for="">英文</label>
              <textarea style="resize:none" :class="key" :ref="key" v-tresize="changed" placeholder="请输入" autoHeight="true" v-model="lang.en[key]"></textarea>
            </div>
            <ul v-else>
              <li v-for="(item, index) in lang.en[key]" :key="index">
                <em>{{index}}</em>
                <textarea :class="index" :ref="index" v-tresize="changed" placeholder="请输入" autoHeight="true" v-model="lang.en[key][index]"></textarea>
              </li>
            </ul>
          </dd>
        </dl>
      </div>
      </section>
      
    </div>
  </div>
</template>

<script>
  const {ipcRenderer} = require('electron')
  
  // const path = require('path')
  // console.log(path)
  const fs = require('fs')
  const zhload = require('../assets/zh.json')
  const enload = require('../assets/en.json')

  // const selectDirBtn = document.getElementById('select-directory')

  // selectDirBtn.addEventListener('click', (event) => {
  //   ipcRenderer.send('open-file-dialog')
  // })

  // ipcRenderer.on('selected-directory', (event, path) => {
  //   document.getElementById('selected-file').innerHTML = `你已选择: ${path}`
  // })
  export default {
    data () {
      return {
        name: this.$route.name,
        path: this.$route.path,
        lang: {
          en: {},
          zh: {}
        }
      }
    },
    computed: {
      aDouble: vm => vm.a * 2
    },
    mounted () {
      this.lang.zh = zhload
      this.lang.en = enload
    },
    methods: {
      entryFile (e) {
        let getfile = e.target.files[0]
        let fileName = getfile.name
        let langName = fileName.substr(0, fileName.lastIndexOf('.'))
        console.log(langName)
        fs.readFile(getfile.path, 'utf-8', (err, data) => {
          if (err) {
            console.log(err)// eslint-disable-line
          } else {
            // console.log(data)// eslint-disable-line
            this.lang[langName] = JSON.parse(data)
            // console.log(JSON.parse(data))
            // console.log(Object.keys(this.lang[langName]))
          }
        })
        // console.log(fs.readFileSync(getfile.path).toString())
        // let result = JSON.parse(fs.readFileSync(getfile.path))
        // console.log(result)
        ipcRenderer.send('open-file-dialog')
      },
      selectFile (e) {
        ipcRenderer.send('open-file-dialog')
      },
      changed (e) {
        // console.log(e)
        // this.$refs[e.className][1].style.height = this.$refs[e.className][0].style.height
      },
      exportLang () {
        let str = JSON.stringify(this.lang.zh, '', '\t')
        // console.log(dialog)
        //dialog.showOpenDialog({ properties: [ 'openFile', 'openDirectory', 'multiSelections' ]})
        // 向asynchronous-message发送消息
        //ipcRenderer.send('asynchronous-message', 'ping')

        ipcRenderer.sendSync('synchronous-message', 'ping')
        //console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

        // 接收synchronous-reply返回的消息
        ipcRenderer.on('synchronous-reply', (event, arg) => {
          console.log(arg) // prints "pong"
          let filePath = arg+"\\"+'zhs.json'
          console.log(filePath)

          fs.writeFile(filePath, str, 'utf-8', (err, data) => {
            //console.log(err, data)
          })
        })
        // 接收asynchronous-reply返回的消息
        ipcRenderer.on('asynchronous-reply', (event, arg) => {
          console.log(arg) // prints "pong"
        })

        //console.log(ipcRenderer)
        // new Uint8Array(this.lang.zh)
        
      }
    }
  }

</script>

<style lang="less" scoped>
.main{
  position: relative;
  height: 100%;
}
.logo{
  text-align: center;
  h1{
    font-size: 14px;
    color: #999;
    font-weight: normal;
  }
  padding: 20px 0;
}
ul{list-style: none;}
.entry{
  input{
    width: 100%;
    font-size: 14px;
  }
  .select-file{
    position: relative;
    .input-file{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      padding: 0;
      margin: 0;
      opacity: 0;
    }
  }
}
.side{
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 200px;
  height: 100%;
  padding: 20px;
  background: #f3f3f9;
  border-right: 1px solid #eee;
  button{
    width: 100%;
    border-radius: 5em;
    padding: .5em;
  }
  .entry{
    button{
      background: transparent;
      color: #118bee;
    }
  }
  .output{
    position:absolute;
    width: 160px;
    text-align: center;
    bottom: 0;
    p{
      font-size: 12px;
      color: #999;
      font-family: '幼圆';
    }
  }
}
.content{
  padding-left: 200px;
  height: 100%;
  .main-heade{
    display: flex;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    position: relative;
    z-index: 999;
    h3{
      width: calc(50% - 9px);
      height: 30px;
      line-height: 30px;
      background: #f3f3f9;
      font-size: 14px;
      box-sizing: border-box;
      text-indent: 10px;
      position: relative;
      text-align: center;
    }
  }
  section{
    overflow-y: auto;
    padding: 0 10px;
    height: calc(100% - 40px);
  }
}

.main-heade h3:nth-child(1){
  text-indent: 20px;
}
//.main-heade h3:nth-child(1),
.kv:nth-child(1) dl{
  &::after{
    content: '';
    width: 1px;
    height: 100%;
    border-right: 1px dashed #ccc;
    position: absolute;
    top: 2px;
    right: 2px;
  }
}
.kv{
  position: relative;
  width: 50%;
  em{color: teal;}
  dl{
    position: relative;
    &:nth-child(even){
      background: #f5f6f9;
    }
    dt{
      width: 100%;
      padding: 8px;
      line-height: 1.4;
    }
    dd{
      padding-bottom: 10px;
      padding-right: 10px;
      &>div{
        display: flex;
        label{
          font-size: 12px;
          font-weight: normal;
          color: #ccc;
          display: inline-block;
          width: 44px;
          padding: 4px;
          text-align: right;
        }
      }
      ul{
        padding-left: 50px;
        em{font-size: 12px;}
      }
    }
  }
  
  textarea{
    width: 88%;
    resize: vertical;
    transition: height .1s;
    font-size: 12px;
    margin-bottom: 0;
    height: 30px;
    padding: 4px 8px;
    line-height: 1.6;
    border-radius: 0px;
    &:focus{
      outline: 1px solid teal;
      outline-offset: -1px;
      box-shadow: 0 0 10px rgba(0,0,0,.2);
    }
  }
  
}
</style>
