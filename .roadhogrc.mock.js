// const tpl = {
//   "package":"包名",
//   "versionCode":"版本号",
//   "time":"出错时间",
//   "errMsg": '错误消息'
// };
//
// export default {
//   'GET /api/log': (req,res) => {
//     const { page = 1, perPage = 10} = req.query;
//     const data = {};
//     const records = [];
//     for( var i = 0; i < perPage; i++) {
//       records.push(tpl)
//     };
//     data.records = records;
//     data.total = 100;
//     res.send({
//       data,
//       success: true,
//       message: '成功'
//     })
//   }
// }
