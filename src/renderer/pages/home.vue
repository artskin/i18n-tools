<template>
  <section>
    <div class="side">
      <aside>
        <h4>导入语言包文件</h4>
        <div class="entry">
          
          <div class="select-file">
            <input class="input-file" @change="entryFile" type="file" name="导入">
            <button>选择文件</button>
          </div>
        </div>
      </aside>
      <br>
      <br>
      <br>
      <br>
      <aside>
        <h4>导出</h4>
        <button @click="exportLang">导出</button>
      </aside>
    </div>
    <article>
      <!-- <h2>SenseGuard i18n-tools</h2> -->
      <div class="kv">
        <h3>中文包</h3>
        <dl v-for="(val, key) in lang.zh" :key="key">
          <dt><em>{{key}}</em></dt>
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
        <h3>英文包</h3>
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
    </article>
  </section>
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
        console.log(str)
        // new Uint8Array(this.lang.zh)
        fs.writeFile('zhs.json', str, 'utf-8', (err, data) => {
          console.log(err, data)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

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
  width: 220px;
  padding: 10px;
  aside{
    width: 100%;
    margin: 0;
  }
}
article{
  flex: 1;
  display: flex;
  justify-content: space-around;
  padding: 10px;
}
.title {
  color: #888;
  font-size: 18px;
  font-weight: initial;
  letter-spacing: .25px;
  margin-top: 10px;
}
dt{
  em{color: teal;}
}
.kv{
  width: 50%;
  h3{
    padding: 4px;
  }
  dl{
    position: relative;
    &::after{
      //content: '';
      width: 100%;
      border-bottom: 1px dashed #ccc;
      position: absolute;
      bottom: 5px;
      left: 0;
    }
    dt{
      width: 100%;
      padding: 8px 0 6px 16px;
      line-height: 1.4;
    }
    dd{
      padding-bottom: 10px;
      &>div{
        display: flex;
        label{
          font-size: 12px;
          font-weight: normal;
          color: #ccc;
          display: inline-block;
          width: 50px;
          padding: 4px;
          text-align: right;
        }
      }
      ul{
        padding-left: 50px;
        
      }
    }
  }
  dl:nth-child(even){
    background: #f5f6f9;
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
