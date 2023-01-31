const fs = require('fs');
const path = require('path');

const axios = require('axios');

const url = 'https://yirong.bzcw8.com/api/moyi/cms/getMyReleases?v=2.00';
const data = { "category": "", "sort": "id", "order": "desc", "offset": 0, "limit": 10, "currPage": 1, "type": "42", "address_id": 0, "type_model": 0, "search": "" };
const filePath = path.join(__dirname, 'filename.txt');

const resultList = [];

function requestData(url, data) {
  const headers = {
    token: '68858698-16f1-4a95-93cc-f5d6db2b27ab'
  };
  axios.post(url, data, { headers })
    .then(response => {
      console.log(`----------->第${data.currPage}页请求完成！！！`);
      handleInfoList(response.data.data.list);
      // nextPage();
    })
    .catch(err => {
      console.log('----------->请求失败，重新发起请求')

      console.error(err)
    })
}

function nextPage() {
  data.currPage += 1;
  console.log(`----------->第${data.currPage}页开始请求...`);
  requestData(url, data)
}

function handleInfoList(list) {
  // const newList = list.map(item => ({
  //   images: item.show_images,
  //   region_txt: item.region_txt,
  //   username: item.username,
  //   detailed: item.detailed,
  //   price: item.price,
  // }))
  resultList.push(...list);
  fs.writeFileSync(filePath, JSON.stringify(resultList), (error) => {
    if (error) throw error;
    console.log('Data written to file');
  });
}

requestData(url, data)