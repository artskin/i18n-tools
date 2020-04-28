 function singleUpload(file){
  let path = file.path; //文件本地路径 
  let stats = fs.statSync(path);//读取文件信息
  let chunkSize = 3*1024*1024;//每片分块的大小3M
  let size = stats.size;//文件大小
  let pieces = Math.ceil(size / chunkSize);//总共的分片数  
  function uploadPiece (i){
    //计算每块的结束位置
    let enddata = Math.min(size, (i + 1) * chunkSize);
    let arr = [];
    //创建一个readStream对象，根据文件起始位置和结束位置读取固定的分片
    let readStream = fs.createReadStream(path, { start: i * chunkSize, end: enddata-1 });
    //on data读取数据
    readStream.on('data', (data)=>{
        arr.push(data)
    })
    //on end在该分片读取完成时触发
    readStream.on('end', ()=>{
      //这里服务端只接受blob对象，需要把原始的数据流转成blob对象，这块为了配合后端才转
      let blob = new Blob(arr)
      //新建formdata数据对象
      var formdata = new FormData();
      let md5Val = md5(Buffer.concat(arr));
      formdata.append("file", blob);
      console.log('blob.size',blob.size)
      formdata.append("md5", md5Val);
      formdata.append("size", size + ''); // 数字30被转换成字符串"30"
      formdata.append("chunk", i + '');//第几个分片，从0开始
      formdata.append("chunks", pieces + '');//分片数
      formdata.append("name", name);//文件名
      post(formdata)//这里是伪代码，实现上传，开发者自己实现
    })
  }
}