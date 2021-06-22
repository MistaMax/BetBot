exports.loadLog = (filepath) => {
  const log = new Object();
  log.currFile = filepath;
  log.timeArr = new Array();
  log.idArr = new Array();
  log.tagArr = new Array();
  log.contentArr = new Array();
  // for efficiency, map ids to tags and ids to content indecies
  const lines = require('fs').readFileSync(filepath, 'utf-8').split('\n').filter(Boolean);
  let i;
  for (i = 0; i < lines.length; i++) {
    const data = lines[i].split('|');
    log.timeArr[i] = data[0];
    log.idArr[i] = data[1];
    log.tagArr[i] = data[2];
    log.contentArr[i] = data[3];
  }
  log.size = lines.length;
  return log;
};

exports.searchLog = (log, type, search) => {
  let arr = [];
  const hits = new Object();
  hits.arr = [];
  hits.size = 0;
  if (type === 'id') {
    arr = log.idArr;
  } else if (type === 'content') {
    arr = log.contentArr;
  } else if (type === 'time') {
    arr = log.timeArr;
  } else if (type === 'tag') {
    arr = log.tagArr;
  }

  let i;
  let count = 0;
  for (i = 0; i < log.size; i++) {
    if (arr[i].includes(search)) {
      hits.arr[count] = i;
      count++;
    }
  }

  hits.size = count;

  return hits;
};

exports.getLogFromHits = (log, hits) => {
  let i;
  const nlog = new Object();
  nlog.currFile = log.currFile;
  nlog.timeArr = new Array();
  nlog.idArr = new Array();
  nlog.tagArr = new Array();
  nlog.contentArr = new Array();
  for (i = 0; i < hits.size; i++) {
    nlog.timeArr[i] = log.timeArr[hits.arr[i]];
    nlog.idArr[i] = log.idArr[hits.arr[i]];
    nlog.tagArr[i] = log.tagArr[hits.arr[i]];
    nlog.contentArr[i] = log.contentArr[hits.arr[i]];
  }
  nlog.size = i;
  return nlog;
};

exports.toString = (log) => {
  let p = '';
  let i;
  for (i = 0; i < log.size; i++) {
    p = `${p}[${log.timeArr[i]}]${log.tagArr[i]}:${content}\n`;
  }
  return p;
};
